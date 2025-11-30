import type { Collection, JSCodeshift } from 'jscodeshift'

/**
 * Converts arrow functions in mockImplementation to regular functions,
 * and converts mockReturnValue to mockImplementation with a function.
 *
 * In Vitest, when mocking a class/constructor, the mock implementation needs
 * to be a regular function (not an arrow function) because arrow functions
 * are not constructable with `new`.
 *
 * Before:
 *   vi.mocked(Table).mockImplementation(() => ({ push: vi.fn() }))
 *   vi.mocked(Table).mockReturnValue(table)
 *
 * After:
 *   vi.mocked(Table).mockImplementation(function() { return { push: vi.fn() }; })
 *   vi.mocked(Table).mockImplementation(function() { return table; })
 */
export function convertMockImplementationToFunction(j: JSCodeshift, source: Collection<any>) {
  // Find mockImplementation and mockImplementationOnce calls on vi.mocked() ONLY
  // We only convert arrow functions to regular functions when mocking constructors
  // (i.e., when using vi.mocked()), since arrow functions aren't constructable with `new`
  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      property: { type: 'Identifier' },
    },
  }).filter((path) => {
    const propName = (path.value.callee as any).property?.name
    if (propName !== 'mockImplementation' && propName !== 'mockImplementationOnce')
      return false

    // Only convert for vi.mocked() or jest.mocked() calls
    const obj = (path.value.callee as any).object
    if (obj?.type !== 'CallExpression')
      return false

    const callee = obj.callee
    if (callee?.type !== 'MemberExpression')
      return false

    const objName = callee.object?.name
    const methodName = callee.property?.name
    return (objName === 'vi' || objName === 'jest') && methodName === 'mocked'
  }).forEach((path) => {
    const args = path.value.arguments

    if (args.length === 0)
      return

    const mockFn = args[0]

    // Convert arrow functions to regular functions for mockImplementation
    // Arrow functions are not constructable with `new`, so they can't be used
    // for mocking classes/constructors in Vitest
    if (mockFn.type === 'ArrowFunctionExpression') {
      const { body, params, async: isAsync } = mockFn

      // Case 1: Arrow function with block body - convert directly
      if (body.type === 'BlockStatement') {
        args[0] = j.functionExpression(
          null, // anonymous
          params,
          body,
        )
        if (isAsync)
          (args[0] as any).async = true
      }
      // Case 2: Concise arrow function (expression body) - wrap in return statement
      else {
        args[0] = j.functionExpression(
          null, // anonymous
          params,
          j.blockStatement([j.returnStatement(body as any)]),
        )
        if (isAsync)
          (args[0] as any).async = true
      }
    }
  })

  // Convert mockReturnValue/mockReturnValueOnce on vi.mocked() to mockImplementation
  // This is needed because mockReturnValue doesn't work with constructors in Vitest
  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      property: { type: 'Identifier' },
    },
  }).filter((path) => {
    const propName = (path.value.callee as any).property?.name
    if (propName !== 'mockReturnValue' && propName !== 'mockReturnValueOnce')
      return false

    // Check if the object is a vi.mocked() call
    const obj = (path.value.callee as any).object
    if (obj?.type !== 'CallExpression')
      return false

    const callee = obj.callee
    if (callee?.type !== 'MemberExpression')
      return false

    const objName = callee.object?.name
    const methodName = callee.property?.name
    return (objName === 'vi' || objName === 'jest') && methodName === 'mocked'
  }).forEach((path) => {
    const args = path.value.arguments
    if (args.length === 0)
      return

    const returnValue = args[0]
    const callee = path.value.callee as any

    // Skip spread elements
    if (returnValue.type === 'SpreadElement')
      return

    // Change mockReturnValue to mockImplementation
    const isOnce = callee.property.name === 'mockReturnValueOnce'
    callee.property.name = isOnce ? 'mockImplementationOnce' : 'mockImplementation'

    // Wrap the return value in a function
    args[0] = j.functionExpression(
      null, // anonymous
      [],
      j.blockStatement([j.returnStatement(returnValue as any)]),
    )
  })
}

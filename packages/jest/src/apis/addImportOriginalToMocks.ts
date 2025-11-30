import type { ArrowFunctionExpression, Collection, FunctionExpression, JSCodeshift } from 'jscodeshift'

/**
 * Convert partial mocks to use importOriginal pattern.
 * This ensures all exports from the original module are preserved.
 *
 * Before:
 * vi.mock('module', () => ({
 *   foo: vi.fn(),
 * }));
 *
 * After:
 * vi.mock('module', async (importOriginal) => ({
 *   ...(await importOriginal()),
 *   foo: vi.fn(),
 * }));
 */
export const addImportOriginalToMocks = (j: JSCodeshift, source: Collection<any>): void => {
  // Find all vi.mock calls with factory functions
  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'vi' },
      property: { type: 'Identifier', name: 'mock' },
    },
  }).forEach((path) => {
    const args = path.value.arguments
    if (args.length < 2)
      return

    const factoryArg = args[1]

    // Only process factory functions that return objects
    if (factoryArg.type !== 'ArrowFunctionExpression' && factoryArg.type !== 'FunctionExpression')
      return

    const factory = factoryArg as ArrowFunctionExpression | FunctionExpression

    // Skip if already using importOriginal
    if (factory.params.length > 0) {
      const firstParam = factory.params[0]
      if (firstParam.type === 'Identifier' && firstParam.name === 'importOriginal')
        return
    }

    // Skip async functions that already use importActual
    const factorySource = j(factory).toSource()
    if (factorySource.includes('importActual') || factorySource.includes('importOriginal'))
      return

    // Get the module path
    const modulePathArg = args[0]
    if (modulePathArg.type !== 'StringLiteral' && modulePathArg.type !== 'Literal')
      return

    const _modulePath = (modulePathArg as any).value as string

    // Get the body of the factory
    let returnedObject: any = null

    if (factory.body.type === 'ObjectExpression') {
      // Arrow function with implicit return: () => ({ ... })
      returnedObject = factory.body
    }
    else if (factory.body.type === 'BlockStatement') {
      // Function with block body
      const returnStatement = factory.body.body.find(
        (stmt: any) => stmt.type === 'ReturnStatement',
      ) as any
      if (returnStatement?.argument?.type === 'ObjectExpression')
        returnedObject = returnStatement.argument
    }

    if (!returnedObject)
      return

    // Skip if the object already has a spread with importActual/importOriginal
    const hasImportSpread = returnedObject.properties.some((prop: any) => {
      if (prop.type !== 'SpreadElement')
        return false
      const spreadSource = j(prop).toSource()
      return spreadSource.includes('importActual') || spreadSource.includes('importOriginal')
    })

    if (hasImportSpread)
      return

    // Skip if the mock already defines 'default' or '__esModule' - it's likely complete
    const hasDefaultOrEsModule = returnedObject.properties.some((prop: any) => {
      if (prop.type === 'SpreadElement')
        return false
      const key = prop.key
      if (!key)
        return false
      const keyName = key.type === 'Identifier' ? key.name : (key.value as string)
      return keyName === 'default' || keyName === '__esModule'
    })

    if (hasDefaultOrEsModule)
      return

    // Create the spread: ...(await importOriginal())
    const importOriginalCall = j.awaitExpression(
      j.callExpression(j.identifier('importOriginal'), []),
    )
    const spreadElement = j.spreadElement(importOriginalCall)

    // Add the spread as the first property
    returnedObject.properties.unshift(spreadElement)

    // Add importOriginal parameter
    factory.params = [j.identifier('importOriginal')]

    // Make the function async
    factory.async = true

    // If it was an arrow function with implicit return, convert to block with return
    if (factory.body.type === 'ObjectExpression') {
      factory.body = j.blockStatement([
        j.returnStatement(returnedObject),
      ])
    }
  })
}

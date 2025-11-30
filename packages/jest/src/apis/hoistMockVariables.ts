import type { Collection, JSCodeshift } from 'jscodeshift'

/**
 * Wrap mock variables in vi.hoisted() to ensure they're available when mocks are hoisted.
 *
 * In Vitest, vi.mock() calls are hoisted to the top of the file. If the mock factory
 * references variables declared in the file, those variables won't exist yet when
 * the mock runs.
 *
 * Before:
 * const mockFn = vi.fn();
 * vi.mock('./module', () => ({ fn: mockFn }));
 *
 * After:
 * const { mockFn } = vi.hoisted(() => ({ mockFn: vi.fn() }));
 * vi.mock('./module', () => ({ fn: mockFn }));
 *
 * This ensures mockFn is defined at the same hoisting level as vi.mock().
 */
export const hoistMockVariables = (j: JSCodeshift, source: Collection<any>): void => {
  // Find all variables that are:
  // 1. Declared at the module level (not inside functions)
  // 2. Initialized with vi.fn() or similar
  // 3. Used inside vi.mock() factories

  // First, collect all variable names used in vi.mock() factories
  const varsUsedInMocks = new Set<string>()

  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'vi' },
      property: { type: 'Identifier', name: 'mock' },
    },
  }).forEach((mockPath) => {
    const args = mockPath.value.arguments
    if (args.length < 2)
      return

    const factoryArg = args[1]
    if (factoryArg.type !== 'ArrowFunctionExpression' && factoryArg.type !== 'FunctionExpression')
      return

    // Find all identifiers used in the factory
    j(factoryArg).find(j.Identifier).forEach((idPath) => {
      // Skip if it's a property key
      const parent = idPath.parentPath.value
      if (parent.type === 'Property' && parent.key === idPath.value)
        return
      if (parent.type === 'MemberExpression' && parent.property === idPath.value && !parent.computed)
        return

      varsUsedInMocks.add(idPath.value.name)
    })
  })

  // Now find module-level variable declarations that match these names
  // and are initialized with vi.fn()
  const varsToHoist: Map<string, any> = new Map()

  source.find(j.VariableDeclaration).forEach((declPath) => {
    // Check if this is a module-level declaration (direct child of Program body)
    // parentPath points to the body array, parentPath.parentPath points to Program
    const isModuleLevel = declPath.parentPath.name === 'body'
      && declPath.parentPath.parentPath?.value?.type === 'Program'
    if (!isModuleLevel)
      return

    declPath.value.declarations.forEach((declarator: any) => {
      if (declarator.type !== 'VariableDeclarator')
        return
      if (declarator.id.type !== 'Identifier')
        return

      const varName = declarator.id.name

      // Check if this variable is used in a mock
      if (!varsUsedInMocks.has(varName))
        return

      // Check if it's initialized with vi.fn() or similar
      const init = declarator.init
      if (!init)
        return

      // Check for vi.fn() or similar patterns
      const isViCall = init.type === 'CallExpression'
        && init.callee?.type === 'MemberExpression'
        && init.callee?.object?.type === 'Identifier'
        && init.callee?.object?.name === 'vi'

      if (isViCall) {
        varsToHoist.set(varName, {
          declarator,
          declaration: declPath,
        })
      }
    })
  })

  if (varsToHoist.size === 0)
    return

  // Group variables by their declaration statement
  const declsToModify = new Map<any, Array<{ name: string; declarator: any }>>()

  varsToHoist.forEach(({ declarator, declaration }, name) => {
    const existing = declsToModify.get(declaration) || []
    existing.push({ name, declarator })
    declsToModify.set(declaration, existing)
  })

  // Process each declaration
  declsToModify.forEach((vars, decl) => {
    // Create the hoisted object properties
    const hoistedProperties = vars.map(({ name, declarator }) =>
      j.objectProperty(
        j.identifier(name),
        declarator.init,
      ),
    )

    // Create the vi.hoisted() call
    const hoistedCall = j.callExpression(
      j.memberExpression(j.identifier('vi'), j.identifier('hoisted')),
      [
        j.arrowFunctionExpression(
          [],
          j.objectExpression(hoistedProperties),
        ),
      ],
    )

    // Create the destructuring pattern
    const destructuringPattern = j.objectPattern(
      vars.map(({ name }) => {
        const prop = j.objectProperty(j.identifier(name), j.identifier(name))
        prop.shorthand = true
        return prop
      }),
    )

    // Create the new declaration
    const newDecl = j.variableDeclaration('const', [
      j.variableDeclarator(destructuringPattern, hoistedCall),
    ])

    // Check if all declarators in the original declaration are being hoisted
    const allDeclarators = decl.value.declarations
    const allHoisted = allDeclarators.every((d: any) =>
      d.type === 'VariableDeclarator'
      && d.id.type === 'Identifier'
      && vars.some(v => v.name === d.id.name),
    )

    if (allHoisted) {
      // Replace the entire declaration
      j(decl).replaceWith(newDecl)
    }
    else {
      // Remove only the hoisted declarators and add new declaration after
      const remainingDeclarators = allDeclarators.filter((d: any) =>
        !(d.type === 'VariableDeclarator'
          && d.id.type === 'Identifier'
          && vars.some(v => v.name === d.id.name)),
      )
      decl.value.declarations = remainingDeclarators
      j(decl).insertAfter(newDecl)
    }
  })
}

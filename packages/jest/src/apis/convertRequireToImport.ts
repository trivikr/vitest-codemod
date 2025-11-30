import type { Collection, JSCodeshift } from 'jscodeshift'

/**
 * Convert require() calls to dynamic import() for better Vitest compatibility.
 *
 * Before:
 * const { default: Foo } = require('./module');
 * beforeEach(() => {
 *   const bar = require('./module');
 * });
 *
 * After:
 * const { default: Foo } = await import('./module');
 * beforeEach(async () => {
 *   const bar = await import('./module');
 * });
 *
 * This is important because Vitest's mocking system works better with
 * dynamic import() than with require() for mocked modules.
 */
export const convertRequireToImport = (j: JSCodeshift, source: Collection<any>): void => {
  // Find all require() calls that are used to import modules with type assertions
  // Pattern: require('module') as typeof import('module')
  source.find(j.CallExpression, {
    callee: { type: 'Identifier', name: 'require' },
  }).forEach((path) => {
    const args = path.value.arguments
    if (args.length !== 1)
      return

    // Get the module path
    const modulePathArg = args[0]
    if (modulePathArg.type !== 'StringLiteral' && modulePathArg.type !== 'Literal')
      return

    const modulePath = (modulePathArg as any).value as string

    // Only convert relative imports (starting with ./ or ../)
    if (!modulePath.startsWith('.'))
      return

    // Find the containing function and make it async if needed
    let currentPath = path.parentPath
    while (currentPath) {
      const node = currentPath.value
      if (
        node.type === 'ArrowFunctionExpression'
        || node.type === 'FunctionExpression'
        || node.type === 'FunctionDeclaration'
      ) {
        // Make the function async if it isn't already
        if (!node.async)
          node.async = true

        break
      }
      // If we hit a Program node, we're at the top level (top-level await is allowed)
      if (node.type === 'Program')
        break

      currentPath = currentPath.parentPath
    }

    // Create the dynamic import expression: import('module')
    const importCall = j.callExpression(
      j.identifier('import'),
      [j.stringLiteral(modulePath)],
    )

    // Wrap with await: await import('module')
    const awaitExpression = j.awaitExpression(importCall)

    // Replace require() with await import()
    j(path).replaceWith(awaitExpression)
  })
}

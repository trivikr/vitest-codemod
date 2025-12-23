import type { Collection, JSCodeshift } from 'jscodeshift'

/**
 * Deduplicate vi.mock calls for the same module.
 * When multiple mocks exist for the same module:
 * - If there's a factory mock and empty mocks, remove the empty mocks
 * - If there are multiple factory mocks, keep only the last one (it overrides previous ones)
 */
export function deduplicateViMocks(j: JSCodeshift, source: Collection<any>): void {
  // Find all vi.mock calls
  const mockCalls = source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'vi' },
      property: { type: 'Identifier', name: 'mock' },
    },
  })

  // Group mocks by module path, preserving order
  const mocksByModule = new Map<string, Array<{ path: any; hasFactory: boolean; index: number }>>()
  let index = 0

  mockCalls.forEach((path) => {
    const args = path.value.arguments
    if (args.length === 0)
      return

    const firstArg = args[0]
    if (firstArg.type !== 'StringLiteral' && firstArg.type !== 'Literal')
      return

    const modulePath = firstArg.value as string
    const hasFactory = args.length > 1

    if (!mocksByModule.has(modulePath))
      mocksByModule.set(modulePath, [])

    mocksByModule.get(modulePath)!.push({ path, hasFactory, index: index++ })
  })

  // For each module with duplicates, keep only the last factory mock (or last mock if no factory)
  mocksByModule.forEach((mocks) => {
    if (mocks.length <= 1)
      return

    // Find the last factory mock, or last mock if none have factories
    const factoryMocks = mocks.filter(m => m.hasFactory)
    const mockToKeep = factoryMocks.length > 0
      ? factoryMocks[factoryMocks.length - 1]
      : mocks[mocks.length - 1]

    // Remove all mocks except the one to keep
    mocks.forEach((mock) => {
      if (mock.index === mockToKeep.index)
        return

      // Find the parent expression statement and remove it
      let parent = mock.path
      while (parent && parent.value.type !== 'ExpressionStatement')
        parent = parent.parentPath

      if (parent)
        j(parent).remove()
    })
  })
}

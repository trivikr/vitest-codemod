import { dirname, join, resolve } from 'node:path'
import type {
  ArrowFunctionExpression, Collection, FunctionExpression,
  Identifier, JSCodeshift, MemberExpression, ObjectProperty,
} from 'jscodeshift'

export function updateDefaultExportMocks(j: JSCodeshift, source: Collection<any>, filePath: string) {
  // Find all jest.mock() and jest.setMock() calls
  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'jest' },
      property: { type: 'Identifier' },
    },
  }).filter(path => ['mock', 'setMock'].includes(
    ((path.value.callee as MemberExpression).property as Identifier).name,
  )).forEach((path) => {
    const { arguments: args } = path.value

    if (args.length < 2)
      return

    const [moduleName, mock] = args

    if (!['ArrowFunctionExpression', 'FunctionExpression'].includes(mock.type))
      return

    if (moduleName.type !== 'Literal' && moduleName.type !== 'StringLiteral')
      return

    // Only process relative paths
    const moduleValue = (moduleName as any).value as string
    if (!moduleValue.startsWith('.') && !moduleValue.startsWith('/'))
      return

    try {
      const modulePath = resolve(join(dirname(filePath), moduleValue))

      // We use require() here to dynamically load and inspect the module at transform time.
      // This lets us determine if the module exports a function/class (needs default wrapper)
      // vs an object with named exports (no wrapper needed). This is more accurate than
      // static analysis since it handles re-exports and complex module patterns.
      const module = require(modulePath)

      // If module exports an object (named exports), don't wrap with default
      if (typeof module === 'object')
        return
    }
    catch {
      // If we can't require the module, skip this transformation
      return
    }

    if (mock.type === 'ArrowFunctionExpression') {
      const mockBody = mock.body
      if (
        mockBody.type === 'ObjectExpression'
        && mockBody.properties.map(p => ((p as ObjectProperty).key as Identifier).name).includes('default')
      )
        return

      if (mockBody.type !== 'BlockStatement') {
        mock.body = j.objectExpression([
          j.property('init', j.identifier('default'), mockBody),
        ])
        return
      }
    }

    const mockBody = (mock as FunctionExpression | ArrowFunctionExpression).body
    if (mockBody.type === 'BlockStatement') {
      const returnStatement = mockBody.body[mockBody.body.length - 1]
      if (returnStatement.type === 'ReturnStatement') {
        const returnArgument = returnStatement.argument
        if (returnArgument) {
          if (
            returnArgument.type === 'ObjectExpression'
            && returnArgument.properties.map(p => ((p as ObjectProperty).key as Identifier).name).includes('default'))
            return
          returnStatement.argument = j.objectExpression([
            j.property('init', j.identifier('default'), returnArgument),
          ])
        }
      }
    }
  })
}

import { dirname, join, resolve } from 'path'
import type { ArrowFunctionExpression, Collection, FunctionExpression, JSCodeshift } from 'jscodeshift'

export const updateDefaultExportMocks = (j: JSCodeshift, source: Collection<any>, filePath: string) => {
  source.find(j.CallExpression, {
    callee: {
      object: { type: 'Identifier', name: 'vi' },
      property: { type: 'Identifier', name: 'mock' },
    },
  }).forEach(async (path) => {
    const { arguments: args } = path.node

    if (args.length < 2)
      return

    const [moduleName, mock] = args

    if (!['ArrowFunctionExpression', 'FunctionExpression'].includes(mock.type))
      return
    const functionMock = mock as ArrowFunctionExpression | FunctionExpression

    if (moduleName.type !== 'Literal' && moduleName.type !== 'StringLiteral')
      return

    // @ts-expect-error - moduleName is a Literal/StringLiteral
    const modulePath = resolve(join(dirname(filePath), moduleName.value))

    const module = await import(modulePath)

    if (typeof module.default === 'object')
      return

    const functionMockBody = functionMock.body
    if (
      functionMockBody.type === 'ObjectExpression'
      && functionMockBody.properties.map(p => p.key.name).includes('default')
    )
      return

    if (functionMockBody.type !== 'BlockStatement') {
      functionMock.body = j.objectExpression([
        j.property('init', j.identifier('default'), functionMockBody),
      ])
    }
  })
}

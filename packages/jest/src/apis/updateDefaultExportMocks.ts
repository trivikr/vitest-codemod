import { dirname, join, resolve } from 'path'
import type { Collection, JSCodeshift } from 'jscodeshift'

export const updateDefaultExportMocks = (j: JSCodeshift, source: Collection<any>, filePath: string) => {
  source.find(j.CallExpression, {
    callee: {
      object: { type: 'Identifier', name: 'vi' },
      property: { type: 'Identifier', name: 'mock' },
    },
  }).forEach((path) => {
    const { arguments: args } = path.value

    if (args.length < 2)
      return

    const [moduleName, mock] = args

    if (!['ArrowFunctionExpression', 'FunctionExpression'].includes(mock.type))
      return

    if (moduleName.type !== 'Literal' && moduleName.type !== 'StringLiteral')
      return

    // @ts-expect-error - moduleName is a Literal/StringLiteral
    const modulePath = resolve(join(dirname(filePath), moduleName.value))

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const module = require(modulePath)

    if (typeof module === 'object')
      return

    if (mock.type === 'ArrowFunctionExpression') {
      const mockBody = mock.body
      if (
        mockBody.type === 'ObjectExpression'
        && mockBody.properties.map(p => p.key.name).includes('default')
      )
        return

      if (mockBody.type !== 'BlockStatement') {
        mock.body = j.objectExpression([
          j.property('init', j.identifier('default'), mockBody),
        ])
      }
    }
  })
}

import type { Collection, JSCodeshift } from 'jscodeshift'

export const addFactoryFunctionToMock = (j: JSCodeshift, source: Collection<any>) => {
  source.find(j.CallExpression, {
    callee: {
      object: { type: 'Identifier', name: 'jest' },
      property: { type: 'Identifier', name: 'setMock' },
    },
  }).forEach((path) => {
    const { arguments: args } = path.value

    if (args.length < 2)
      return

    const moduleExport = args[1]

    // @ts-expect-error - moduleExport is usually ObjectExpression
    args[1] = j.arrowFunctionExpression([], moduleExport)
  })
}

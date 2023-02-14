import type { Collection, JSCodeshift } from 'jscodeshift'

export const addFactoryFunctionToMock = (j: JSCodeshift, source: Collection<any>) => {
  source.find(j.CallExpression, {
    callee: {
      object: { type: 'Identifier', name: 'jest' },
      property: { type: 'Identifier', name: 'setMock' },
    },
  }).forEach((path) => {

  })
}

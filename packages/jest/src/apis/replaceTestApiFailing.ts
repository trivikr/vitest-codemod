import type { Collection, Identifier, JSCodeshift } from 'jscodeshift'

const jestFailsApisName = 'failing'
const vitestFailsApisName = 'fails'

export function replaceTestApiFailing(j: JSCodeshift, source: Collection<any>): void {
  for (const testApiName of ['it', 'test']) {
    // Replace `(it|test).failing` with `(it|test).fails`
    source.find(j.MemberExpression, {
      object: { type: 'Identifier', name: testApiName },
      property: { type: 'Identifier', name: jestFailsApisName },
    }).forEach((path) => {
      (path.node.property as Identifier).name = vitestFailsApisName
      return path
    })

    // Replace `(it|test).(only|skip).failing` with `(it|test).(only|skip).fails`
    for (const testApiModifierName of ['only', 'skip']) {
      source.find(j.MemberExpression, {
        object: {
          object: { type: 'Identifier', name: testApiName },
          property: { type: 'Identifier', name: testApiModifierName },
        },
        property: { type: 'Identifier', name: jestFailsApisName },
      }).forEach((path) => {
        (path.node.property as Identifier).name = vitestFailsApisName
        return path
      })
    }
  }
}

import type { Collection, JSCodeshift } from 'jscodeshift'

export const updateDefaultExportMocks = (j: JSCodeshift, source: Collection<any>): void => {
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'vi' },
  }).forEach((path) => {})
}

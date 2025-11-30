export function getUpdatedTransformFile(transformName: string) {
  return require.resolve(`@vitest-codemod/${transformName}/dist/transformer.js`)
}

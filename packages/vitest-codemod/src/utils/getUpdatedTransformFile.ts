export const getUpdatedTransformFile = (transformName: string) =>
  require.resolve(`@vitest-codemod/${transformName}/dist/transformer.js`);

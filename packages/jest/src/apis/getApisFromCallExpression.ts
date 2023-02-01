import type { Collection, JSCodeshift } from 'jscodeshift'

const jestGlobalApis = ['afterAll', 'afterEach', 'beforeAll', 'beforeEach', 'describe', 'test', 'it', 'expect']

export const getApisFromCallExpression = (j: JSCodeshift, source: Collection<any>): string[] => {
  const apisFromCallExpression = []

  for (const jestGlobalApi of jestGlobalApis) {
    const calls = source.find(j.CallExpression, { callee: { name: jestGlobalApi } })

    if (calls.length > 0)
      apisFromCallExpression.push(jestGlobalApi)
  }

  return apisFromCallExpression
}

import type { Collection, JSCodeshift } from 'jscodeshift'

const apiNamesRecord: Record<string, string> = {
  createMockFromModule: 'importMock',
  deepUnmock: 'unmock',
  genMockFromModule: 'importMock',
  requireActual: 'importActual',
  requireMock: 'importMock',
  setMock: 'mock',
}
const apiNamesToMakeAsync = ['genMockFromModule', 'createMockFromModule', 'requireActual', 'requireMock']
// isolateModules needs special handling - convert to vi.resetModules() + inline callback
const isolateModulesApis = ['isolateModules']

export function replaceJestObjectWithVi(j: JSCodeshift, source: Collection<any>): void {
  // Replace `jest` with `vi`
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'jest' },
  }).forEach((path) => {
    if (path.node.property.type === 'Identifier') {
      const propertyName = path.node.property.name

      if (propertyName === 'enableAutomock') {
        throw new Error(
          `The automocking API "${propertyName}" is not supported in vitest.\n`
          + 'See https://vitest.dev/guide/migration.html',
        )
      }

      if (propertyName === 'disableAutomock') {
        j(path.parentPath).remove()
        return
      }

      // Special handling for isolateModules - convert to vi.resetModules() + inline callback
      // jest.isolateModules(fn) -> vi.resetModules(); fn()
      // await jest.isolateModules(async fn) -> vi.resetModules(); await fn()
      if (isolateModulesApis.includes(propertyName)) {
        const callExpr = path.parentPath.value
        if (callExpr.type === 'CallExpression' && callExpr.arguments.length > 0) {
          const callback = callExpr.arguments[0]
          const isAsync = callback.async === true

          // Create vi.resetModules() call
          const resetModulesCall = j.expressionStatement(
            j.callExpression(
              j.memberExpression(j.identifier('vi'), j.identifier('resetModules')),
              [],
            ),
          )

          // Create the callback invocation
          let callbackInvocation: any = j.callExpression(callback, [])
          if (isAsync)
            callbackInvocation = j.awaitExpression(callbackInvocation)

          // Find the statement containing this call
          let statementPath = path.parentPath
          while (statementPath && statementPath.value.type !== 'ExpressionStatement' && statementPath.value.type !== 'AwaitExpression')
            statementPath = statementPath.parentPath

          // If the call is wrapped in await, we need to handle the AwaitExpression
          if (statementPath?.value.type === 'AwaitExpression') {
            // Find the ExpressionStatement parent
            let exprStatementPath = statementPath
            while (exprStatementPath && exprStatementPath.value.type !== 'ExpressionStatement')
              exprStatementPath = exprStatementPath.parentPath

            if (exprStatementPath) {
              // Replace the statement with resetModules + callback invocation
              j(exprStatementPath).replaceWith([
                resetModulesCall,
                j.expressionStatement(callbackInvocation),
              ])
            }
          }
          else if (statementPath?.value.type === 'ExpressionStatement') {
            // Replace the statement with resetModules + callback invocation
            j(statementPath).replaceWith([
              resetModulesCall,
              j.expressionStatement(callbackInvocation),
            ])
          }
        }
        return
      }

      if (apiNamesRecord[propertyName])
        path.node.property.name = apiNamesRecord[propertyName]

      if (apiNamesToMakeAsync.includes(propertyName)) {
        // Add await to the call expression
        j(path.parentPath).replaceWith(path =>
          j.awaitExpression(path.value),
        )

        // Add async to the function
        let parentPath = path.parentPath
        while (parentPath && !['FunctionExpression', 'ArrowFunctionExpression', 'FunctionDeclaration'].includes(parentPath.value?.type))
          parentPath = parentPath.parentPath
        if (parentPath?.value)
          parentPath.value.async = true
      }
    }

    path.node.object = j.identifier('vi')
    return path
  })
}

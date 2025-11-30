import type { Collection, JSCodeshift } from 'jscodeshift'

const jestTypeMap: Record<string, string> = {
  Mock: 'Mock',
  Mocked: 'Mocked',
  MockedFunction: 'MockedFunction',
  MockedClass: 'MockedClass',
  MockedObject: 'MockedObject',
  SpyInstance: 'SpyInstance',
}

/**
 * Replaces Jest type references with Vitest equivalents
 * e.g., `jest.Mock` -> `Mock`, `jest.Mocked<T>` -> `Mocked<T>`
 */
export const replaceJestTypes = (j: JSCodeshift, source: Collection<any>): string[] => {
  const typesToImport: Set<string> = new Set()

  // Find all TSTypeReference nodes that reference jest.X
  source.find(j.TSTypeReference).forEach((path) => {
    const typeName = path.node.typeName

    // Handle jest.Mock, jest.Mocked, etc.
    if (
      typeName.type === 'TSQualifiedName'
      && typeName.left.type === 'Identifier'
      && typeName.left.name === 'jest'
      && typeName.right.type === 'Identifier'
    ) {
      const jestTypeName = typeName.right.name
      if (jestTypeMap[jestTypeName]) {
        // Replace jest.X with just X (will be imported from vitest)
        path.node.typeName = j.identifier(jestTypeMap[jestTypeName])
        typesToImport.add(jestTypeMap[jestTypeName])
      }
    }
  })

  // Also handle TSAsExpression: `x as jest.Mock`
  source.find(j.TSAsExpression).forEach((path) => {
    const typeAnnotation = path.node.typeAnnotation

    if (
      typeAnnotation.type === 'TSTypeReference'
      && typeAnnotation.typeName.type === 'TSQualifiedName'
      && typeAnnotation.typeName.left.type === 'Identifier'
      && typeAnnotation.typeName.left.name === 'jest'
      && typeAnnotation.typeName.right.type === 'Identifier'
    ) {
      const jestTypeName = typeAnnotation.typeName.right.name
      if (jestTypeMap[jestTypeName]) {
        typeAnnotation.typeName = j.identifier(jestTypeMap[jestTypeName])
        typesToImport.add(jestTypeMap[jestTypeName])
      }
    }
  })

  return Array.from(typesToImport)
}

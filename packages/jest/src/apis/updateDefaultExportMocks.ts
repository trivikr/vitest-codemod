import { existsSync, readFileSync } from 'fs'
import { dirname, join, resolve } from 'path'
import type {
  ArrowFunctionExpression,
  Collection,
  FunctionExpression,
  Identifier,
  JSCodeshift,
  MemberExpression,
} from 'jscodeshift'

/**
 * Detects modules that are imported with default imports in the file.
 * e.g., `import cliState from '../../src/cliState'` -> '../../src/cliState' uses default export
 */
function getDefaultImportedModules(j: JSCodeshift, source: Collection<any>): Set<string> {
  const defaultImportedModules = new Set<string>()

  source.find(j.ImportDeclaration).forEach((path) => {
    const specifiers = path.value.specifiers || []
    const moduleSource = path.value.source.value

    if (typeof moduleSource !== 'string')
      return

    // Check if any specifier is a default import (ImportDefaultSpecifier)
    const hasDefaultImport = specifiers.some(
      spec => spec.type === 'ImportDefaultSpecifier',
    )

    if (hasDefaultImport)
      defaultImportedModules.add(moduleSource)
  })

  return defaultImportedModules
}

/**
 * Tries to resolve a module path to an actual file path.
 * Handles .ts, .tsx, .js, .jsx extensions and index files.
 */
function resolveModulePath(modulePath: string, fromFile: string): string | null {
  // Only handle relative paths
  if (!modulePath.startsWith('.') && !modulePath.startsWith('/'))
    return null

  const baseDir = dirname(fromFile)
  const absolutePath = resolve(baseDir, modulePath)

  // Try different extensions
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '']
  for (const ext of extensions) {
    const fullPath = absolutePath + ext
    if (existsSync(fullPath))
      return fullPath
  }

  // Try index files
  for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
    const indexPath = join(absolutePath, `index${ext}`)
    if (existsSync(indexPath))
      return indexPath
  }

  return null
}

/**
 * Checks if a source file has a default export by reading and analyzing it.
 * Uses simple regex patterns to avoid full AST parsing overhead.
 */
function hasDefaultExport(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8')

    // Check for various default export patterns
    const defaultExportPatterns = [
      /export\s+default\s+/m, // export default ...
      /export\s*\{\s*[^}]*\bdefault\b/m, // export { ... as default } or export { default }
      /module\.exports\s*=/m, // CommonJS default
      /exports\.default\s*=/m, // CommonJS default export
    ]

    return defaultExportPatterns.some(pattern => pattern.test(content))
  }
  catch {
    return false
  }
}

/**
 * Checks if a mock object already has a 'default' property
 */
function mockHasDefaultProperty(j: JSCodeshift, node: any): boolean {
  if (node.type !== 'ObjectExpression')
    return false

  return node.properties.some((p: any) => {
    if (p.type === 'ObjectProperty' || p.type === 'Property') {
      const key = p.key
      return key.type === 'Identifier' && key.name === 'default'
    }
    // SpreadElement with importActual often means partial mock
    if (p.type === 'SpreadElement')
      return false
    return false
  })
}

/**
 * Determines if a mock should be wrapped with { default: ... }
 */
function shouldWrapWithDefault(
  modulePath: string,
  filePath: string,
  defaultImportedModules: Set<string>,
): boolean {
  // Never wrap non-relative modules (node built-ins, npm packages)
  // These don't have actual default exports - Node synthesizes them for CJS interop
  // Examples: 'path', 'fs', 'axios', 'lodash'
  if (!modulePath.startsWith('.') && !modulePath.startsWith('/'))
    return false

  // If imported with default import in the test file, wrap it
  if (defaultImportedModules.has(modulePath))
    return true

  // Try to resolve and analyze the source file
  const resolvedPath = resolveModulePath(modulePath, filePath)
  if (resolvedPath && hasDefaultExport(resolvedPath))
    return true

  return false
}

/**
 * Updates mock factory functions to wrap return values in { default: ... }
 * when the mocked module uses a default export.
 *
 * Before:
 *   jest.mock('../../src/cliState', () => ({ remote: undefined }))
 *
 * After:
 *   vi.mock('../../src/cliState', () => ({ default: { remote: undefined } }))
 */
export const updateDefaultExportMocks = (j: JSCodeshift, source: Collection<any>, filePath: string) => {
  // First, collect all modules that are imported with default imports
  const defaultImportedModules = getDefaultImportedModules(j, source)

  // Find all jest.mock() and jest.setMock() calls
  source.find(j.CallExpression, {
    callee: {
      type: 'MemberExpression',
      object: { type: 'Identifier', name: 'jest' },
      property: { type: 'Identifier' },
    },
  }).filter(path => ['mock', 'setMock'].includes(
    ((path.value.callee as MemberExpression).property as Identifier).name,
  )).forEach((path) => {
    const { arguments: args } = path.value

    if (args.length < 2)
      return

    const [moduleName, mock] = args

    if (!['ArrowFunctionExpression', 'FunctionExpression'].includes(mock.type))
      return

    if (moduleName.type !== 'Literal' && moduleName.type !== 'StringLiteral')
      return

    const moduleNameValue = (moduleName as any).value as string

    // Check if this module should be wrapped with default
    if (!shouldWrapWithDefault(moduleNameValue, filePath, defaultImportedModules))
      return

    // Handle arrow functions with expression body: () => ({ ... })
    if (mock.type === 'ArrowFunctionExpression') {
      const mockBody = mock.body

      // Skip if already has 'default' property
      if (mockHasDefaultProperty(j, mockBody))
        return

      // Wrap expression body in { default: ... }
      if (mockBody.type !== 'BlockStatement') {
        mock.body = j.objectExpression([
          j.property('init', j.identifier('default'), mockBody),
        ])
        return
      }
    }

    // Handle function expressions and arrow functions with block body
    const mockBody = (mock as FunctionExpression | ArrowFunctionExpression).body
    if (mockBody.type === 'BlockStatement') {
      const returnStatement = mockBody.body[mockBody.body.length - 1]
      if (returnStatement.type === 'ReturnStatement') {
        const returnArgument = returnStatement.argument
        if (returnArgument) {
          // Skip if already has 'default' property
          if (mockHasDefaultProperty(j, returnArgument))
            return

          // Wrap return value in { default: ... }
          returnStatement.argument = j.objectExpression([
            j.property('init', j.identifier('default'), returnArgument),
          ])
        }
      }
    }
  })
}

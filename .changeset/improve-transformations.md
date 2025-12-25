---
"@vitest-codemod/jest": minor
"vitest-codemod": minor
---

Improve transformations and update dependencies

**Breaking:** Requires Node.js 20+ (previously 14+). Node 14, 16, and 18 are EOL.

- Fix `jest.SpyInstance` → `MockInstance` type mapping (was incorrectly `SpyInstance`)
- Scope mockImplementation→function conversion to vi.mocked() calls only
- Simplify requireMock handling to use vi.importMock directly
- Simplify default export detection using runtime require() inspection
- Update dependencies: jscodeshift 0.16, jest 29.7, vitest 4.x
- Add test fixtures for deduplicate-mocks and require-to-import
- Fix lint errors across codebase

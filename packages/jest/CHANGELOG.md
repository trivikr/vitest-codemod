# @vitest-codemod/jest

## 0.5.0

### Minor Changes

- [#141](https://github.com/trivikr/vitest-codemod/pull/141) [`185a4bb`](https://github.com/trivikr/vitest-codemod/commit/185a4bb7824bcf84bb694c327ef8361f48341481) Thanks [@mldangelo](https://github.com/mldangelo)! - Improve transformations and update dependencies

  **Breaking:** Requires Node.js 20+ (previously 14+). Node 14, 16, and 18 are EOL.

  - Fix `jest.SpyInstance` → `MockInstance` type mapping (was incorrectly `SpyInstance`)
  - Scope mockImplementation→function conversion to vi.mocked() calls only
  - Simplify requireMock handling to use vi.importMock directly
  - Simplify default export detection using runtime require() inspection
  - Update dependencies: jscodeshift 0.16, jest 29.7, vitest 0.34, eslint 8.57
  - Add test fixtures for deduplicate-mocks and require-to-import
  - Fix lint errors across codebase

## 0.4.5

### Patch Changes

- [#124](https://github.com/trivikr/vitest-codemod/pull/124) [`8a5b795`](https://github.com/trivikr/vitest-codemod/commit/8a5b795c3b3f746dcf7e822b06ac59a4d9087d5a) Thanks [@trivikr](https://github.com/trivikr)! - Add transformation for jest.deepUnmock

## 0.4.4

### Patch Changes

- [#122](https://github.com/trivikr/vitest-codemod/pull/122) [`a4dc312`](https://github.com/trivikr/vitest-codemod/commit/a4dc3123c689b5c0a3a4f675b3f834b57da73a75) Thanks [@trivikr](https://github.com/trivikr)! - Support transformation for jest.setMock

## 0.4.3

### Patch Changes

- [#118](https://github.com/trivikr/vitest-codemod/pull/118) [`3101933`](https://github.com/trivikr/vitest-codemod/commit/3101933710c43f14029dd5878bb453c8057c639b) Thanks [@trivikr](https://github.com/trivikr)! - Add transformation for jest.genMockFromModule

## 0.4.2

### Patch Changes

- [#116](https://github.com/trivikr/vitest-codemod/pull/116) [`b75bfe1`](https://github.com/trivikr/vitest-codemod/commit/b75bfe19722e4b4f2d8ba683caac1e380443daa8) Thanks [@trivikr](https://github.com/trivikr)! - Support transformation of default exports

## 0.4.1

### Patch Changes

- [#115](https://github.com/trivikr/vitest-codemod/pull/115) [`66c860c`](https://github.com/trivikr/vitest-codemod/commit/66c860cd02582f3fe33087a7aec963cc135f53ae) Thanks [@trivikr](https://github.com/trivikr)! - Add link to migration guide in the error on jest.enableAutomock()

- [#113](https://github.com/trivikr/vitest-codemod/pull/113) [`8c28866`](https://github.com/trivikr/vitest-codemod/commit/8c28866f877daa9c4aa9b06ef4c2a071bc22ada4) Thanks [@trivikr](https://github.com/trivikr)! - Delete jest.disableAutomock() as vitest does not mock by default

## 0.4.0

### Minor Changes

- [#100](https://github.com/trivikr/vitest-codemod/pull/100) [`76a430f`](https://github.com/trivikr/vitest-codemod/commit/76a430f2d001e161e8b4b8f4109e6c13eaeb96ab) Thanks [@trivikr](https://github.com/trivikr)! - Support Jest APIs which change to async in Vitest

### Patch Changes

- [#98](https://github.com/trivikr/vitest-codemod/pull/98) [`8a1a1c6`](https://github.com/trivikr/vitest-codemod/commit/8a1a1c6dde6459ffa531363d5903b84af17ec253) Thanks [@trivikr](https://github.com/trivikr)! - Add transformation for jest.requireMock

- [#95](https://github.com/trivikr/vitest-codemod/pull/95) [`dd88dc7`](https://github.com/trivikr/vitest-codemod/commit/dd88dc78f40b5854429cc439569a8f69220bd8ae) Thanks [@trivikr](https://github.com/trivikr)! - Add transformation for jest.createMockFromModule

- [#99](https://github.com/trivikr/vitest-codemod/pull/99) [`8be7c13`](https://github.com/trivikr/vitest-codemod/commit/8be7c130950e821abed73810acc2c216674bb80d) Thanks [@trivikr](https://github.com/trivikr)! - Add transformation for jest.requireActual

## 0.3.3

### Patch Changes

- [#91](https://github.com/trivikr/vitest-codemod/pull/91) [`bb58f74`](https://github.com/trivikr/vitest-codemod/commit/bb58f7452e2d641cc2a4b2c39128fff43b66e2c2) Thanks [@trivikr](https://github.com/trivikr)! - Throw error on jest automocking APIs

## 0.3.2

### Patch Changes

- [#87](https://github.com/trivikr/vitest-codemod/pull/87) [`a4aa362`](https://github.com/trivikr/vitest-codemod/commit/a4aa362744ce81b28de8bad37cc86223d2ea7240) Thanks [@trivikr](https://github.com/trivikr)! - Transform Jest snapshots created with printBasicPrototype=true

## 0.3.1

### Patch Changes

- [#78](https://github.com/trivikr/vitest-codemod/pull/78) [`421dfeb`](https://github.com/trivikr/vitest-codemod/commit/421dfeb7982e1250dd41c9904503ff760d552581) Thanks [@jgoz](https://github.com/jgoz)! - Preserve file comments when adding imports

## 0.3.0

### Minor Changes

- [#80](https://github.com/trivikr/vitest-codemod/pull/80) [`13fb202`](https://github.com/trivikr/vitest-codemod/commit/13fb2021003c31d31ae104bab5b5f4c0da5762ae) Thanks [@trivikr](https://github.com/trivikr)! - Support transformation of jest API to vi

## 0.2.0

### Minor Changes

- [#72](https://github.com/trivikr/vitest-codemod/pull/72) [`61d4e88`](https://github.com/trivikr/vitest-codemod/commit/61d4e88847b69ea91085da635ea198b35a9eeed1) Thanks [@trivikr](https://github.com/trivikr)! - Import describe when member expression is used in jest

## 0.1.4

### Patch Changes

- [#68](https://github.com/trivikr/vitest-codemod/pull/68) [`e102378`](https://github.com/trivikr/vitest-codemod/commit/e102378f8c677d07f838dad5e09b4a55a4617b30) Thanks [@trivikr](https://github.com/trivikr)! - Support transformation of `fit` to `it.only`

## 0.1.3

### Patch Changes

- [#64](https://github.com/trivikr/vitest-codemod/pull/64) [`a38362b`](https://github.com/trivikr/vitest-codemod/commit/a38362b99ae58ce94d05655884a36086f7ddf342) Thanks [@trivikr](https://github.com/trivikr)! - Support transformation of `.failing` to `.fails`

## 0.1.2

### Patch Changes

- [#56](https://github.com/trivikr/vitest-codemod/pull/56) [`55d5334`](https://github.com/trivikr/vitest-codemod/commit/55d5334fd57703a5d5272ea19c3dfce78fa478d2) Thanks [@trivikr](https://github.com/trivikr)! - Add it/test import if a member function is called

## 0.1.1

### Patch Changes

- [#49](https://github.com/trivikr/vitest-codemod/pull/49) [`bc5275b`](https://github.com/trivikr/vitest-codemod/commit/bc5275b75421213251c022d623a08ab8329b09cd) Thanks [@trivikr](https://github.com/trivikr)! - Replace explicit jest global imports

## 0.1.0

### Minor Changes

- [#46](https://github.com/trivikr/vitest-codemod/pull/46) [`fc6bbca`](https://github.com/trivikr/vitest-codemod/commit/fc6bbca36632890c09e4f0d4167d152153a1366d) Thanks [@trivikr](https://github.com/trivikr)! - Bump to 0.1.0 as basic transform to support jest has landed

## 0.0.5

### Patch Changes

- [#42](https://github.com/trivikr/vitest-codemod/pull/42) [`9a534e3`](https://github.com/trivikr/vitest-codemod/commit/9a534e3bfc0491886cb752b46e769ea9970af272) Thanks [@trivikr](https://github.com/trivikr)! - Add vitest imports for jest globals

## 0.0.4

### Patch Changes

- [#34](https://github.com/trivikr/vitest-codemod/pull/34) [`8e60373`](https://github.com/trivikr/vitest-codemod/commit/8e60373e71a0530b86f73e18a171d249fea76ed7) Thanks [@trivikr](https://github.com/trivikr)! - Format code with @antfu/eslint-config rules

## 0.0.3

### Patch Changes

- [#30](https://github.com/trivikr/vitest-codemod/pull/30) [`0429895`](https://github.com/trivikr/vitest-codemod/commit/0429895d54d044e1e8f085fb9c5150d635c1f7f2) Thanks [@trivikr](https://github.com/trivikr)! - Use parser provided by callee

## 0.0.2

### Patch Changes

- [#26](https://github.com/trivikr/vitest-codemod/pull/26) [`bce0da7`](https://github.com/trivikr/vitest-codemod/commit/bce0da7221212bd13312b065a192d14a29ec40c4) Thanks [@trivikr](https://github.com/trivikr)! - Remove "workspace:" protocol for internal dependencies

## 0.0.1

### Patch Changes

- [#19](https://github.com/trivikr/vitest-codemod/pull/19) [`fbf7743`](https://github.com/trivikr/vitest-codemod/commit/fbf7743d28b070c8b570d80457cfaf68ebbae432) Thanks [@trivikr](https://github.com/trivikr)! - Add basic source code for @vitest-codemod/jest

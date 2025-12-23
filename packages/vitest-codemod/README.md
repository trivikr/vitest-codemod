# vitest-codemod

This repository contains a collection of codemod scripts for use with
[JSCodeshift][jscodeshift] that help migrate to [vitest][vitest].

The `vitest-codemod` CLI is a lightweight wrapper over jscodeshift.
It processes `--help`, `--version` and `--transform` options before passing them
downstream.

## Prerequisites

Requires [Node.js][install-nodejs] version 20 or higher.

## Usage

- Optionally execute dry-run for the transform, and print transformed files on stdout:
  ```console
  npx vitest-codemod --dry --print -t jest PATH...
  ```
- Run transform, and make changes to files:
  ```console
  npx vitest-codemod -t jest PATH...
  ```
- To use the latest version of vitest-codemod, clear your npx cache. You can either
  manually delete folder `$(npm get cache)/_npx/*`, or run `clear-npx-cache`.
  ```console
  npx clear-npx-cache
  ```

## Transformations

### API Replacements

- `jest` → `vi` (global object)
- `jest.fn()` → `vi.fn()`
- `jest.mock()` → `vi.mock()`
- `jest.spyOn()` → `vi.spyOn()`
- `jest.requireActual()` → `await vi.importActual()`
- `jest.requireMock()` → `await vi.importMock()`
- `jest.createMockFromModule()` → `await vi.importMock()`
- `jest.genMockFromModule()` → `await vi.importMock()`
- `jest.setMock()` → `vi.mock()`
- `jest.deepUnmock()` → `vi.unmock()`
- `jest.resetModules()` → `vi.resetModules()`
- `test.failing()` → `test.fails()`
- `it.failing()` → `it.fails()`
- `fit()` → `it.only()`

### Import Handling

- Adds `import { ... } from "vitest"` with required APIs
- Removes `@jest/globals` imports
- Merges specifiers with existing vitest imports

### Type Replacements

- `jest.Mock` → `Mock`
- `jest.SpyInstance` → `MockInstance`
- `jest.Mocked<T>` → `Mocked<T>`
- `jest.MockedFunction<T>` → `MockedFunction<T>`
- `jest.MockedClass<T>` → `MockedClass<T>`
- `jest.MockedObject<T>` → `MockedObject<T>`

### Mock Factory Handling

- Adds factory functions to `vi.mock()` calls without them
- Converts `require()` inside mock factories to `await import()`
- Removes duplicate mock calls for the same module

### Snapshot Handling

- Removes `Array` and `Object` prototype prefixes from snapshots

## Example

```console
$ cat example.spec.js
describe("basic", () => {
  test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
  })
});

$ npx vitest-codemod -t jest example.spec.js

$ cat example.spec.js
import { describe, expect, test } from "vitest";
describe("basic", () => {
  test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
  })
});
```

### Mocking Example

```javascript
// Before
jest.mock('./utils');
const mockFn = jest.fn();
jest.spyOn(console, 'log');
const actual = jest.requireActual('./utils');

// After
import { vi } from "vitest";
vi.mock('./utils');
const mockFn = vi.fn();
vi.spyOn(console, 'log');
const actual = await vi.importActual('./utils');
```

## Limitations

Some patterns may require manual adjustment after running the codemod:

- `jest.isolateModules()` - Converted to `vi.resetModules()` but may need manual review
- `jest.enableAutomock()` - Not supported in Vitest
- Complex mock setups with variable hoisting may need `vi.hoisted()`
- Timer mocks may need adjustment for Vitest's API differences
- Default export detection uses `require()` at transform time, which executes module code

## License

This library is licensed under the MIT License. See the LICENSE file.

[install-nodejs]: https://nodejs.dev/learn/how-to-install-nodejs
[jscodeshift]: https://github.com/facebook/jscodeshift
[vitest]: https://vitest.dev/
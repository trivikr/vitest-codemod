# vitest-codemod

This repository contains a collection of codemod scripts for use with
[JSCodeshift][jscodeshift] that help migrate to [vitest][vitest].

The `vitest-codemod` CLI is a lightweight wrapper over jscodeshift.
It processes `--help`, `--version` and `--transform` options before passing them
downstream.

## Prerequisites

To use vitest-codemod, please install [Node.js][install-nodejs].

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

## License

This library is licensed under the MIT License. See the LICENSE file.

[install-nodejs]: https://nodejs.dev/learn/how-to-install-nodejs
[jscodeshift]: https://github.com/facebook/jscodeshift
[vitest]: https://vitest.dev/
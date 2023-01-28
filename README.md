# vitest-codemod

This repository contains a collection of codemod scripts for use with
[JSCodeshift][jscodeshift] that help migrate to [vitest][vitest].

The `vitest-codemod` CLI is a lightweight wrapper over jscodeshift.
It processes `--help`, `--version` and `--transform` options before passing them
downstream.

Check details in [packages/vitest-codemod/README.md](packages/vitest-codemod/README.md).

[jscodeshift]: https://github.com/facebook/jscodeshift
[vitest]: https://vitest.dev/

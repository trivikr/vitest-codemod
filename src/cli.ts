#!/usr/bin/env node

// Most of the code from here is from bin/jscodeshift.js
// It's kept that way so that users can reuse jscodeshift options.

// @ts-nocheck
import Runner from "jscodeshift/dist/Runner";
import path from "path";

import {
  getHelpParagraph,
  getJsCodeshiftParser,
  getTransforms,
  getUpdatedTransformFile,
} from "./utils";

const args = process.argv;
const transforms = getTransforms();

if (args[2] === "--help" || args[2] === "-h") {
  process.stdout.write(getHelpParagraph(transforms));
}

const parser = getJsCodeshiftParser();

let options, positionalArguments;
try {
  ({ options, positionalArguments } = parser.parse());
  if (positionalArguments.length === 0 && !options.stdin) {
    process.stderr.write(
      "Error: You have to provide at least one file/directory to transform." +
        "\n\n---\n\n" +
        parser.getHelpText()
    );
    process.exit(1);
  }
} catch (e) {
  const exitCode = e.exitCode === undefined ? 1 : e.exitCode;
  (exitCode ? process.stderr : process.stdout).write(e.message);
  process.exit(exitCode);
}

const { transform } = options;
if (transforms.map(({ name }) => name).includes(transform)) {
  options.transform = getUpdatedTransformFile(transform);
}

function run(paths, options) {
  Runner.run(
    /^https?/.test(options.transform) ? options.transform : path.resolve(options.transform),
    paths,
    options
  );
}

if (options.stdin) {
  let buffer = "";
  process.stdin.on("data", (data) => (buffer += data));
  process.stdin.on("end", () => run(buffer.split("\n"), options));
} else {
  run(positionalArguments, options);
}

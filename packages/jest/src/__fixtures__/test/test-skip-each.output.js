import { expect, it, test } from "vitest";
it.skip.each([
  [4, 3],
  [9, 4],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});

test.skip.each([
  [4, 3],
  [9, 4],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});
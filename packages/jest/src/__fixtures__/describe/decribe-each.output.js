import { describe, expect, test } from "vitest";
describe.each([
  [4, 2],
  [9, 3],
])("Math.sqrt(%s)", (input, output) => {
  test(`returns ${output}`, () => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
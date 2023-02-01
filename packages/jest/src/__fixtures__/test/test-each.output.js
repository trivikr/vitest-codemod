import { describe, expect, it, test } from "vitest";
describe("test-each", () => {
  it.each([
    [4, 2],
    [9, 3],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  test.each([
    [4, 2],
    [9, 3],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
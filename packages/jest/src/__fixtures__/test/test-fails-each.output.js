import { describe, expect, it, test } from "vitest";
describe("test-fails-each", () => {
  it.fails.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  test.fails.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
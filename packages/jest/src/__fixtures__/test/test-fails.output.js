import { describe, expect, it, test } from "vitest";
describe("test-fails", () => {
  it.fails("Math.sqrt(4) = 3", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  it.fails.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  test.fails("Math.sqrt(4) = 3", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  test.fails.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
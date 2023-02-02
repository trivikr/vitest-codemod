import { describe, expect, it } from "vitest";
describe("fit-failing", () => {
  it.only.fails([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
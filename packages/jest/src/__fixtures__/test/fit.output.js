import { describe, expect, it } from "vitest";
describe("fit", () => {
  it.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });

  it.only.each([
    [4, 2],
    [9, 3],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
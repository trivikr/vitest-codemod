import { describe, expect, it, test } from "vitest";
describe("test-skip", () => {
  it.skip("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });

  test.skip("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
});
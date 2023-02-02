import { describe, expect, it, test } from "vitest";
describe("test-skip-fails", () => {
  it.skip.fails("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });

  test.skip.fails("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
});
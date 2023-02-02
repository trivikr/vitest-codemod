import { describe, expect, it, test } from "vitest";
describe("test-only-fails", () => {
  it.only.fails("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });

  test.only.fails("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
});
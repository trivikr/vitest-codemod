import { describe, expect, it, test } from "vitest";
describe("test-only", () => {
  it.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });

  test.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });
});
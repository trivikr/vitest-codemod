import { describe, expect, test } from "vitest";
/**
 * Returns the square root of a number.
 * @param {number} val 
 * @returns Square root of val
 */
function sqrt(val) {
  return Math.sqrt(val);
}

describe("basic", () => {
  test("Math.sqrt()", () => {
    expect(sqrt(4)).toBe(2);
    expect(sqrt(144)).toBe(12);
    expect(sqrt(2)).toBe(Math.SQRT2);
  })
})

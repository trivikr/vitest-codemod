import { describe, expect, test } from "vitest";
describe.skip("describe-skip", () => {
  test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(3);
  })
})

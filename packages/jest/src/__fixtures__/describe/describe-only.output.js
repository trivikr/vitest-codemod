import { describe, expect, test } from "vitest";
describe.only("describe-only", () => {
  test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
  })
});

test('will not be run', () => {
  expect(Math.sqrt(4)).toBe(3);
});

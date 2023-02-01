import { describe, expect, it, test } from "vitest";
describe("test-skip", () => {
  // This failing test won't be run
  it("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  it.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });
  it.only.each([
    [[4, 2],[9, 3]]
  ])("Math.sqrt(%s) = %s", ([input, output]) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  // This failing test won't be run
  test("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  test.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });
  test.only.each([
    [[4, 2],[9, 3]]
  ])("Math.sqrt(%s) = %s", ([input, output]) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
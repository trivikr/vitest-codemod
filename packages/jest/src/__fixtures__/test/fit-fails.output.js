import { describe, expect, it } from "vitest";
describe("fit-failing", () => {
  it.only.fails("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
});
import { describe, expect, it } from "vitest";
describe("fit", () => {
  it.only("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });
});
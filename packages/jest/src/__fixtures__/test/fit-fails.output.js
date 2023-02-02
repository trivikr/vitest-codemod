import { expect, it } from "vitest";
it.only.fails("Math.sqrt(4)", () => {
  expect(Math.sqrt(4)).toBe(3);
});
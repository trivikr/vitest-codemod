import { expect, it, test } from "vitest";
it.fails("Math.sqrt(4) = 3", () => {
  expect(Math.sqrt(4)).toBe(3);
});

test.fails("Math.sqrt(4) = 3", () => {
  expect(Math.sqrt(4)).toBe(3);
});
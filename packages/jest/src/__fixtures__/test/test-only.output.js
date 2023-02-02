import { expect, it, test } from "vitest";
it.only("Math.sqrt(4)", () => {
  expect(Math.sqrt(4)).toBe(2);
});

test.only("Math.sqrt(4)", () => {
  expect(Math.sqrt(4)).toBe(2);
});
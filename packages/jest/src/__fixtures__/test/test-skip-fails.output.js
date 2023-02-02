import { expect, it, test } from "vitest";
it.skip.fails("Math.sqrt(4)", () => {
  expect(Math.sqrt(4)).toBe(3);
});

test.skip.fails("Math.sqrt(4)", () => {
  expect(Math.sqrt(4)).toBe(3);
});
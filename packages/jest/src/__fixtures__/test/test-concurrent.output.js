import { expect, it, test } from "vitest";
it.concurrent("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
});

test.concurrent("Math.sqrt()", () => {
  expect(Math.sqrt(4)).toBe(2);
});

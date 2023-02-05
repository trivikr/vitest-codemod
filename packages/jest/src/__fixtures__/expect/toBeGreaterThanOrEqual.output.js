import { expect, test } from "vitest";
test("toBeGreaterThanOrEqual", () => {
  expect(2).toBeGreaterThanOrEqual(1);
  expect(1).toBeGreaterThanOrEqual(1);
});
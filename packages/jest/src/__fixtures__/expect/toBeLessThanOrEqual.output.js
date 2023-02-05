import { expect, test } from "vitest";
test("toBeLessThanOrEqual", () => {
  expect(1).toBeLessThanOrEqual(1);
  expect(1).toBeLessThanOrEqual(2);
});
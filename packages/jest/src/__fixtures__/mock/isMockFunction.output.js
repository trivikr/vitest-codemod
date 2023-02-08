import { expect, test, vi } from "vitest";
test("isMockFunction", () => {
  const mock = vi.fn();
  expect(vi.isMockFunction(mock)).toBe(true);
});

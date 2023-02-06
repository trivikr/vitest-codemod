import { expect, test, vi } from "vitest";
test("mockName", () => {
  const mockName = "mockName";
  const mockFn = vi.fn().mockName(mockName);
  expect(mockFn.getMockName()).toBe(mockName);
})
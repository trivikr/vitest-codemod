import { expect, test, vi } from "vitest";
test("mockReturnValueOnce", () => {
  const mockFn = vi.fn(() => 1);
  expect(mockFn()).toBe(1);

  mockFn.mockReturnValueOnce(42);
  expect(mockFn()).toBe(42);

  expect(mockFn()).toBe(1);
});
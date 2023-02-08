import { expect, test, vi } from "vitest";
test("fn", () => {
  const mockFn = vi.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();

  const mockReturnsTrue = vi.fn(() => true);
  expect(mockReturnsTrue()).toBe(true);
})
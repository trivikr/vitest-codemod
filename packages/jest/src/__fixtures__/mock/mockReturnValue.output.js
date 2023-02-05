import { expect, test, vi } from "vitest";
test("mockReturnValue", () => {
  const mockFn = vi.fn(() => 1);
  expect(mockFn()).toBe(1);
  
  mockFn.mockReturnValue(42);
  expect(mockFn()).toBe(42);
  expect(mockFn()).toBe(42);
});
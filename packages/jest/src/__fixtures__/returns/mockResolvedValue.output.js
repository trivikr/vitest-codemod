import { expect, test, vi } from "vitest";
test("mockResolvedValue", () => {
  const mockFn = vi.fn(() => Promise.resolve(1));
  expect(mockFn()).resolves.toBe(1);
  
  mockFn.mockResolvedValue(42);
  expect(mockFn()).resolves.toBe(42);
  expect(mockFn()).resolves.toBe(42);
});
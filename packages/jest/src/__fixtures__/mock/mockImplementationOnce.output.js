import { expect, test, vi } from "vitest";
test("mockImplementationOnce", () => {
  const mockFn = vi.fn(() => 1);
  expect(mockFn()).toBe(1);
  
  mockFn.mockImplementationOnce(() => 42);
  expect(mockFn()).toBe(42);

  expect(mockFn()).toBe(1);
});
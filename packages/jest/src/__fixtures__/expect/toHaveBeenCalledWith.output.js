import { expect, test, vi } from "vitest";
test("toHaveBeenCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenCalledWith();
  mockFn("foo");
  expect(mockFn).toHaveBeenCalledWith("foo");
  mockFn("foo", "bar");
  expect(mockFn).toHaveBeenCalledWith("foo", "bar");
});
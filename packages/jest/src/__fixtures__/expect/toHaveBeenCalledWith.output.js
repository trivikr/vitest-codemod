import { expect, test, vi } from "vitest";
test("toHaveBeenCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  mockFn("foo");
  mockFn("foo", "bar");
  
  expect(mockFn).toHaveBeenCalledWith();
  expect(mockFn).toHaveBeenCalledWith("foo");
  expect(mockFn).toHaveBeenCalledWith("foo", "bar");
});
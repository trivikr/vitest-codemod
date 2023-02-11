import { expect, test, vi } from "vitest";
test("toBeCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  mockFn("foo");
  mockFn("foo", "bar");
  
  expect(mockFn).toBeCalledWith();
  expect(mockFn).toBeCalledWith("foo");
  expect(mockFn).toBeCalledWith("foo", "bar");
});
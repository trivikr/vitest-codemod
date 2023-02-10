import { expect, test, vi } from "vitest";
test("toBeCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).toBeCalledWith();
  mockFn("foo");
  expect(mockFn).toBeCalledWith("foo");
  mockFn("foo", "bar");
  expect(mockFn).toBeCalledWith("foo", "bar");
});
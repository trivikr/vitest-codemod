import { expect, test, vi } from "vitest";
test("toHaveBeenLastCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenLastCalledWith();

  mockFn("foo");
  expect(mockFn).toHaveBeenLastCalledWith("foo");

  mockFn("foo", "bar");
  expect(mockFn).toHaveBeenLastCalledWith("foo", "bar");
});
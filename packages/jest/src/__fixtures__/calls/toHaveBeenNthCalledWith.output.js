import { expect, test, vi } from "vitest";
test("toHaveBeenNthCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenNthCalledWith(1);

  mockFn("foo");
  expect(mockFn).toHaveBeenNthCalledWith(2, "foo");

  mockFn("foo", "bar");
  expect(mockFn).toHaveBeenNthCalledWith(3, "foo", "bar");
});
import { expect, test, vi } from "vitest";
test("nthCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).nthCalledWith(1);

  mockFn("foo");
  expect(mockFn).nthCalledWith(2, "foo");

  mockFn("foo", "bar");
  expect(mockFn).nthCalledWith(3, "foo", "bar");
});
import { expect, test, vi } from "vitest";
test("lastCalledWith", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).lastCalledWith();

  mockFn("foo");
  expect(mockFn).lastCalledWith("foo");

  mockFn("foo", "bar");
  expect(mockFn).lastCalledWith("foo", "bar");
});
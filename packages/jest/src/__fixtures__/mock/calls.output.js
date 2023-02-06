import { expect, test, vi } from "vitest";
test("calls", () => {
  const mockFn = vi.fn();
  expect(mockFn.mock.calls).toHaveLength(0);
  
  mockFn("foo");
  expect(mockFn.mock.calls).toHaveLength(1);
  expect(mockFn.mock.calls[0]).toEqual(["foo"]);
  
  mockFn("bar", "baz");
  expect(mockFn.mock.calls).toHaveLength(2);
  expect(mockFn.mock.calls[1]).toEqual(["bar", "baz"]);
})
import { expect, test, vi } from "vitest";
test("lastCall", () => {
  const mockFn = vi.fn();
  expect(mockFn.mock.lastCall).toBeUndefined();
  
  mockFn("foo");
  expect(mockFn.mock.lastCall).toEqual(["foo"]);
  
  mockFn("bar", "baz");
  expect(mockFn.mock.lastCall).toEqual(["bar", "baz"]);
})
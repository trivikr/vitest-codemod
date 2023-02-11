import { expect, test, vi } from "vitest";
test("toHaveNthReturnedWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toHaveNthReturnedWith(1, `mockFn(foo)`);
  expect(mockFn).toHaveNthReturnedWith(2, `mockFn(bar)`);
});
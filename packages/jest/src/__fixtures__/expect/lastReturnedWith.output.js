import { expect, test, vi } from "vitest";
test("lastReturnedWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).lastReturnedWith(`mockFn(foo)`);
  mockFn("bar");
  expect(mockFn).lastReturnedWith(`mockFn(bar)`);
});
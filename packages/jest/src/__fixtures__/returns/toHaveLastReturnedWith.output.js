import { expect, test, vi } from "vitest";
test("toHaveLastReturnedWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toHaveLastReturnedWith(`mockFn(foo)`);
  mockFn("bar");
  expect(mockFn).toHaveLastReturnedWith(`mockFn(bar)`);
});
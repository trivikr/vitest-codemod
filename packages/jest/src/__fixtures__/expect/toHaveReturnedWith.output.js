import { expect, test, vi } from "vitest";
test("toHaveReturnedWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toHaveReturnedWith(`mockFn(foo)`);
  expect(mockFn).toHaveReturnedWith(`mockFn(bar)`);
});
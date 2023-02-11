import { expect, test, vi } from "vitest";
test("toReturnWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toReturnWith(`mockFn(foo)`);
  expect(mockFn).toReturnWith(`mockFn(bar)`);
});
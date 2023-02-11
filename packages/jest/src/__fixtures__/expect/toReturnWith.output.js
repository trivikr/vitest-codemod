import { expect, test, vi } from "vitest";
test("toReturnWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toReturnWith(`mockFn(foo)`);
});
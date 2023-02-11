import { expect, test, vi } from "vitest";
test("toHaveReturnedWith", () => {
  const mockFn = vi.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toHaveReturnedWith(`mockFn(foo)`);
});
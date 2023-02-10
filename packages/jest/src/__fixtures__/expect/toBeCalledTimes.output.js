import { expect, test, vi } from "vitest";
test("toBeCalledTimes", () => {
  const mockFn = vi.fn();
  expect(mockFn).toBeCalledTimes(0);
  
  mockFn();
  expect(mockFn).toBeCalledTimes(1);
  mockFn();
  expect(mockFn).toBeCalledTimes(2);
});
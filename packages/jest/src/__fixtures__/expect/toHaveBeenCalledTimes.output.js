import { expect, test, vi } from "vitest";
test("toHaveBeenCalledTimes", () => {
  const mockFn = vi.fn();
  expect(mockFn).toHaveBeenCalledTimes(0);
  
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});
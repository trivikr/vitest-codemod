import { expect, test, vi } from "vitest";
test("toHaveBeenCalledTimes", () => {
  const mockFn = vi.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});
import { expect, test, vi } from "vitest";
test("toHaveBeenCalled", () => {
  const mockFn = vi.fn();
  expect(mockFn).not.toHaveBeenCalled();
  
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
import { expect, test, vi } from "vitest";
test("toBeCalled", () => {
  const mockFn = vi.fn();
  expect(mockFn).not.toBeCalled();
  
  mockFn();
  expect(mockFn).toBeCalled();
});
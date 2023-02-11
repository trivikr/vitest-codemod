import { expect, test, vi } from "vitest";
test("toHaveReturnedTimes", () => {
  const mockError = new Error("mockError");
  const mockFn = vi.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).toHaveReturnedTimes(0);
  
  mockFn.mockReturnValue(42);

  mockFn();
  expect(mockFn).toHaveReturnedTimes(1);
  mockFn();
  expect(mockFn).toHaveReturnedTimes(2);
});
import { expect, test, vi } from "vitest";
test("toHaveReturned", () => {
  const mockError = new Error("mockError");
  const mockFn = vi.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).not.toHaveReturned();

  mockFn.mockReturnValue(42);
  mockFn();
  expect(mockFn).toHaveReturned();
});
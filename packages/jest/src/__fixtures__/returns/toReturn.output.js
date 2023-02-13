import { expect, test, vi } from "vitest";
test("toReturn", () => {
  const mockError = new Error("mockError");
  const mockFn = vi.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).not.toReturn();

  mockFn.mockReturnValue(42);
  mockFn();
  expect(mockFn).toReturn();
});
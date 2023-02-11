import { expect, test, vi } from "vitest";
test("toHaveReturned", () => {
  const mockError = new Error("mockError");
  const mockFn = vi.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).not.toHaveReturned();

  const mockReturn = 42;
  mockFn.mockReturnValue(mockReturn);
  const mockOutput = mockFn();
  expect(mockOutput).toBe(mockReturn);
  // ToDo: https://github.com/vitest-dev/vitest/issues/2849
  // expect(mockFn).toHaveReturned();
});
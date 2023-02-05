import { expect, test, vi } from "vitest";
test("mockName", () => {
  const mockFn = vi.fn().mockName('mockedFunction');
  mockFn();
  expect(mockFn).toHaveBeenCalled();
})
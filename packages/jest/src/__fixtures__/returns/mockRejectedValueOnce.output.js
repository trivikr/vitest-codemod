import { expect, test, vi } from "vitest";
test("mockRejectedValueOnce", () => {
  const originalRejectMsg = "originalRejectMsg";
  const updatedRejectMsg = "updatedRejectMsg";

  const mockFn = vi.fn(() => Promise.reject(originalRejectMsg));
  expect(mockFn()).rejects.toBe(originalRejectMsg);
  
  mockFn.mockRejectedValueOnce(updatedRejectMsg);
  expect(mockFn()).rejects.toBe(updatedRejectMsg);

  expect(mockFn()).rejects.toBe(originalRejectMsg);
});
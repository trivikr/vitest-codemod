test("mockRejectedValue", () => {
  const originalRejectMsg = "originalRejectMsg";
  const updatedRejectMsg = "updatedRejectMsg";

  const mockFn = jest.fn(() => Promise.reject(originalRejectMsg));
  expect(mockFn()).rejects.toBe(originalRejectMsg);
  
  mockFn.mockRejectedValue(updatedRejectMsg);
  expect(mockFn()).rejects.toBe(updatedRejectMsg);
  expect(mockFn()).rejects.toBe(updatedRejectMsg);
});
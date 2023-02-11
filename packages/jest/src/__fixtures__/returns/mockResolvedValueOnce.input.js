test("mockResolvedValue", () => {
  const mockFn = jest.fn(() => Promise.resolve(1));
  expect(mockFn()).resolves.toBe(1);
  
  mockFn.mockResolvedValueOnce(42);
  expect(mockFn()).resolves.toBe(42);

  expect(mockFn()).resolves.toBe(1);
});
test("mockImplementationOnce", () => {
  const mockFn = jest.fn(() => 1);
  expect(mockFn()).toBe(1);
  
  mockFn.mockImplementationOnce(() => 42);
  expect(mockFn()).toBe(42);

  expect(mockFn()).toBe(1);
});
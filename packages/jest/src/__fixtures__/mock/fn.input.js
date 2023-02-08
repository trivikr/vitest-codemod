test("fn", () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();

  const mockReturnsTrue = jest.fn(() => true);
  expect(mockReturnsTrue()).toBe(true);
})
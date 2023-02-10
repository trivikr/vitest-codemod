test("toHaveBeenCalled", () => {
  const mockFn = jest.fn();
  expect(mockFn).not.toHaveBeenCalled();
  
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
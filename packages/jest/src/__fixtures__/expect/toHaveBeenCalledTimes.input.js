test("toHaveBeenCalledTimes", () => {
  const mockFn = jest.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});
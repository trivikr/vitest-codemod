test("toHaveBeenCalledTimes", () => {
  const mockFn = jest.fn();
  expect(mockFn).toHaveBeenCalledTimes(0);
  
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(1);
  mockFn();
  expect(mockFn).toHaveBeenCalledTimes(2);
});
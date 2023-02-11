test("toBeCalledTimes", () => {
  const mockFn = jest.fn();
  expect(mockFn).toBeCalledTimes(0);
  
  mockFn();
  expect(mockFn).toBeCalledTimes(1);
  mockFn();
  expect(mockFn).toBeCalledTimes(2);
});
test("toHaveReturnedTimes", () => {
  const mockError = new Error("mockError");
  const mockFn = jest.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).toHaveReturnedTimes(0);
  
  mockFn.mockReturnValue(42);

  mockFn();
  expect(mockFn).toHaveReturnedTimes(1);
  mockFn();
  expect(mockFn).toHaveReturnedTimes(2);
});
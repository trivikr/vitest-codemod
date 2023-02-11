test("toReturnTimes", () => {
  const mockError = new Error("mockError");
  const mockFn = jest.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).toReturnTimes(0);
  
  mockFn.mockReturnValue(42);

  mockFn();
  expect(mockFn).toReturnTimes(1);
  mockFn();
  expect(mockFn).toReturnTimes(2);
});
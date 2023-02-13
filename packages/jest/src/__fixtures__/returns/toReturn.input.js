test("toReturn", () => {
  const mockError = new Error("mockError");
  const mockFn = jest.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).not.toReturn();

  mockFn.mockReturnValue(42);
  mockFn();
  expect(mockFn).toReturn();
});
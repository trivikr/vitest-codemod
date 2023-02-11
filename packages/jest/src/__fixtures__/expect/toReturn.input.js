test("toReturn", () => {
  const mockError = new Error("mockError");
  const mockFn = jest.fn(() => { throw mockError; });

  try {
    mockFn();
  } catch (error) {}
  expect(mockFn).not.toReturn();

  const mockReturn = 42;
  mockFn.mockReturnValue(mockReturn);
  const mockOutput = mockFn();
  expect(mockOutput).toBe(mockReturn);
  // ToDo: https://github.com/vitest-dev/vitest/issues/2849
  // expect(mockFn).toReturn();
});
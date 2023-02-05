test("mockName", () => {
  const mockFn = jest.fn().mockName('mockedFunction');
  mockFn();
  expect(mockFn).toHaveBeenCalled();
})
test("mockName", () => {
  const mockName = "mockName";
  const mockFn = jest.fn().mockName(mockName);
  expect(mockFn.getMockName()).toBe(mockName);
})
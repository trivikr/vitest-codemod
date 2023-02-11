test("toHaveReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toHaveReturnedWith(`mockFn(foo)`);
});
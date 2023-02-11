test("toHaveReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toHaveReturnedWith(`mockFn(foo)`);
  expect(mockFn).toHaveReturnedWith(`mockFn(bar)`);
});
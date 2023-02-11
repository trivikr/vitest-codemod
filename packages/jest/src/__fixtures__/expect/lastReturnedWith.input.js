test("lastReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).lastReturnedWith(`mockFn(foo)`);
  mockFn("bar");
  expect(mockFn).lastReturnedWith(`mockFn(bar)`);
});
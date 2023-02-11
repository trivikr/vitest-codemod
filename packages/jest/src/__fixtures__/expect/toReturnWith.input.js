test("toReturnWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toReturnWith(`mockFn(foo)`);
  expect(mockFn).toReturnWith(`mockFn(bar)`);
});
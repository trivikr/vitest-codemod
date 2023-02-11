test("toReturnWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toReturnWith(`mockFn(foo)`);
});
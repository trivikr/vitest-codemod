test("toHaveLastReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  expect(mockFn).toHaveLastReturnedWith(`mockFn(foo)`);
  mockFn("bar");
  expect(mockFn).toHaveLastReturnedWith(`mockFn(bar)`);
});
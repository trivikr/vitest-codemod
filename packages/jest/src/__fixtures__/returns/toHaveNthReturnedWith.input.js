test("toHaveNthReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).toHaveNthReturnedWith(1, `mockFn(foo)`);
  expect(mockFn).toHaveNthReturnedWith(2, `mockFn(bar)`);
});
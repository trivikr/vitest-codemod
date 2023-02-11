test("nthReturnedWith", () => {
  const mockFn = jest.fn(input => `mockFn(${input})`);
  mockFn("foo");
  mockFn("bar");
  expect(mockFn).nthReturnedWith(1, `mockFn(foo)`);
  expect(mockFn).nthReturnedWith(2, `mockFn(bar)`);
});
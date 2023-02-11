test("lastCall", () => {
  const mockFn = jest.fn();
  expect(mockFn.mock.lastCall).toBeUndefined();
  
  mockFn("foo");
  expect(mockFn.mock.lastCall).toEqual(["foo"]);
  
  mockFn("bar", "baz");
  expect(mockFn.mock.lastCall).toEqual(["bar", "baz"]);
})
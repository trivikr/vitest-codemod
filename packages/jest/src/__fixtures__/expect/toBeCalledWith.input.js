test("toBeCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  expect(mockFn).toBeCalledWith();
  mockFn("foo");
  expect(mockFn).toBeCalledWith("foo");
  mockFn("foo", "bar");
  expect(mockFn).toBeCalledWith("foo", "bar");
});
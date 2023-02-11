test("toBeCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  mockFn("foo");
  mockFn("foo", "bar");
  
  expect(mockFn).toBeCalledWith();
  expect(mockFn).toBeCalledWith("foo");
  expect(mockFn).toBeCalledWith("foo", "bar");
});
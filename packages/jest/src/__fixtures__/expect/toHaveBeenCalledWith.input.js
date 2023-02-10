test("toHaveBeenCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenCalledWith();
  mockFn("foo");
  expect(mockFn).toHaveBeenCalledWith("foo");
  mockFn("foo", "bar");
  expect(mockFn).toHaveBeenCalledWith("foo", "bar");
});
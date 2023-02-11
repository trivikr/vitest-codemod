test("toHaveBeenCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  mockFn("foo");
  mockFn("foo", "bar");
  
  expect(mockFn).toHaveBeenCalledWith();
  expect(mockFn).toHaveBeenCalledWith("foo");
  expect(mockFn).toHaveBeenCalledWith("foo", "bar");
});
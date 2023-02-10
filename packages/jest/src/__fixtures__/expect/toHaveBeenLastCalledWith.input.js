test("toHaveBeenLastCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  expect(mockFn).toHaveBeenLastCalledWith();

  mockFn("foo");
  expect(mockFn).toHaveBeenLastCalledWith("foo");

  mockFn("foo", "bar");
  expect(mockFn).toHaveBeenLastCalledWith("foo", "bar");
});
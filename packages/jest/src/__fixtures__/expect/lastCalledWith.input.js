test("lastCalledWith", () => {
  const mockFn = jest.fn();
  
  mockFn();
  expect(mockFn).lastCalledWith();

  mockFn("foo");
  expect(mockFn).lastCalledWith("foo");

  mockFn("foo", "bar");
  expect(mockFn).lastCalledWith("foo", "bar");
});
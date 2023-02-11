test("toBeCalled", () => {
  const mockFn = jest.fn();
  expect(mockFn).not.toBeCalled();
  
  mockFn();
  expect(mockFn).toBeCalled();
});
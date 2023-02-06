test("instances", () => {
  const mockFn = jest.fn();
  expect(mockFn.mock.instances).toHaveLength(0);

  const a = new mockFn();
  expect(mockFn.mock.instances).toHaveLength(1);
  expect(mockFn.mock.instances[0]).toBe(a);

  const b = new mockFn();
  expect(mockFn.mock.instances).toHaveLength(2);
  expect(mockFn.mock.instances[1]).toBe(b);
});
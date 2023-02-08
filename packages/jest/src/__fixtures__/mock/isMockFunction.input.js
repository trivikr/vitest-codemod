test("isMockFunction", () => {
  const mock = jest.fn();
  expect(jest.isMockFunction(mock)).toBe(true);
});

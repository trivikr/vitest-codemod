test("createMockFromModule", () => {
  const { getTokenModule } = jest.createMockFromModule("./getTokenModule");
  expect(getTokenModule._isMockFunction).toBe(true);
});
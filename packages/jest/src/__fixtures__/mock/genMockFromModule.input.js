test("genMockFromModule", () => {
  const { getTokenModule } = jest.genMockFromModule("./getTokenModule");
  expect(getTokenModule._isMockFunction).toBe(true);
});
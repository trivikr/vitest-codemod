test("createMockFromModule", () => {
  const { getToken } = jest.createMockFromModule("./getToken");
  expect(getToken._isMockFunction).toBe(true);
});
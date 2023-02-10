test("requireMock", () => {
  const { getToken } = jest.requireMock("./getToken");
  expect(getToken()).toBe("tokenFromMocksFolder");
});
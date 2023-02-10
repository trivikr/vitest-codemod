test("requireActual", () => {
  const { getToken } = jest.requireActual("./getToken");
  expect(getToken()).toBe("token");
});
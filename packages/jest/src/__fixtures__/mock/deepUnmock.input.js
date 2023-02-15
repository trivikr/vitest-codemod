test("deepUnmock", async () => {
  jest.deepUnmock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
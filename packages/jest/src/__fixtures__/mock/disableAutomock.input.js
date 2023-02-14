test("disableAutomock", async () => {
  jest.disableAutomock();

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
test("mock", async () => {
  jest.mock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromMocksFolder");
})
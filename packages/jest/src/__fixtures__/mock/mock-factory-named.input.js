test("mock", async () => {
  jest.mock("./getToken", () => ({
    getToken: jest.fn(() => "tokenFromFactory"),
  }));

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromFactory");
})
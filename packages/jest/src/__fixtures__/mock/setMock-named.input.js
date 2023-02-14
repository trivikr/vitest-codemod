test("setMock", async () => {
  jest.setMock("./getToken", {
    getToken: () => "tokenFromFactory",
  });

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromFactory");
})
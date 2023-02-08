test("unmock", async () => {
  jest.unmock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
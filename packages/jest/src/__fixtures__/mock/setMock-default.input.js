test("setMock", async () => {
  jest.setMock("./defaultExport", "defaultFromMock");

  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
})
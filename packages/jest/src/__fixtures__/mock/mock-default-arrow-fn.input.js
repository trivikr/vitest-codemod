test("mockDefault", async () => {
  jest.mock("./defaultExport", () => "defaultFromMock");

  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
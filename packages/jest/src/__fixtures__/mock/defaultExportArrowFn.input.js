jest.mock("./defaultExport", () => "defaultFromMock");

test("mockDefault", async () => {
  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
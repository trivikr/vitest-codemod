test("mockDefault", async () => {
  jest.mock("./defaultExport", function() {
    return "defaultFromMock";
  });

  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
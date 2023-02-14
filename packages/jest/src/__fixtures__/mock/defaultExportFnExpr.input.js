jest.mock("./defaultExport", function() {
  return "defaultFromMock";
});

test("mockDefault", async () => {
  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
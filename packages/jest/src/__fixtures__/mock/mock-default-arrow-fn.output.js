import { expect, test, vi } from "vitest";
test("mockDefault", async () => {
  vi.mock("./defaultExport", () => ({
    default: "defaultFromMock"
  }));

  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
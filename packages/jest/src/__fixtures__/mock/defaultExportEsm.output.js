import { expect, test, vi } from "vitest";
vi.mock("./defaultExport", () => ({
  __esModule: true,
  default: "defaultFromMock"
}));

test("mockDefault", async () => {
  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
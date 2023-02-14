import { expect, test, vi } from "vitest";
vi.mock("./defaultExport", function() {
  return { default: "defaultFromMock" };
});

test("mockDefault", async () => {
  const { default: defaultExport } = await import("./defaultExport");
  expect(defaultExport).toBe("defaultFromMock");
});
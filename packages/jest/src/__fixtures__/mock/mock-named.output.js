import { expect, test, vi } from "vitest";
test("mock", async () => {
  vi.mock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromMocksFolder");
})
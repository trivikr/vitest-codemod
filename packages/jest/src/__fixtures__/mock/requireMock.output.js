import { expect, test, vi } from "vitest";
test("requireMock", async () => {
  const { getToken } = await vi.importMock("./getToken");
  expect(getToken()).toBe("tokenFromMocksFolder");
});
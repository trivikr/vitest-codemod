import { expect, test, vi } from "vitest";
test("requireActual", async () => {
  const { getToken } = await vi.importActual("./getToken");
  expect(getToken()).toBe("token");
});
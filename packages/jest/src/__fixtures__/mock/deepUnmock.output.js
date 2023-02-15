import { expect, test, vi } from "vitest";
test("deepUnmock", async () => {
  vi.unmock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
import { expect, test, vi } from "vitest";
test("unmock", async () => {
  vi.unmock("./getToken");

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
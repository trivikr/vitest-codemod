import { expect, test } from "vitest";
test("disableAutomock", async () => {
  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
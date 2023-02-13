import { expect, test } from "vitest";
test("disableAutomock", async () => {
  // Vitest does not automock by default https://vitest.dev/guide/migration.html
  // Explicit call to disable automock below can be deleted.
  // jest.disableAutomock();

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("token");
});
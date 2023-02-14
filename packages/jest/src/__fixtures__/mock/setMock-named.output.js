import { expect, test, vi } from "vitest";
test("setMock", async () => {
  vi.mock("./getToken", () => ({
    getToken: () => "tokenFromFactory"
  }));

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromFactory");
})
import { expect, test, vi } from "vitest";
test("mock", async () => {
  vi.mock("./getToken", () => ({
    getToken: vi.fn(() => "tokenFromFactory"),
  }));

  const { getToken } = await import("./getToken");
  expect(getToken()).toBe("tokenFromFactory");
})
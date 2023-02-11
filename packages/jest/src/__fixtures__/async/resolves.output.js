import { describe, expect, test } from "vitest";
describe("resolves", () => {
  test("return", () => {
    return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  });

  test("await", async () => {
    await expect(Promise.resolve("lemon")).resolves.toBe("lemon");
  });
});

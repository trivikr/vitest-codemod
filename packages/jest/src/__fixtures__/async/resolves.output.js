import { describe, expect, test } from "vitest";
describe("resolves", () => {
  const mockData = "data";
  const dataFn = async () => mockData;

  test("return", () => {
    return expect(dataFn()).resolves.toBe(mockData);
  });

  test("await", async () => {
    await expect(dataFn()).resolves.toBe(mockData);
  });
});

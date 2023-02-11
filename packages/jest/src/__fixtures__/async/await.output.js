import { describe, expect, test } from "vitest";
describe("await", () => {
  test("data", async () => {
    const mockData = "data";
    const dataFn = async () => mockData;

    const data = await dataFn();
    expect(data).toBe(mockData);
  });

  test("error", async () => {
    expect.assertions(1);
    const mockError = new Error("error");
    const errorFn = async () => { throw mockError; };

    try {
      await errorFn();
    } catch(error) {
      expect(error).toBe(mockError);
    }
  });
});
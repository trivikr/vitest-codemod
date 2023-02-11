import { describe, expect, test } from "vitest";
describe("promises", () => {
  describe("data", () => {
    const mockData = "data";
    const dataFn = async () => mockData;

    test("return", () => {
      return dataFn().then((data) => {
        expect(data).toBe(mockData);
      });
    });

    test("await", async () => {
      await dataFn().then((data) => {
        expect(data).toBe(mockData);
      });
    });
  });

  describe("error", () => {
    const mockError = new Error("error");
    const errorFn = async () => { throw mockError; };

    test("return", () => {
      return errorFn().catch((error) => {
        expect(error).toBe(mockError);
      });
    });

    test("await", async () => {
      await errorFn().catch((error) => {
        expect(error).toBe(mockError);
      });
    });
  });
});
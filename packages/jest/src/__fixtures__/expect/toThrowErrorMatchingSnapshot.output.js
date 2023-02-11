import { expect, test } from "vitest";
test("toThrowErrorMatchingSnapshot", () => {
  expect(() => {
    throw new Error("error");
  }).toThrowErrorMatchingSnapshot();
});
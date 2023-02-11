import { expect, test } from "vitest";
test("toThrowErrorMatchingSnapshot", () => {
  expect(() => {
    throw new Error("error");
  }).toThrowErrorMatchingSnapshot();

  expect(() => {
    throw new Error("error with hint");
  }).toThrowErrorMatchingSnapshot("hint");
});
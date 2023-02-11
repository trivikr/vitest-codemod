import { expect, test } from "vitest";
test("toThrowErrorMatchingInlineSnapshot", () => {
  expect(() => {
    throw new Error("error");
  }).toThrowErrorMatchingInlineSnapshot(`"error"`);
});
import { expect, test } from "vitest";
test("toContainEqual", () => {
  expect([{ foo: "bar" }]).toContainEqual({ foo: "bar" });
});
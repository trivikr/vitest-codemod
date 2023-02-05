import { expect, test } from "vitest";
test("toThrow", () => {
  expect(
    () => { throw new Error("foo bar baz");}
  ).toThrow("foo");
});
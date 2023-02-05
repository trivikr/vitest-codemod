import { expect, test } from "vitest";
test("hasAssertions", () => {
  expect.hasAssertions();
  expect("foo").toBe("foo");
});
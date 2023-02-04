import { expect, test } from "vitest";
test("not", () => {
  expect("foo").not.toBe("bar");
});
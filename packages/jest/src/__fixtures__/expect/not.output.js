import { expect, test } from "vitest";
test("the best flavor is not coconut", () => {
  expect("foo").not.toBe("bar");
});
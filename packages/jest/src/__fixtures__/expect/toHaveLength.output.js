import { expect, test } from "vitest";
test("toHaveLength", () => {
  expect([1, 2, 3]).toHaveLength(3);
  expect("abc").toHaveLength(3);
});

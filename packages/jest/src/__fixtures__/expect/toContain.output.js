import { expect, test } from "vitest";
test("toContain", () => {
  expect(["foo", "bar"]).toContain("foo");
});
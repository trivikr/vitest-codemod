import { expect, test } from "vitest";
test("arrayContaining", () => {
  expect(["foo", "bar", "baz"]).toEqual(
    expect.arrayContaining(["foo", "bar"])
  );
});
import { expect, test } from "vitest";
test("stringContaining", () => {
  expect({
    name: "foo bar baz"
  }).toEqual({
    name: expect.stringContaining("foo")
  });
});
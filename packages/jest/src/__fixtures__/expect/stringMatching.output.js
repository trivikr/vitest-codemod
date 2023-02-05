import { expect, test } from "vitest";
test("stringMatching", () => {
  expect({
    name: "foo bar baz"
  }).toEqual({
    name: expect.stringMatching(/^foo/)
  });
});
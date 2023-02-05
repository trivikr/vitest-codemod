test("stringContaining", () => {
  expect({
    name: "foo bar baz"
  }).toEqual({
    name: expect.stringContaining("foo")
  });
});
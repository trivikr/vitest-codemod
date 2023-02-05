test("stringMatching", () => {
  expect({
    name: "foo bar baz"
  }).toEqual({
    name: expect.stringMatching(/^foo/)
  });
});
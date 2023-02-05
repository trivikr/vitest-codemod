test("hasAssertions", () => {
  expect.hasAssertions();
  expect("foo").toBe("foo");
});
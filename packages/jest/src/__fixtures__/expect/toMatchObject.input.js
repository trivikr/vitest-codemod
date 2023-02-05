test("toMatchObject", () => {
  expect({
    foo: "bar",
    baz: 42,
  }).toMatchObject({ foo: "bar" });
});
test("arrayContaining", () => {
  expect(["foo", "bar", "baz"]).toEqual(
    expect.arrayContaining(["foo", "bar"])
  );
});
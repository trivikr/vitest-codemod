describe("toMatchInlineSnapshot", () => {
  test("string", () => {
    expect("foobar".toUpperCase()).toMatchInlineSnapshot(`"FOOBAR"`);
  });

  test("object", () => {
    expect({ foo: "bar" }).toMatchInlineSnapshot(`\n{\n  "foo": "bar",\n}\n`);
  });
});
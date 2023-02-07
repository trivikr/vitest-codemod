it("toMatchInlineSnapshot", () => {
  expect("foobar".toUpperCase()).toMatchInlineSnapshot(`"FOOBAR"`);
});

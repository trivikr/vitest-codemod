test("toThrowErrorMatchingInlineSnapshot", () => {
  expect(() => {
    throw new Error("error");
  }).toThrowErrorMatchingInlineSnapshot(`"error"`);
});
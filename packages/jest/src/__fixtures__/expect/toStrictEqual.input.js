class Stock {
  constructor(type) {
    this.type = type;
  }
}

test("structurally the same, but semantically different", () => {
  expect(new Stock("apples")).toEqual({ type: "apples" });
  expect(new Stock("apples")).not.toStrictEqual({ type: "apples" });
});
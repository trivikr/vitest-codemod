test("toThrowErrorMatchingSnapshot", () => {
  expect(() => {
    throw new Error("error");
  }).toThrowErrorMatchingSnapshot();
});
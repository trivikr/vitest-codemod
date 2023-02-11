describe("rejects", () => {
  const mockError = new Error("error");
  const errorFn = async () => { throw mockError; };

  test("return", () => {
    return expect(errorFn()).rejects.toThrow(mockError);
  });

  test("await", async () => {
    await expect(errorFn()).rejects.toThrow(mockError);
  });
});

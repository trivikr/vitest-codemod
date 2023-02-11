describe("rejects", () => {
  test("return", () => {
    return expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
  });

  test("await", async () => {
    await expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
  });
});

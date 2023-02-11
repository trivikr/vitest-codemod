describe("resolves", () => {
  const mockData = "data";
  const dataFn = () => Promise.resolve(mockData);

  test("return", () => {
    return expect(dataFn()).resolves.toBe(mockData);
  });

  test("await", async () => {
    await expect(dataFn()).resolves.toBe(mockData);
  });
});

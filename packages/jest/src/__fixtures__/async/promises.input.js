describe("promises", () => {
  describe("data", () => {
    const mockData = "data";
    const dataFn = () => Promise.resolve(mockData);

    test("return", () => {
      return dataFn().then((data) => {
        expect(data).toBe(mockData);
      });
    });

    test("await", async () => {
      await dataFn().then((data) => {
        expect(data).toBe(mockData);
      });
    });
  });

  describe("error", () => {
    const mockError = new Error("error");
    const dataFn = () => Promise.reject(mockError);

    test("return", () => {
      return dataFn().catch((error) => {
        expect(error).toBe(mockError);
      });
    });

    test("await", async () => {
      await dataFn().catch((error) => {
        expect(error).toBe(mockError);
      });
    });
  });
});
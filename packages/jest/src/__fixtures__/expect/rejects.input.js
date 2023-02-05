test("rejects", () => {
  return expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
});

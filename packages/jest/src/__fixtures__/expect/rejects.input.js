test("rejects to octopus", () => {
  return expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
});

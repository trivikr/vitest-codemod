describe("fit-failing", () => {
  fit.failing([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
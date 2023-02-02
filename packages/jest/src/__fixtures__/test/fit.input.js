describe("fit", () => {
  fit("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(2);
  });

  fit.each([
    [4, 2],
    [9, 3],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
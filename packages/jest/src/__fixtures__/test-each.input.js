describe("test-each", () => {
  test.each([
    [[4, 2],[9, 3]]
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  it.each([
    [[4, 2],[9, 3]]
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
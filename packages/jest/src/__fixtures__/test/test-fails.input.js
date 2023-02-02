describe("test-fails", () => {
  it.failing("Math.sqrt(4) = 3", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  it.failing.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  test.failing("Math.sqrt(4) = 3", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  test.failing.each([
    [4, 3],
    [9, 4],
  ])("Math.sqrt(%s) = %s", (input, output) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
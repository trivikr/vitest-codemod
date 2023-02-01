describe("test-skip", () => {
  it.skip("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  it.skip.each([
    [[4, 3],[9, 4]]
  ])("Math.sqrt(%s) = %s", ([input, output]) => {
    expect(Math.sqrt(input)).toBe(output);
  });

  test.skip("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  test.skip.each([
    [[4, 3],[9, 4]]
  ])("Math.sqrt(%s) = %s", ([input, output]) => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
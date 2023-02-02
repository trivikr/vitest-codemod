describe("test-skip", () => {
  // This failing test won't be run
  it("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  it.only.failing("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });

  // This failing test won't be run
  test("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
  test.only.failing("Math.sqrt(4)", () => {
    expect(Math.sqrt(4)).toBe(3);
  });
});
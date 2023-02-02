describe.skip.each([
  [4, 3],
  [9, 4],
])("Math.sqrt(%s)", (input, output) => {
  test(`returns ${output}`, () => {
    expect(Math.sqrt(input)).toBe(output);
  });
});
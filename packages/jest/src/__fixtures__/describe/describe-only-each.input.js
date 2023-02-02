describe.only.each([
  [4, 2],
  [9, 3],
])("Math.sqrt(%s)", (input, output) => {
  test(`returns ${output}`, () => {
    expect(Math.sqrt(input)).toBe(output);
  });
});

test('will not be run', () => {
  expect(Math.sqrt(4)).toBe(3);
});
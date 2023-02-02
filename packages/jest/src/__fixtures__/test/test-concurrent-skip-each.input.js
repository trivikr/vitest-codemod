it.concurrent.skip.each([
  [4, 3],
  [9, 4],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});

test.concurrent.skip.each([
  [4, 3],
  [9, 4],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});
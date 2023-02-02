it.concurrent.each([
  [4, 2],
  [9, 3],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});

test.concurrent.each([
  [4, 2],
  [9, 3],
])("Math.sqrt(%s) = %s", (input, output) => {
  expect(Math.sqrt(input)).toBe(output);
});
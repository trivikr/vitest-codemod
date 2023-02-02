describe.skip.each([
  [1, 1, 3],
  [1, 2, 4],
  [2, 1, 4],
])('.add(%i, %i)', (a, b, expected) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });
});
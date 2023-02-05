test.each([false, 0, '', null, undefined, NaN])("toBeFalsy", (value) => {
  expect(value).toBeFalsy();
});
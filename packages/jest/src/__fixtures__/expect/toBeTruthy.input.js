test.each([false, 0, '', null, undefined, NaN])("toBeTruthy", (value) => {
  expect(value).not.toBeTruthy();
});
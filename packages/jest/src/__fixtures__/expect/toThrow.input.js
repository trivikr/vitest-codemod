test("toThrow", () => {
  class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
  }

  function throwFn() {
    throw new CustomError("foo bar baz");
  };
  
  // Test that the error message says "foo" somewhere: these are equivalent
  expect(throwFn).toThrow(/foo/);
  expect(throwFn).toThrow("foo");

  // Test the exact error message
  expect(throwFn).toThrow(/^foo bar baz$/);
  expect(throwFn).toThrow(new Error("foo bar baz"));

  // Test that we get a CustomError
  expect(throwFn).toThrow(CustomError);
});
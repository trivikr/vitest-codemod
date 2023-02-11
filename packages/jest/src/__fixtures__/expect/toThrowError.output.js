import { expect, test } from "vitest";
test("toThrowError", () => {
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
  expect(throwFn).toThrowError(/foo/);
  expect(throwFn).toThrowError("foo");

  // Test the exact error message
  expect(throwFn).toThrowError(/^foo bar baz$/);
  expect(throwFn).toThrowError(new Error("foo bar baz"));

  // Test that we get a CustomError
  expect(throwFn).toThrowError(CustomError);
});
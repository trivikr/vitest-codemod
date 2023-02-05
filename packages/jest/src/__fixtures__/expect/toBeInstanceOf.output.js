import { expect, test } from "vitest";
test("toBeInstanceOf", () => {
  class A {}
  expect(new A()).toBeInstanceOf(A);
  expect(() => {}).toBeInstanceOf(Function);
});
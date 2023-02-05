import { expect, test } from "vitest";
test("objectContaining", () => {
  expect({
    examples: [
      {
        foo: "bar",
        baz: 42,
      }
    ]
  }).toEqual({ 
    examples: [
      expect.objectContaining({foo: "bar" })
    ]
  });
});
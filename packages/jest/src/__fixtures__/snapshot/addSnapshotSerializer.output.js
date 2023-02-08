import { describe, expect, test } from "vitest";
describe("addSnapshotSerializer", () => {
  expect.addSnapshotSerializer({
    serialize(val) {
      return JSON.stringify(val);
    },
    test(val) {
      return val;
    }
  });

  describe("toMatchSnapshot", () => {
    test("string", () => {
      expect("foobar".toUpperCase()).toMatchSnapshot();
    });

    test("object", () => {
      expect({ foo: "bar" }).toMatchSnapshot();
    });
  });

  describe("toMatchInlineSnapshot", () => {
    test("string", () => {
      expect("foobar".toUpperCase()).toMatchInlineSnapshot(`"FOOBAR"`);
    });

    test("object", () => {
      expect({ foo: "bar" }).toMatchInlineSnapshot(`{"foo":"bar"}`);
    });
  });
});
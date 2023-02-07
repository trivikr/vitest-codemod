import { expect, it } from "vitest";
it("toMatchInlineSnapshot", () => {
  expect("foobar".toUpperCase()).toMatchInlineSnapshot(`"FOOBAR"`);
});

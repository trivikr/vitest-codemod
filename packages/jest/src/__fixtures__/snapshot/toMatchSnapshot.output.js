import { expect, it } from "vitest";
it("toMatchSnapshot", () => {
  expect("foobar".toUpperCase()).toMatchSnapshot();
});

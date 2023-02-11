import { expect, test } from "vitest";
test("resolves", () => {
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

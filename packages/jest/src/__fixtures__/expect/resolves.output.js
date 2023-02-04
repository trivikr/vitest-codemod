import { expect, test } from "vitest";
test("resolves to lemon", () => {
  return expect(Promise.resolve("lemon")).resolves.toBe("lemon");
});

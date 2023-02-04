import { expect, test } from "vitest";
test("rejects to octopus", () => {
  return expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
});

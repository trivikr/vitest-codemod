import { expect, test } from "vitest";
test("rejects", () => {
  return expect(Promise.reject(new Error("error"))).rejects.toThrow("error");
});

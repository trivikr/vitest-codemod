import { describe, expect, test } from "vitest";
describe("toMatchSnapshot", () => {
  test("string", () => {
    expect("foobar".toUpperCase()).toMatchSnapshot();
  });

  test("object", () => {
    expect({
      createdAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: "John Doe"
    }).toMatchSnapshot({
      createdAt: expect.any(Date),
      id: expect.any(Number),
    });
  });
});

/*
 * Copyright 1994 (c) Netscape, Inc. and its affiliates. All Rights Reserved.
 */

describe("basic", () => {
  test("Math.sqrt()", () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(Math.sqrt(144)).toBe(12);
    expect(Math.sqrt(2)).toBe(Math.SQRT2);
  })
})

/*
 * Example comment which should not be replaced.
 */
import { describe, test } from "vitest";

import assert from 'node:assert';

describe("basic", () => {
  test("Math.sqrt()", () => {
    assert(Math.sqrt(4) === 2);
    assert(Math.sqrt(144) === 12);
    assert(Math.sqrt(2) === Math.SQRT2);
  })
})

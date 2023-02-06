import { expect, test, vi } from "vitest";
test("results", () => {
  const mockFn = vi.fn(x => x);
  expect(mockFn.mock.results).toHaveLength(0);

  mockFn();
  expect(mockFn.mock.results).toHaveLength(1);
  expect(mockFn.mock.results[0]).toEqual({
    type: "return",
    value: undefined
  });
  
  mockFn("foo");
  expect(mockFn.mock.results).toHaveLength(2);
  expect(mockFn.mock.results[1]).toEqual({
    type: "return",
    value: "foo"
  });
  
  mockFn({ bar: "baz" });
  expect(mockFn.mock.results).toHaveLength(3);
  expect(mockFn.mock.results[2]).toEqual({
    type: "return",
    value: { bar: "baz" }
  });

  const mockError = new Error("mockError");
  const mockFnWhichThrows = vi.fn(() => {
    throw mockError;
  });
  expect(mockFnWhichThrows.mock.results).toHaveLength(0);

  expect(() => {
    mockFnWhichThrows();
  }).toThrow(mockError);
  expect(mockFnWhichThrows.mock.results).toHaveLength(1);
  expect(mockFnWhichThrows.mock.results[0]).toEqual({
    type: "throw",
    value: mockError
  });
})
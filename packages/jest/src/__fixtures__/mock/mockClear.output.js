import { expect, test, vi } from "vitest";
test("mockClear", () => {
  const mockFn = vi.fn();
  
  mockFn("foo");
  expect(mockFn.mock.calls).toHaveLength(1);
  expect(mockFn.mock.instances).toHaveLength(1);
  expect(mockFn.mock.results).toHaveLength(1);
  // ToDo: https://github.com/vitest-dev/vitest/issues/2810
  // expect(mockFn.mock.contexts).toHaveLength(1);

  mockFn.mockClear();
  expect(mockFn.mock.calls).toHaveLength(0);
  expect(mockFn.mock.instances).toHaveLength(0);
  expect(mockFn.mock.results).toHaveLength(0);
  // ToDo: https://github.com/vitest-dev/vitest/issues/2810
  // expect(mockFn.mock.contexts).toHaveLength(0);
})
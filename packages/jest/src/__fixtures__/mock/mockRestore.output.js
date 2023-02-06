import { expect, test, vi } from "vitest";
test("mockRestore", () => {
  const originalReturnValue = "original";
  const mockReturnValue = "mocked";

  const module = { api: () => originalReturnValue };
  vi.spyOn(module, "api").mockImplementation(() => mockReturnValue);

  expect(module.api()).toStrictEqual(mockReturnValue);
  expect(module.api).toHaveBeenCalledTimes(1);

  module.api.mockRestore();
  expect(module.api()).toStrictEqual(originalReturnValue);
});

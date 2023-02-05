test("mockRestore", () => {
  const originalReturnValue = "original";
  const mockReturnValue = "mocked";

  const module = { api: () => originalReturnValue };
  jest.spyOn(module, "api").mockImplementation(() => mockReturnValue);

  expect(module.api()).toStrictEqual(mockReturnValue);
  expect(module.api).toHaveBeenCalledTimes(1);

  module.api.mockRestore();
  expect(module.api()).toStrictEqual(originalReturnValue);
});

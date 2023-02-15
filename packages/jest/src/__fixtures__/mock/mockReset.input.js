describe("mockReset", () => {
  const originalReturnValue = "original";
  const mockReturnValue = "mocked";

  test("spyOn", () => {
    const module = { api: () => originalReturnValue };
    jest.spyOn(module, "api").mockImplementation(() => mockReturnValue);

    expect(module.api()).toStrictEqual(mockReturnValue);
    expect(module.api).toHaveBeenCalledTimes(1);

    module.api.mockReset();
    expect(module.api).toHaveBeenCalledTimes(0);

    // Bug in jest: https://github.com/facebook/jest/issues/13916
    // expect(module.api()).toStrictEqual(undefined);
  });

  test("overwrite", () => {
    const module = { api: () => originalReturnValue };
    module.api = jest.fn().mockImplementation(() => mockReturnValue);

    expect(module.api()).toStrictEqual(mockReturnValue);
    expect(module.api).toHaveBeenCalledTimes(1);

    module.api.mockReset();
    expect(module.api).toHaveBeenCalledTimes(0);

    expect(module.api()).toStrictEqual(undefined);
  });  
});

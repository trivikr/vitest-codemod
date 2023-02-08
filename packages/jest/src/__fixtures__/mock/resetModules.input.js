test("resetModules", async () => {
  const { getToken: getToken1 } = await import("./getToken");
  const { getToken: getToken2 } = await import("./getToken");
  expect(getToken1).toBe(getToken2);
  
  jest.resetModules();
  
  const { getToken: getToken3 } = await import("./getToken");
  expect(getToken1).not.toBe(getToken3);
  expect(getToken2).not.toBe(getToken3);
});

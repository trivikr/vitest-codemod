jest.mock('./getToken', () => {
  const actual = require('./getTokenModule');
  return {
    ...actual,
    getToken: jest.fn(),
  };
});

test("require to import", async () => {
  const { getToken } = await import('./getToken');
  expect(getToken).toBeDefined();
});

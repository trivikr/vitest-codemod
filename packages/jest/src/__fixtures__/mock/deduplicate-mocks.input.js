jest.mock('./getToken');
jest.mock('./getToken', () => ({
  getToken: jest.fn(),
}));

test("dedupe", async () => {
  const { getToken } = await import('./getToken');
  expect(getToken).toBeDefined();
});

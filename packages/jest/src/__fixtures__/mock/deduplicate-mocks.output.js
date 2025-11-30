import { expect, test, vi } from "vitest";
vi.mock('./getToken', () => ({
  getToken: vi.fn(),
}));

test("dedupe", async () => {
  const { getToken } = await import('./getToken');
  expect(getToken).toBeDefined();
});

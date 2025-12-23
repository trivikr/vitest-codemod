import { expect, test, vi } from "vitest";
vi.mock('./getToken', async () => {
  const actual = await import("./getTokenModule");
  return {
    ...actual,
    getToken: vi.fn(),
  };
});

test("require to import", async () => {
  const { getToken } = await import('./getToken');
  expect(getToken).toBeDefined();
});

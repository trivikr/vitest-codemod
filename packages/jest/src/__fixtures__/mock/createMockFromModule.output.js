import { expect, test, vi } from "vitest";
test("createMockFromModule", async () => {
  const { getToken } = await vi.importMock("./getToken");
  expect(getToken._isMockFunction).toBe(true);
});
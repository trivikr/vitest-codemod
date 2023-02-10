import { expect, test, vi } from "vitest";
test("createMockFromModule", async () => {
  const { getTokenModule } = await vi.importMock("./getTokenModule");
  expect(getTokenModule._isMockFunction).toBe(true);
});
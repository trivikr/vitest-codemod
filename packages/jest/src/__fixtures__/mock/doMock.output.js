import { beforeEach, expect, test, vi } from "vitest";
beforeEach(() => {
  // resetModules is required to reset mocks in jest.
  // In vitest, however, doMock will override the previous mock.
  vi.resetModules();
});

test('getToken 1', async () => {
  vi.doMock('./getToken', () => ({
    getToken: () => 'token1',
  }));
  const { getToken } = await import('./getToken');
  expect(getToken()).toBe('token1');
});

test('getToken 2', async () => {
  vi.doMock('./getToken', () => ({
    getToken: () => 'token2',
  }));
  const { getToken } = await import('./getToken');
  // ToDo: https://github.com/vitest-dev/vitest/issues/2870
  // expect(getToken()).toBe('token2');
});
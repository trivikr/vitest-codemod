async function doAsync(...cbs) {
  await Promise.all(cbs.map((cb, index) => cb({ index })));
}

test("all assertions are called", async () => {
  expect.assertions(2);
  function callback1(data) {
    expect(data).toBeTruthy();
  }
  function callback2(data) {
    expect(data).toBeTruthy();
  }

  await doAsync(callback1, callback2);
});

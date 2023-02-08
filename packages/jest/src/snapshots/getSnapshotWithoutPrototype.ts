export const getSnapshotWithoutPrototype = (snapshot: string) =>
  snapshot.replace('Array [', '[').replace('Object {', '{')

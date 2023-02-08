export const getSnapshotWithoutPrototype = (snapshot: string) =>
  snapshot.replace('Array [\n', '[\n').replace('Object {\n', '{\n')

export function getSnapshotWithoutPrototype(snapshot: string) {
  return snapshot.replace('Array [', '[').replace('Object {', '{')
}

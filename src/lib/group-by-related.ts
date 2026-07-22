import { groupBy } from "lodash";

export type RelatedGroup<TItem, TRelated> = {
  items: TItem[];
  related: TRelated;
};

export function groupByRelated<TItem, TRelated>(
  items: readonly TItem[],
  getRelated: (item: TItem) => TRelated | null | undefined,
  getKey: (related: TRelated) => string
): RelatedGroup<TItem, TRelated>[] {
  const entries = items.flatMap((item) => {
    const related = getRelated(item);
    if (related === null || related === undefined) return [];
    return [{ item, key: getKey(related), related }];
  });

  return Object.values(groupBy(entries, "key")).map((group) => ({
    items: group.map((entry) => entry.item),
    related: group[0].related,
  }));
}

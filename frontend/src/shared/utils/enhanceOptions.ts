export default function enhanceOptions<T extends { id: number }>(
  list: T[],
  selectedIds: number[] | number | null,
): (T & { selected: boolean })[] {
  if (selectedIds === null) {
    return list.map(item => ({ ...item, selected: false }));
  }

  const ids = Array.isArray(selectedIds) ? selectedIds : [selectedIds];

  return list.map(item => ({
    ...item,
    selected: ids.includes(item.id),
  }));
}

export function toAssociativeArrayFnc<T extends { id: number | string }>(
  items: T[]
): Record<number | string, T> {
  return items.reduce(
    (acc, item) => {
      acc[item.id] = item

      return acc
    },
    {} as Record<number | string, T>
  )
}

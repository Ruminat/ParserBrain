export function notEmpty<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null && !Number.isNaN(value);
}

export function notEmptyArray<T>(arr: T[] | undefined | null): arr is T[] {
  return notEmpty(arr) && arr.length > 0;
}

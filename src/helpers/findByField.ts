type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function findByField<T extends Record<string, any>, K extends keyof T>(
  arr: readonly T[],
  fieldName: K,
  fieldValue: T[K]
): ArrayElement<typeof arr> | undefined {
  return arr.find((el: T) => el[fieldName] === fieldValue);
}

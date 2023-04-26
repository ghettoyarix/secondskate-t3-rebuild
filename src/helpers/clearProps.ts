type Nullable<T> = {
  [P in keyof T]: T[P] | null | undefined;
};

const clearProps = <T extends Record<string, any>>(obj: Nullable<T>): T => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (
      value === "undefined" ||
      value === undefined ||
      value === "any" ||
      value === null ||
      value === ""
    ) {
      delete obj[key];
    }
  });
  return obj as T;
};

export default clearProps;

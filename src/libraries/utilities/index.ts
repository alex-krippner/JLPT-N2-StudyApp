export * from "./hooks";

export const pipe = (...fns: any) => (initialValue: any) => {
  return fns.reduce((currentValue: any, currentFn: any) => {
    return currentFn(currentValue);
  }, initialValue);
};

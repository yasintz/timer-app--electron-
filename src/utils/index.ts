export function fnExtend(...args: any[]) {
  return (...fnArgs: any[]) => {
    args.forEach((fn) => {
      fn(...fnArgs);
    });
  };
}

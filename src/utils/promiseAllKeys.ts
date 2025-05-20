export const promiseAllKeys = async <T extends object>(obj: T) => {
  const ops = await Promise.all(Object.entries(obj).map(async ([k, p]) => [k, await p]));
  return Object.fromEntries(ops) as {
    [P in keyof T]: Awaited<T[P]>;
  };
};

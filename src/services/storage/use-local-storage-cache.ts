import { useCallback, useEffect, useMemo } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const keyPrefix = 'go-';

interface LocalstorageCacheValue<T> {
  data: T | undefined;
  expiry: number;
  expiryHuman: string;
}

export type LocalStorageCacheReturn<T> = [T | undefined, (newValue: T) => void, () => void];

export const useLocalstorageCache = <T = unknown>(
  key: string,
  initialValue: T | undefined,
  ttlInSeconds: number
): LocalStorageCacheReturn<T> => {
  const [value, setValue, { removeItem }] = useLocalStorageState<LocalstorageCacheValue<T>>(
    `${keyPrefix}${key}`,
    {
      defaultValue: {
        data: initialValue,
        expiry: new Date().getTime() + ttlInSeconds * 1000,
        expiryHuman: new Date(new Date().getTime() + ttlInSeconds * 1000).toString(),
      },
    }
  );

  const setValueWithTtl = useCallback(
    (newValue: T) => {
      const nowTime = new Date().getTime();
      setValue({
        data: newValue,
        expiry: ttlInSeconds * 1000 + nowTime,
        expiryHuman: new Date(ttlInSeconds * 1000 + nowTime).toString(),
      });
    },
    [setValue, ttlInSeconds]
  );

  const isExpired = useMemo(() => new Date().getTime() > value?.expiry, [value?.expiry]);

  useEffect(() => {
    if (isExpired) {
      removeItem();
    }
  }, [isExpired, key, removeItem]);

  return [value?.data, setValueWithTtl, removeItem];
};

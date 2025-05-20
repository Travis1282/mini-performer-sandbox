/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual } from 'lodash-es';
import { useEffect, useRef } from 'react';
export default function useUpdateEffect(callback: () => void, dependencies: unknown[]) {
  const isFirstRun = useRef<unknown[]>([]);
  useEffect(() => {
    if (!isEqual(isFirstRun.current, dependencies)) {
      if (isFirstRun.current.length) {
        callback();
      }
      isFirstRun.current = dependencies;
    }
  }, dependencies || []);
}

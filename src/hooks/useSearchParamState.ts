import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export function useSearchParamState(
  paramKey = ''
): [string, (newValue: null | number | string | undefined, options?: { history: string }) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const params = Object.fromEntries(searchParams);
  const [value, setValue] = useState<string>(params[paramKey]);

  const setParam = useCallback(
    (newValue: null | number | string | undefined, options = { history: 'replace' }) => {
      newValue = newValue?.toString() ?? null;
      const newSearchParams = new URLSearchParams(searchParams);
      if (newValue === null || newValue === undefined || newValue === '') {
        newSearchParams.delete(paramKey);
      } else {
        newSearchParams.set(paramKey, newValue);
      }

      const query = newSearchParams.toString();
      const url = `${location.pathname}${query ? `?${query}` : ''}`;

      navigate(url, { replace: options.history === 'replace' });
      setValue(newValue ?? '');
    },
    [searchParams, location.pathname, paramKey, navigate]
  );

  return [value, setParam];
}

export function useBatchSearchParamState(
  paramKey = ['']
): [
  string[],
  (newValues: (null | number | string | undefined)[], options?: { history: string }) => void,
] {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const params = Object.fromEntries(searchParams);
  const [values, setValues] = useState<string[]>(() => paramKey.map((key) => params[key] || ''));

  const setParam = useCallback(
    (newValues: (null | number | string | undefined)[], options = { history: 'replace' }) => {
      const newSearchParams = new URLSearchParams(searchParams);

      const valuesSet = newValues.map((newValue, index) => {
        newValue = newValue?.toString() ?? null;
        const currentParam = paramKey[index > -1 ? index : paramKey.length - 1];
        if (newValue === null || newValue === undefined || newValue === '') {
          newSearchParams.delete(currentParam);
        } else {
          newSearchParams.set(currentParam, newValue);
        }
        return newValue ?? '';
      });

      if (!newValues.length && paramKey.length === 1) {
        newSearchParams.delete(paramKey[0]);
      }

      let query = newSearchParams.toString();

      if (paramKey.length === 1 && newValues.length > 1) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(paramKey[0], newValues.join(','));

        query = newSearchParams.toString();
      }
      const url = query ? `${location.pathname}?${query}` : location.pathname;

      navigate(url, { replace: options.history === 'replace' });
      setValues(valuesSet);
    },
    [searchParams, location.pathname, paramKey, navigate]
  );

  return [values, setParam];
}

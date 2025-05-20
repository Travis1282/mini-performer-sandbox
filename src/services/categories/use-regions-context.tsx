import type { ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createContext, use, useEffect } from 'react';
import type { components } from '../maverick/generated/maverick-schema';
import { getRegions } from '../maverick/get-regions';
import { OneDayInSeconds } from '../storage/constants';
import { useLocalstorageCache } from '../storage/use-local-storage-cache';

const RegionsContext = createContext<components['schemas']['Region'][]>([]);

const useRegions = () => {
  const [regionsCache, setRegionsCache] = useLocalstorageCache<components['schemas']['Region'][]>(
    'regions',
    undefined,
    OneDayInSeconds
  );

  const { data: regions, status } = useQuery({
    queryKey: ['get', 'regions'],
    queryFn: () => getRegions(),
    enabled: !regionsCache,
  });

  useEffect(() => {
    if (status === 'pending' || status === 'error') {
      return;
    }
    if (status === 'success' && regions.data) {
      setRegionsCache(regions.data);
    }
  }, [regions, setRegionsCache, status]);

  return regionsCache ?? [];
};

export const RegionsProvider = ({ children }: { children: ReactNode }) => {
  const regions = useRegions();
  return <RegionsContext value={regions}>{children}</RegionsContext>;
};

export const useRegionsContext = () => {
  const regions = use(RegionsContext);
  if (regions === undefined) {
    throw new Error('useRegionsContext must be used within a RegionsProvider');
  }
  return regions;
};

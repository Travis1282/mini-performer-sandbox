import { useAppStore } from '@/store/AppStoreProvider'
import type { UnifiedStore } from '@/store/types'

type StateEntry<K extends keyof UnifiedStore> = [K, UnifiedStore[K]]

export function useSelectiveStateWithFallback<K extends keyof UnifiedStore>(
  entries: StateEntry<K>[]
): UnifiedStore[K][] {
  const allState = useAppStore((state: UnifiedStore) => {
    const result: Partial<UnifiedStore> = {}
    entries.forEach(([key]) => {
      result[key] = state[key]
    })
    return result as Pick<UnifiedStore, K>
  })

  return entries.map(([key, fallback]): UnifiedStore[K] => {
    if (typeof allState[key] !== 'undefined') {
      return allState[key]
    } else {
      return fallback
    }
  }) as UnifiedStore[K][]
}

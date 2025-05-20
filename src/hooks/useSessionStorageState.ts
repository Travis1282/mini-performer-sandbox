import type {
  SessionStorageOptions,
  SessionStorageState,
} from 'use-session-storage-state'
import useSessionStorageStateHook from 'use-session-storage-state'

export default function useSessionStorageState<T>(
  key: string,
  defaultValue: SessionStorageOptions<T>
): SessionStorageState<T | undefined> {
  return useSessionStorageStateHook<T>(key, defaultValue)
}

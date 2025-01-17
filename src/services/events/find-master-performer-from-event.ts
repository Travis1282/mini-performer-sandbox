import type { components } from '../maverick/generated/maverick-schema'

export function findMasterPerformerFromEvent(
  event?: components['schemas']['Event']
): components['schemas']['EventPerformer'] | undefined {
  return (
    (event &&
      event?.eventPerformers &&
      event?.eventPerformers?.find((performer) => performer.master)) ??
    event?.eventPerformers?.[0]
  )
}

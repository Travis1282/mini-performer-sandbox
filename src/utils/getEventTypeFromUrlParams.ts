export function getEventTypeFromUrl(eventTypes?: string) {
  if (!eventTypes) {
    return [];
  }
  return eventTypes?.split(',')?.map((item) => item?.toUpperCase()) as [
    'COMEDY' | 'CONCERTS' | 'PARKING' | 'SPORTS' | 'THEATER',
  ];
}

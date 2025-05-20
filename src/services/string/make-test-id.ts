// data-testid={`${region?.name?.replace(/\s+/g, '').toLocaleLowerCase()}-regionListItem`

export function makeTestid(str: string, suffix?: string) {
  return `${str.replace(/\s+/g, '').toLocaleLowerCase()}${suffix ? `-${suffix}` : ''}`;
}

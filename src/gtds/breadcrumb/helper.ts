import type { components } from '@/contracts/generated/maverick-schema'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || 'http://localhost:3000'

export interface LinkItem {
  title: string
  url: string
}

export function generateBreadcrumbLinks(
  data?: components['schemas']['Performer'],
  append?: LinkItem
): LinkItem[] {
  return [
    { title: 'GoTickets', url: `${basePath}/` },
    {
      title: `${data?.primaryCategory?.name} Tickets`,
      url: `${basePath}/${data?.primaryCategory?.slug}`,
    },
    {
      title: `${data?.name} Tickets`,
      url: `${basePath}/${data?.slug}`,
    },
    ...(append ? [append] : []),
  ]
}

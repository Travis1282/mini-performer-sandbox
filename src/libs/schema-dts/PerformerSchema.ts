import type { components } from '@/contracts/generated/maverick-schema';

export function getPerformerStructuredData(
  performer:
    | components['schemas']['Category']
    | components['schemas']['Performer']
    | components['schemas']['Venue']
) {
  const { name, heroImagePath } = performer;

  return {
    '@context': 'https://schema.org',
    headline: `${name} Tickets`,
    image: heroImagePath,
    author: [
      {
        '@type': 'Organization',
        name: 'GoTickets',
        url: 'https://gotickets.com',
      },
    ],
  };
}

import type { Listing } from '@/contracts/entities/listing';
import type { components } from '@/contracts/generated/maverick-schema';

/**
 * Adds the 'lowPrice' and 'sold' properties to the given array of listings.
 *
 * @param listings - An array of Listing objects.
 * @returns An array of Listing objects with the 'lowPrice' and 'sold' properties added.
 */
export function addListItemBadges({
  listings,
  venueConfiguration,
  event,
}: {
  listings?: Listing[];
  venueConfiguration?: components['schemas']['VenueConfiguration'];
  event?: components['schemas']['Event'];
}): {
  listings: Listing[];
  greatOrGoodDealAmount: number;
} {
  if (!listings) {
    return {
      listings: [],
      greatOrGoodDealAmount: 0,
    };
  }

  try {
    //sort the listings by sectionId exists, then price asc
    listings.sort((a, b) => {
      // Prioritize listings with sectionId
      if (a.sectionId && !b.sectionId) {
        return -1;
      }
      if (!a.sectionId && b.sectionId) {
        return 1;
      }

      if (!a.displayPrice || !b.displayPrice) {
        return 0;
      }

      // If both have sectionIds or both don't, sort by displayPrice ascending
      return a.displayPrice - b.displayPrice;
    });

    const lowestPriceBySectionId = new Map<number, number>();
    const lowestPriceByGroupId = new Map<number, number>();
    const secondLowestPriceByGroupId = new Map<number, number>();
    const listingsAmoutBySectionId = new Map<number, number>();
    const groupParentSection = new Map<number, number>();

    const isAllInTicketPage = event?.pricingType === 'ALL_IN_TICKET_PAGE';

    venueConfiguration?.sections?.forEach((section) => {
      if (section.groupId) {
        groupParentSection.set(section.id, section.groupId);
      }
    });

    // Iterates creating the lowest price maps and counting each section
    for (const listing of listings) {
      if (!listing.sectionId) {
        continue;
      }

      const sectionId = listing.sectionId;
      const price = listing.displayPrice ?? 0;
      const serviceFee = listing.serviceFee ?? 0;
      const currentDisplayPrice = isAllInTicketPage ? price + serviceFee : price;

      const groupId = groupParentSection.get(sectionId);

      if (!lowestPriceBySectionId.has(sectionId)) {
        lowestPriceBySectionId.set(sectionId, currentDisplayPrice);
      }

      if (
        lowestPriceBySectionId.has(sectionId) &&
        (lowestPriceBySectionId.get(sectionId) ?? 0) > currentDisplayPrice
      ) {
        lowestPriceBySectionId.set(sectionId, currentDisplayPrice);
      }

      if (!listingsAmoutBySectionId.has(sectionId)) {
        listingsAmoutBySectionId.set(sectionId, 1);
      } else {
        listingsAmoutBySectionId.set(sectionId, (listingsAmoutBySectionId.get(sectionId) ?? 0) + 1);
      }

      if (groupId) {
        const currentLowest = lowestPriceByGroupId.get(groupId);
        const currentSecondLowest = secondLowestPriceByGroupId.get(groupId);

        if (currentLowest === undefined) {
          lowestPriceByGroupId.set(groupId, currentDisplayPrice);
        } else if (currentDisplayPrice < currentLowest) {
          secondLowestPriceByGroupId.set(groupId, currentLowest);
          lowestPriceByGroupId.set(groupId, currentDisplayPrice);
        } else if (
          (currentSecondLowest === undefined || currentDisplayPrice < currentSecondLowest) &&
          currentDisplayPrice !== currentLowest
        ) {
          secondLowestPriceByGroupId.set(groupId, currentDisplayPrice);
        }
      }
    }

    let greatOrGoodDealAmount = 0;

    // Iterates setting the badges
    for (const listing of listings) {
      if (!listing.sectionId) {
        continue;
      }

      const sectionId = listing.sectionId;
      const groupId = groupParentSection.get(sectionId);
      const price = listing.displayPrice ?? 0;
      const serviceFee = listing.serviceFee ?? 0;

      const currentDisplayPrice = isAllInTicketPage ? price + serviceFee : price;

      if (lowestPriceBySectionId.get(sectionId) === currentDisplayPrice) {
        listing.lowPriceSection = true;
      }

      if (groupId && secondLowestPriceByGroupId.get(groupId) === currentDisplayPrice) {
        listing.goodDeal = true;
        greatOrGoodDealAmount++;
      }

      if (groupId && lowestPriceByGroupId.get(groupId) === currentDisplayPrice) {
        listing.greatDeal = true;
        greatOrGoodDealAmount++;
      }

      if (listingsAmoutBySectionId.get(sectionId) === 1) {
        listing.lastInSection = true;
      }
    }

    return {
      listings,
      greatOrGoodDealAmount,
    };
  } catch (e) {
    console.error(e);
    return {
      listings,
      greatOrGoodDealAmount: 0,
    };
  }
}

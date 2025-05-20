'use client';
// Missing growthbook check for smaller fonts/maps
import type { CSSProperties } from 'react';
// import { Button } from "@/components/Shared/Button";
// import TicketBadge from "@/components/Shared/TicketBadge";
// import Tooltip from "@/components/Shared/Tooltip";
// import { SeatSecureBadge } from "@/components/TicketsContainer/TicketListItem/SeatSecure";
// import { useVenueConfigurationContext } from "@/components/TicketsContainer/utils/useVenueConfiguration";
import clsx from 'clsx';
import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router';
import type { components } from '../../../services/maverick/generated/maverick-schema';
import type { Listing } from '../../../types/listing';
import { getEventTicketsPath } from '../../../services/events/get-event-tickets-path';
import { shouldShowClearView } from '../../../services/events/should-show-clear-view';
import { shouldShowSeatedTogether } from '../../../services/events/should-show-seated-together';
import { makeTestid } from '../../../services/string/make-test-id';
import { useVenueConfigurationContext } from '../services/useVenueConfiguration';

interface TicketListItemProps {
  className?: string;
  event: components['schemas']['Event'];
  //   isGeneralAdmission?: boolean;
  isInternational?: boolean;
  //   isMobile?: boolean;
  //   isParking: boolean;
  listing: Listing;
  //   onClick: () => void;
  quantityFilter?: number;
  showSoldTickets?: false | number;
  style?: CSSProperties;
}

// const imagePath = resolveImagePath("/img/info-icon.svg");
// const InfoIconSVG = (
//   <SVG
//     className="mr-1 h-3 w-3 lg:h-3.5 lg:w-3.5 [&>path]:fill-accent"
//     src={imagePath}
//     viewBox="0 0 21 22"
//   />
// );
// const InfoIcon = () => {
//   const { isMobile } = useIsMobile();
//   const { setModalOpen } = useModal();
//   if (isMobile) {
//     return (
//       <>
//         <input
//           className="peer absolute h-3 w-3 cursor-pointer opacity-0 lg:hidden lg:h-4 lg:w-4"
//           onClick={(e) => {
//             e.stopPropagation();
//             e.nativeEvent.stopImmediatePropagation();
//             if (isMobile) {
//               setModalOpen({
//                 title: "Clear View",
//                 message: "The seller has indicated no obstructions",
//               });
//             }
//           }}
//           type="checkbox"
//         />
//         {InfoIconSVG}
//       </>
//     );
//   } else {
//     return (
//       <Tooltip>
//         <Tooltip.Activator disable={isMobile}>
//           <button>{InfoIconSVG}</button>
//         </Tooltip.Activator>
//         <Tooltip.Content
//           className="mx-3 rounded-md bg-gray-900! p-3 py-2 text-center text-white shadow-sm"
//           side="top"
//         >
//           The seller has indicated no obstructions
//         </Tooltip.Content>
//       </Tooltip>
//     );
//   }
// };

const TicketListItem: React.FC<TicketListItemProps> = ({
  listing,
  event,
  className,
  style,
  quantityFilter,
  isInternational,
}: TicketListItemProps) => {
  const { getColorBySectionId } = useVenueConfigurationContext();
  const sectionColor = getColorBySectionId(listing.sectionId);

  const useAllInPricing =
    listing &&
    listing.displayPrice > 0 &&
    listing.displayPriceWithFees &&
    event?.pricingType === 'ALL_IN_TICKET_PAGE';

  const ticketsQuantity = useMemo(
    () =>
      listing?.validSplitQuantities?.length && listing?.validSplitQuantities?.length > 1
        ? `${Math.min(...listing.validSplitQuantities)}-${Math.max(
            ...listing.validSplitQuantities
          )}`
        : `${listing?.validSplitQuantities?.[0]}`,
    [listing]
  );

  const ticketQuantity = useMemo(() => {
    const singular = Number(quantityFilter || ticketsQuantity) === 1;
    const text = `${quantityFilter || ticketsQuantity} ${singular ? 'Ticket' : 'Tickets'}`;
    return {
      text,
      isMany: !singular,
    };
  }, [ticketsQuantity, quantityFilter]);

  const displayPrice = useAllInPricing
    ? (listing.displayPriceWithFees ?? 0)
    : (listing?.displayPrice ?? 0);

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(displayPrice);

  const showSeatTogether = shouldShowSeatedTogether({
    isMultiple: ticketQuantity.isMany,
    event,
    listing,
  });

  const showClearView = shouldShowClearView({
    listing,
    event,
  });
  return (
    <Link
      className={clsx(
        'got-ticket-list-item relative hover:bg-white hover:shadow-[0_25px_50px_0px_#0113270D]',
        'border-b-light flex w-full! cursor-pointer justify-between border-b border-l-8 px-[15px] py-[7px] lg:px-[15px] lg:py-4 lg:pr-6 lg:pl-8',
        className
      )}
      data-cy="ticketListItem"
      data-testid={`${makeTestid(`${listing.section}-${listing.row}`, 'ticket-list-item')}`}
      id={`${listing.id}`}
      style={{ ...style, borderLeftColor: sectionColor }}
      to={`${getEventTicketsPath(event)}/${listing.id}`}
    >
      <>
        <div className="flex flex-col">
          <span
            className={clsx('inline-block text-sm font-semibold break-words italic lg:text-base')}
            data-testid="ticket-list-item-title"
          >
            {listing.section ? `${listing.section}, ` : ''} Row {listing.row}
          </span>
          <div className={clsx('mt-1 flex flex-col text-[11px] text-stone-700 lg:text-[13px]')}>
            <div className="flex items-center">
              <span className="mr-2 font-medium">{ticketQuantity.text}</span>
              {/* {listing.lowPrice || listing.lastInSection ? (
                <TicketBadge
                  className="relative mr-2 w-fit [&>span]:block!"
                  data-testid="ticket-badge"
                  type={listing.lowPrice ? "LOW_PRICE" : "LAST_IN_SECTION"}
                />
              ) : null} */}
              {/* {listing.flex ? <SeatSecureBadge /> : null} */}
            </div>
            <span className="flex flex-wrap items-center">
              {/* {showClearView ? <InfoIcon /> : null} */}
              {showClearView ? <span>Clear view</span> : null}
              {showClearView && showSeatTogether ? <span className="mr-1">,</span> : null}
              {showSeatTogether ? <span>You will be seated together.</span> : null}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end pl-3">
          <div className={clsx('mb-1 flex items-center justify-end gap-[3px] lg:text-[15px]')}>
            <span
              className={clsx('flex flex-row gap-1 font-semibold! whitespace-nowrap text-black')}
              data-testid="ticket-list-item-price"
            >
              {price}
            </span>
            <span className={clsx('font-normal text-stone-400')}>ea</span>
          </div>
          {isInternational && <div className="mb-1 text-xs text-stone-600">USD</div>}
          <div className="bg-go-blue-500 rounded-md px-3 py-2 text-xs font-semibold text-white lg:px-5 lg:py-3 lg:text-sm">
            Select
          </div>
        </div>
      </>
    </Link>
  );
};

export default TicketListItem;

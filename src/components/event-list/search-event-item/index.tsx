'use client';

import type { components } from '@/contracts/generated/maverick-schema';
import { getEventName, getEventTicketsPath } from '@/utils/eventUtils';
import { formatPercentage } from '@/utils/helpers';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { Pill } from '../Pill/Pill';

dayjs.extend(isBetween);

export interface EventProps {
  dateTbd: boolean;
  eventPerformers: components['schemas']['Performer'][];
  eventTimeLocal: string;
  id: number;
  name: string;
  slug?: string;
  timeTbd: boolean;
  venue: components['schemas']['Venue'];
}

export interface SearchEventItemProps {
  'data-testid'?: string;
  event: components['schemas']['Event'];
  openInNewTab?: boolean;
}

export function SearchEventItem({
  event,
  'data-testid': dataTestid,
  openInNewTab = true,
}: SearchEventItemProps) {
  const { dateTbd, eventTimeLocal, timeTbd, venue } = event;

  const percentInventoryAvailable = event.percentInventoryAvailable ?? 0;

  const dayjsInstance = dayjs(eventTimeLocal);
  const path = getEventTicketsPath(event);

  const location = [venue?.city, venue?.state]
    .filter((place) => place && place != 'NULL')
    .join(', ');

  const isSameYear = dayjsInstance.isSame(dayjs(), 'year');

  const isTicketsScarcityEnabled =
    !event.parking && typeof event.venue?.capacity === 'number' && event.venue.capacity !== 0;

  return (
    <a
      aria-label={`Go to ${event.name} Tickets Page`}
      className="group border-y-light flex cursor-pointer border-y bg-white hover:relative hover:shadow-[0_25px_50px_0px_#0113270D]"
      data-cy="eventItem"
      data-testid={dataTestid}
      href={path}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      target={openInNewTab ? '_blank' : '_self'}
    >
      <section className="group-hover:border-accent flex w-full p-4 lg:border-l-4 lg:border-transparent">
        <div className="flex w-[60px] flex-none flex-col items-center justify-center border-r border-r-slate-300 pr-4 sm:w-[80px] sm:max-w-[80px] sm:min-w-[80px] lg:w-[130px] lg:max-w-[130px] lg:min-w-[130px] lg:items-start lg:py-2 lg:pr-5">
          {!dateTbd ? (
            <p
              className="text-dark block text-[12px] whitespace-nowrap lg:hidden"
              data-cy="eventDayOfWeek"
            >
              {dayjsInstance.format('ddd')}
            </p>
          ) : null}

          <h2
            className={`text-accent text-center text-[14px] leading-[21px] font-bold! tracking-tighter text-wrap uppercase sm:whitespace-nowrap lg:text-[18px] lg:leading-[27px] ${
              isSameYear ? '' : 'tracking-tighter'
            }`}
          >
            <span className="whitespace-nowrap" data-cy="eventDate">
              {dateTbd ? 'TBD' : dayjsInstance.format('MMM DD')}
            </span>
            {!isSameYear && !dateTbd ? (
              <>
                <span>{', '}</span>
                <span data-cy="eventYear">{dayjsInstance.format('YYYY')}</span>
              </>
            ) : null}
          </h2>
          <p className="text-dark block text-[12px] whitespace-nowrap lg:text-[14px]">
            {timeTbd ? (
              <span className="hidden lg:inline" data-cy="eventTimeLocal">
                TBD
              </span>
            ) : (
              <>
                {!dateTbd ? (
                  <>
                    <span className="hidden lg:inline" data-cy="eventDayOfWeek">
                      {dayjsInstance.format('ddd')}
                    </span>
                    <span className="hidden lg:inline">{', '}</span>
                  </>
                ) : null}
                <span className="hidden lg:inline" data-cy="eventTimeLocal">
                  {dayjsInstance.format('h:mm a')}
                </span>
              </>
            )}

            <span className="lg:hidden" data-cy="eventTimeLocal">
              {timeTbd ? 'TBD' : `${dayjsInstance.format('h:mm a')}`}
            </span>
          </p>
        </div>
        <div className="flex grow flex-col justify-center px-4 lg:px-5">
          {isTicketsScarcityEnabled &&
          percentInventoryAvailable > 0 &&
          percentInventoryAvailable < 0.05 ? (
            <Pill
              className="mb-1 self-start"
              disableIcon
              message={`${formatPercentage(percentInventoryAvailable ?? 0)} of Tickets Left`}
              severity="urgent"
              size="sm"
            />
          ) : isTicketsScarcityEnabled &&
            percentInventoryAvailable === 0 &&
            (event.availableTickets ?? 0) > 0 &&
            (event.availableTickets ?? 0) < 50 ? (
            <Pill
              className="mb-1 self-start"
              disableIcon
              message={`${event.availableTickets} ${event.availableTickets === 1 ? 'Ticket' : 'Tickets'} Left`}
              severity="urgent"
              size="sm"
            />
          ) : null}

          <h3
            className="group-hover:text-accent overflow-hidden text-[12px] font-semibold whitespace-normal lg:text-[18px]"
            data-cy="eventName"
          >
            {getEventName(event)}
          </h3>
          <div className="flex flex-none flex-col items-start text-[12px] whitespace-normal lg:text-[14px]">
            <div className="hidden lg:inline">
              <p className="line-clamp-2">
                <span data-cy="venueName">{venue?.name}</span>
                <span className="m-1 text-[9px]">{` • `}</span>
                <span data-cy="venueLocation">{location}</span>
              </p>
            </div>
            <div className="lg:hidden">
              <p className="line-clamp-2" data-cy="venueName">
                {venue?.name}
              </p>
              <p data-cy="venueLocation">{location}</p>
            </div>
          </div>
        </div>
        <div className="mr-4 ml-auto self-center lg:block">
          <span
            className="bg-accent body2 hover:bg-accent-hover active:bg-accent-dark inline-flex flex-row items-center justify-center rounded-md px-[16px]! py-[7px] font-semibold! whitespace-nowrap text-white transition-colors"
            data-cy="viewTicketsButton"
          >
            Tickets
          </span>
        </div>
      </section>
    </a>
  );
}

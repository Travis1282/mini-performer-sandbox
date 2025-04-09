'use client'

// import { ResaleDisclosure } from "@/components/ResaleDisclosure";
// import { Arrow } from "@/components/Shared/Arrow";
// import { generateBreadcrumbLinks } from "@/components/Shared/Breadcrumb/helper";
// import { useHandleBackToTickets } from "@/components/TicketsContainer/utils/useHandleBackToTickets";
// import { useListingDetailsContext } from "@/components/TicketsContainer/utils/useListingDetails";
// import { useDisclosureContext } from "@/contexts/DisclosureProvider";
// import { useIsMobile } from "@/hooks/useIsMobile";
// import { useSearchParams } from "@/hooks/useSearchParams";
// import { basePath } from "../../../services/config";
import EllipsisVerticalIcon from '@heroicons/react/24/outline/EllipsisVerticalIcon'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { Link } from 'react-router'

// import { ContactHeader } from "../ContactHeader";
import type { components } from '../../../services/maverick/generated/maverick-schema'

// import { getEventTicketsPath } from '../../../services/events/get-event-tickets-path'
import { getEventName } from '../../../services/events/get-event-name'
import { resolveImagePath } from '../../../services/images/resolve-image-path'

// const MultiEventPopup = dynamic(
//   () => import("./MultiEventPopup").then((mod) => mod.MultiEventPopup),
//   {
//     ssr: false,
//     loading: () => (
//       <Skeleton className="h-3 w-[10.75rem] rounded-full lg:mb-0 lg:w-24 lg:rounded-md" />
//     ),
//   }
// );
// const PerformerInfoPopup = dynamic(
//   () => import("./PerformerInfoPopup").then((mod) => mod.PerformerInfoPopup),
//   {
//     ssr: false,
//   }
// );

export interface LayoutNavbarTicketsProps {
  event: components['schemas']['Event']
  performer?: components['schemas']['Performer']
}

export function LayoutNavbarTickets({
  event,
  performer,
}: LayoutNavbarTicketsProps) {
  const [, setOpen] = useState(false)
  // const eventUrl = event ? getEventTicketsPath(event) : ''
  // const breadcrumbLinks = generateBreadcrumbLinks(performer, {
  //   title: event?.name ?? "",
  //   url: `${basePath}/${eventUrl}`,
  // });
  // const { isMobile } = useIsMobile()

  const eventDate = dayjs(event.eventTimeLocal)
  // let { showResaleDisclosure } = useDisclosureContext();

  // const isUtah = event?.venue?.state === 'UT'
  // if (isUtah) {
  //   showResaleDisclosure = true;
  // }

  // const [searchParams] = useSearchParams()
  // const quantity = searchParams.get('quantity')
  // const navigate = useNavigate()
  // const location = useLocation()
  // const { listingDetails } = useListingDetailsContext();
  // const onDetailsPage = Boolean(
  //   listingDetails && location.pathname.includes(listingDetails.id.toString())
  // );

  // const backToTickets = useHandleBackToTickets();

  // const handleClickBackToTickets = useCallback(() => {
  //   const path = listingDetails && backToTickets(event);

  //   path ? navigate(path) : navigate(-1);
  // }, [navigate, searchParams, listingDetails, event]);

  const popupButton = (
    <button
      aria-haspopup="dialog"
      aria-label="Performer Info"
      className="ml-2 cursor-pointer lg:block"
      data-testid="performer-info-popup-button"
      onClick={() => {
        setOpen(true)
      }}
    >
      <SVG
        className="hidden size-5 lg:block 2xl:h-[0.875rem] 2xl:w-[0.875rem] [&>g]:opacity-100"
        src={'https://static.gotickets.com/img/interrogation-icon.svg'}
      />
      <EllipsisVerticalIcon className="text-go-blue-500 size-8 lg:hidden" />
    </button>
  )

  // useSaveRecentlyViewed(performer, "performer");

  const isSameYear = eventDate.isSame(dayjs(), 'year')
  // const ticketsLoadingSequence = useFeatureIsOn("tickets-loading-sequence");

  return (
    <>
      {/* {showResaleDisclosure && (
        <ResaleDisclosure
          className={!quantity ? "z-250" : ""}
          usePrimaryDisclosureText={isUtah}
        />
      )} */}
      <nav
        className={clsx(
          // ticketsLoadingSequence ? "z-200" : "z-100",
          'shadow-navbar-tickets relative flex h-[54px] items-center bg-white px-3 pt-1.5 pb-0.5 md:py-1.5 lg:h-[94px] lg:min-h-[94px] lg:items-center lg:px-6'
        )}
        data-cy="tickets-navbar"
        id="tickets-navbar"
      >
        {/* <div
          className={clsx(
            "relative flex h-[40px] shrink-0 items-center justify-center self-center border-slate-300 pl-0 transition-all delay-300 duration-300 lg:hidden",
            onDetailsPage
              ? "left-0 mr-[8px] w-10 gap-1"
              : "-left-40 mr-0 w-0 gap-0"
          )}
        > */}
        {/* <button
            className="h-full w-[25px]"
            data-testid="back-to-tickets-btn"
            onClick={() => handleClickBackToTickets()}
          >
            <Arrow
              className="color-accent"
              height={18}
              key="leftArrowCategories"
              side="left"
              strokeWidth={1.5}
              width={22}
            />
          </button> */}

        {/* <div className="flex h-full w-[2px] items-center justify-center rounded-sm bg-light" /> */}
        {/* </div> */}

        <div className="flex grow flex-col items-start justify-center overflow-hidden lg:mr-4">
          <div className="flex w-full max-w-[100%] flex-row overflow-hidden sm:items-center sm:justify-between lg:w-auto">
            <h3
              className="lg:h3-lg text-go-blue-500 overflow-hidden text-sm leading-5 font-bold text-ellipsis whitespace-nowrap lg:py-0 lg:text-[20px]!"
              data-testid="eventName"
              id="eventName"
            >
              <Link to={`/${performer?.slug}`}>{getEventName(event)}</Link>
            </h3>
            <div className="hidden self-center lg:block">{popupButton}</div>
          </div>
          <div className="flex w-full flex-row items-center gap-2 md:mt-1 lg:mt-0 lg:gap-3">
            <div className="h6-sm lg:h6-lg hidden cursor-pointer gap-1 rounded-full px-2 font-semibold lg:flex lg:cursor-default lg:flex-row lg:gap-2 lg:px-0">
              <img
                alt="date icon"
                className="hidden lg:block"
                height={14}
                src={resolveImagePath('/img/date-icon.svg')}
                width={14}
              />
              <div className="hidden flex-row gap-1 lg:flex lg:gap-2">
                {!event.dateTbd ? (
                  <span data-testid="eventDate" id="eventDate">
                    {eventDate.format(
                      `${isSameYear ? 'ddd, MMM DD' : 'ddd, MMM DD, YYYY'}`
                    )}
                  </span>
                ) : (
                  <span data-testid="eventDateTBD" id="eventDateTBD">
                    TBD
                  </span>
                )}
                <span className="bg-dark h-[2px] w-[2px] shrink-0 self-center rounded-[21px] opacity-40"></span>
                {!event.timeTbd ? (
                  <span data-testid="eventTime" id="eventTime">
                    {eventDate.format('h:mma')}
                  </span>
                ) : (
                  <span data-testid="eventTimeTBD" id="eventTimeTBD">
                    TBD
                  </span>
                )}
              </div>
            </div>
            {/* <MultiEventPopup
              className={"mt-0.5 p-0.5 text-xs"}
              event={event}
              performer={performer}
            /> */}

            <div className="flex flex-1 gap-3 overflow-hidden lg:flex-row">
              <img
                alt="locale icon"
                className="hidden lg:block"
                height={14}
                src={resolveImagePath('/img/locale-icon.svg')}
                width={14}
              />
              <span className="h6-sm lg:h6-lg block gap-2 overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap opacity-70 lg:flex lg:opacity-1">
                <a
                  className="hidden lg:block"
                  data-testid="eventVenueName"
                  href={`/venues/${event?.venue?.slug}`}
                  id="eventVenueName"
                >
                  {`${event?.venue?.name}`}
                </a>
                <span className="bg-dark hidden h-[2px] w-[2px] shrink-0 self-center rounded-[21px] opacity-40 lg:block"></span>
                <span
                  data-testid="eventVenueCityState"
                  id="eventVenueCityState"
                >
                  {event?.venue?.city}
                  {event?.venue?.state ? `, ${event?.venue?.state}` : ''}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="self-center pl-1 lg:hidden">{popupButton}</div>

        {/* {!isMobile ? <ContactHeader /> : null} */}

        <div className="relative ml-8 hidden lg:flex">
          <Link
            aria-label="Go to Home Page"
            className="w-[177px]"
            id="logoNavBar"
            to="/"
          >
            <img
              alt="gotickets logo"
              className="flex h-[13px]! w-[130px]! lg:h-[18px]! lg:w-[177px]!"
              height={18}
              src={resolveImagePath('/img/gotickets-dark.svg')}
              style={{
                width: 177,
                height: 18,
              }}
              width={177}
            />
          </Link>
        </div>
        {/* <PerformerInfoPopup
          breadcrumbLinks={breadcrumbLinks}
          event={event}
          onOpen={setOpen}
          open={open}
          performer={performer}
        /> */}
      </nav>
    </>
  )
}

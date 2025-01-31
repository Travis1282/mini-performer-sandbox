'use client'

import type { Region } from '@/contracts/entities/region'
import type { components } from '@/contracts/generated/maverick-schema'
import type { SwiperProps } from 'swiper/react'
import { Arrow } from '@/components/Shared/Arrow'
import { Button } from '@/components/Shared/Button'
import { SelectRegion } from '@/components/Shared/SelectRegion'
import { useIsClientMounted } from '@/hooks/useIsClientMounted'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getEventName, getEventTicketsPath } from '@/utils/eventUtils'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Image from 'next/image'
import 'react-loading-skeleton/dist/skeleton.css'
import 'swiper/css'
import 'swiper/css/bundle'
import { useState } from 'react'
import { A11y, Controller, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export function TrendingEvents({
  regions,
  trendings,
  trendingRegion,
  setTrendingRegion,
  isFetchingTrendings,
  hideGradient = false,
  className = '',
  title = 'Top Events in',
  slots,
}: {
  regions?: Region[]
  trendings?: components['schemas']['Event'][]
  trendingRegion?: Region
  setTrendingRegion: (region: Region | undefined) => void
  isFetchingTrendings: boolean
  hideGradient?: boolean
  className?: string
  title?: string
  slots?: {
    title?: {
      className?: string
    }
    previousButton?: {
      className?: string
    }
    nextButton?: {
      className?: string
    }
  }
}) {
  const { isMobile } = useIsMobile()
  const { isClientMounted } = useIsClientMounted()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ctrl, setCtrl] = useState<any | typeof Swiper>(undefined)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const settings: SwiperProps = {
    modules: [Navigation, Pagination, A11y, Controller],
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    slidesPerGroupAuto: true,
    controller: ctrl,
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
      },
      1024: {
        slidesPerGroup: 3,
        slidesPerView: 'auto',
      },
    },
    autoHeight: false,
  }

  return (
    <div
      className={clsx(
        !hideGradient
          ? 'from-dark via-dark bg-gradient-to-b from-0% to-[#fafafb]'
          : 'bg-transparent',
        !hideGradient
          ? trendings?.length
            ? 'via-[42%] to-[42%] lg:via-[60%] lg:to-[60%]'
            : 'via-[81%] to-[81%] md:via-[85%] md:to-[85%] lg:via-[77%] lg:to-[77%]'
          : '',
        className
      )}
      data-cy="top-events-by-region"
    >
      <div className="container overflow-visible lg:px-4 xl:px-0">
        <div className="flex flex-col sm:gap-6">
          <div className="relative flex flex-col place-content-center justify-center align-middle">
            <div className="container relative flex flex-row items-center gap-1 px-4 pb-8 lg:z-10 lg:px-0 xl:px-0">
              <div className="flex flex-col sm:flex-row">
                <h1
                  className={clsx(
                    '!h2-sm lg:!h2-lg mb-1 !font-bold text-white sm:self-end lg:mb-2',
                    slots?.title?.className
                  )}
                >
                  {title}
                </h1>
                {regions ? (
                  <SelectRegion
                    dropdownPosition="left-1/2 -translate-x-1/2"
                    regions={regions}
                    selected={trendingRegion}
                    setSelected={setTrendingRegion}
                  >
                    <Button
                      arrow="down"
                      arrowClassName="mb-1"
                      arrowColor="#3899F8"
                      arrowSize={isMobile ? 12 : 16}
                      arrowStrokeWidth={2}
                      className={clsx(
                        '!p-0 !text-[20px] !font-semibold leading-[22px] sm:ml-2 lg:!text-[28px] lg:leading-[31px]'
                      )}
                      contentClass="!items-end"
                      label=""
                      prefix={trendingRegion?.name ?? 'All Regions'}
                      variant="tertiary"
                    />
                  </SelectRegion>
                ) : null}
              </div>
              {ctrl && trendings?.length ? (
                <div
                  className="ml-auto hidden gap-[21px] lg:flex"
                  id="slide-button"
                >
                  <button
                    aria-label="Previous categories"
                    className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-300 disabled:opacity-25"
                    data-cy="previousSlide"
                    disabled={isBeginning}
                    onClick={() => ctrl?.slidePrev(400)}
                    title="Previous categories"
                    type="button"
                  >
                    <Arrow
                      className={clsx(
                        'not:disabled:group-hover:text-accent text-white transition-colors duration-300',
                        slots?.previousButton?.className
                      )}
                      color="#011327"
                      currentColor
                      height={24}
                      key="leftArrowCategories"
                      side="left"
                      strokeWidth={1}
                      width={24}
                    />
                  </button>
                  <button
                    aria-label="Next categories"
                    className="group flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-300 disabled:opacity-25"
                    data-cy="nextSlide"
                    disabled={isEnd}
                    onClick={() => ctrl?.slideNext(400)}
                    title="Next categories"
                    type="button"
                  >
                    <Arrow
                      className={clsx(
                        'not:disabled:group-hover:text-accent text-white transition-colors duration-300',
                        slots?.nextButton?.className
                      )}
                      color="#011327"
                      currentColor
                      height={24}
                      key="leftArrowCategories"
                      side="right"
                      strokeWidth={1}
                      width={24}
                    />
                  </button>
                </div>
              ) : null}
            </div>

            {isFetchingTrendings || !isClientMounted ? (
              <div className="flex w-full items-center justify-between lg:pb-[10px]">
                <div className="col-span-1 mr-2 h-full w-[calc(100%-0.75rem)] rounded last:mr-6 last:w-[calc(100%-0.5rem)] md:mr-6 md:w-[calc(100%-1rem)] last:md:mr-0 last:md:w-[calc(100%-1rem)] lg:h-[calc(100%-20px)]">
                  <div className="h-[174px] animate-pulse rounded bg-gradient-to-t from-gray-300 to-neutral-500 opacity-70 md:h-[152px] lg:h-[201px]"></div>
                  <div className="bg-dark mt-3 h-[21px] w-3/4 animate-pulse rounded opacity-70"></div>
                  <div className="bg-dark mt-[1px] h-[16px] w-2/4 animate-pulse rounded opacity-50"></div>
                </div>
                <div className="col-span-1 mr-2 h-full w-[calc(100%-0.75rem)] rounded last:mr-6 last:w-[calc(100%-0.5rem)] md:mr-6 md:w-[calc(100%-1rem)] last:md:mr-0 last:md:w-[calc(100%-1rem)] lg:h-[calc(100%-20px)]">
                  <div className="h-[174px] animate-pulse rounded bg-gradient-to-t from-gray-300 to-neutral-500 opacity-70 md:h-[152px] lg:h-[201px]"></div>
                  <div className="bg-dark mt-3 h-[21px] w-3/4 animate-pulse rounded opacity-70"></div>
                  <div className="bg-dark mt-[1px] h-[16px] w-2/4 animate-pulse rounded opacity-50"></div>
                </div>
                <div className="col-span-1 mr-2 hidden h-full w-[calc(100%-0.75rem)] rounded last:mr-6 last:w-[calc(100%-0.5rem)] md:mr-6 md:block md:w-[calc(100%-1rem)] last:md:mr-0 last:md:w-[calc(100%-1rem)] lg:h-[calc(100%-20px)]">
                  <div className="h-[174px] animate-pulse rounded bg-gradient-to-t from-gray-300 to-neutral-500 opacity-70 md:h-[152px] lg:h-[201px]"></div>
                  <div className="bg-dark mt-3 h-[21px] w-3/4 animate-pulse rounded opacity-70"></div>
                  <div className="bg-dark mt-[1px] h-[16px] w-2/4 animate-pulse rounded opacity-50"></div>
                </div>
              </div>
            ) : !trendings?.length ? (
              <Swiper
                controller={{ control: ctrl }}
                draggable={false}
                {...settings}
                className="!relative !grid !w-full !grid-cols-2 md:!grid-cols-3"
              >
                <span className="h6-lg md:h4-lg absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform whitespace-nowrap text-center font-semibold text-white opacity-50 md:font-medium">
                  No Trending Events in Your Location
                </span>
                {Array.from({ length: 3 }).map((_, index) => (
                  <SwiperSlide
                    className="!col-span-1 !flex !w-[calc(100%-0.75rem)] !flex-col !bg-white !bg-opacity-[.02] last:!w-[calc(100%-0.5rem)] md:!w-[calc(100%-1rem)] last:md:!w-[calc(100%-1rem)] lg:!h-[calc(100%-20px)] first:lg:!mr-0 last:lg:!mr-0"
                    key={index}
                  >
                    <div className="group relative aspect-video w-full overflow-hidden rounded"></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Swiper
                controller={{ control: ctrl }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                onSlidesUpdated={(swiper) => {
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                onSwiper={(swiper) => {
                  setCtrl(swiper)
                }}
                {...settings}
                className="!grid !w-full !grid-cols-2 !px-4 md:!grid-cols-3 lg:!px-0"
              >
                {trendings?.map((event) => {
                  const isDateTbd = event.dateTbd
                  const isTimeTbd = event.timeTbd
                  const isSameYearAsEvent = dayjs(new Date()).isSame(
                    event.eventTimeLocal,
                    'year'
                  )
                  let dateTimeFormat: string | undefined =
                    'ddd, MMM DD, YYYY, h:mma'
                  if (isDateTbd && isTimeTbd) {
                    dateTimeFormat = undefined
                  } else if (isDateTbd && !isTimeTbd) {
                    dateTimeFormat = 'h:mma'
                  } else if (!isDateTbd && isTimeTbd && isSameYearAsEvent) {
                    dateTimeFormat = 'ddd, MMM DD'
                  } else if (!isDateTbd && isTimeTbd && !isSameYearAsEvent) {
                    dateTimeFormat = 'ddd, MMM DD, YYYY'
                  }

                  const dateTime = dateTimeFormat
                    ? dayjs(event.eventTimeLocal).format(dateTimeFormat)
                    : 'TBD'

                  let dateTimeDisplay = dateTime
                  if (isDateTbd && isTimeTbd) {
                    dateTimeDisplay = dateTime
                  } else if (isDateTbd && !isTimeTbd) {
                    dateTimeDisplay = `TBD, ${dateTime}`
                  } else if (!isDateTbd && isTimeTbd) {
                    dateTimeDisplay = `${dateTime}, TBD`
                  } else if (!isDateTbd && !isTimeTbd) {
                    dateTimeDisplay = dateTime
                  }

                  const date = isDateTbd
                    ? 'TBD'
                    : dayjs(event.eventTimeLocal).format('MMM DD').toUpperCase()

                  return (
                    <SwiperSlide
                      className="!col-span-1 !mr-3 !flex !w-[calc(100%-0.75rem)] !flex-col last:!mr-0 last:!w-[calc(100%-0.5rem)] md:!mr-6 md:!w-[calc(100%-1rem)] last:md:!w-[calc(100%-1rem)] lg:!h-[calc(100%-20px)]"
                      key={event.id}
                    >
                      <a
                        aria-label={`View Tickets from ${event.name}`}
                        className="group relative aspect-video w-full overflow-hidden rounded"
                        data-cy="trendingEvent"
                        href={getEventTicketsPath(event)}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          alt={`${event.name} event on top events in ${trendingRegion?.name}`}
                          className="block scale-125 cursor-pointer rounded object-cover transition-all duration-300 group-hover:scale-[1.35]"
                          fill
                          loading="eager"
                          src={resolveImagePath(
                            event.eventPerformers?.[0].performer
                              ?.heroImagePath ||
                              event.eventPerformers?.[0].performer
                                ?.primaryCategory?.performerHeroImagePath,
                            { height: isMobile ? 140 : 200 }
                          )}
                          unoptimized
                        />
                        <div
                          className={clsx(
                            '!h6-sm md:!h5-lg absolute m-1 flex flex-col items-center justify-center gap-1 !font-medium text-white md:!font-bold lg:m-2.5',
                            'bg-dark rounded px-[3px] pt-[1.5px] leading-[140%] sm:px-2 sm:py-[3px] lg:rounded-sm'
                          )}
                        >
                          {date}
                        </div>
                        <Button
                          aria-label={`View Tickets from ${event.name}`}
                          className={clsx(
                            'absolute bottom-0 right-0 hidden rounded-br !px-6 !font-bold lg:block'
                          )}
                          label="View Tickets"
                          role="presentation"
                          title="View Tickets"
                        />
                      </a>
                      <div>
                        <a
                          aria-label={`Go to ${event.name} Tickets Page`}
                          href={getEventTicketsPath(event)}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <h3 className="text-dark overflow-hidden text-ellipsis whitespace-nowrap pt-3 text-sm font-semibold leading-[1.1] md:text-lg md:leading-[1.2]">
                            {getEventName(event)}
                          </h3>
                        </a>
                        <div className="text-dark flex flex-row gap-3 text-xs font-semibold leading-[1.1] text-opacity-60 md:text-sm">
                          <h4 className="relative inline-block w-full items-center overflow-hidden">
                            <span className="inline-block lg:hidden">
                              <span className="inline-block">
                                {dateTimeDisplay}
                              </span>
                              <br />
                              {event.venue?.city || ''},{' '}
                              {event.venue?.state || ''}
                            </span>
                            <span className="hidden lg:inline-block">
                              {event.venue?.city || ''},{' '}
                              {event.venue?.state || ''}{' '}
                              <span className="bg-dark relative bottom-[2px] mx-[6px] inline-block h-[2px] w-[2px] flex-shrink-0 self-center rounded-[21px] opacity-40 md:mx-[12px]"></span>
                              {dateTimeDisplay}
                            </span>
                          </h4>
                        </div>
                        <Button
                          aria-label={`View Tickets from ${event.name}`}
                          arrow="right"
                          arrowColor="#3899F8"
                          arrowSize={14}
                          className={clsx(
                            'mt-2 block pl-0 pt-0 lg:hidden [&>*]:!leading-[24px]'
                          )}
                          href={getEventTicketsPath(event)}
                          label="View Tickets"
                          prefetch={false}
                          rel="noopener noreferrer"
                          target="_blank"
                          title="View Tickets"
                          variant="tertiary"
                        />
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

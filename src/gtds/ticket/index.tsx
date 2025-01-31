import type { components } from '@/contracts/generated/maverick-schema'
import { seatSecureText } from '@/components/TicketsContainer/TicketListItem/SeatSecure'
import { DeliveryMethodIcon } from '@/contracts/entities/ticket'
import { useIsMobile } from '@/hooks/useIsMobile'
import { getEventName } from '@/utils/eventUtils'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'
import Icon from '../Icons'
import { Modal } from '../Modal'
import ReadMore from '../ReadMore'
import ToolTip from '../Tooltip'

export interface TicketProps {
  deliveryMethod?: components['schemas']['DeliveryMethod']
  event?: components['schemas']['Event']
  isDeliveryMethodMobileVisible?: boolean
  orderItem?: components['schemas']['OrderItem']
}

export function Ticket({
  event,
  orderItem,
  deliveryMethod,
  isDeliveryMethodMobileVisible = true,
}: TicketProps) {
  const { isMobile } = useIsMobile()
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [isInfoModal, setIsInfoModal] = React.useState(false)
  const dayjsInstanceEventDate = dayjs(event?.eventTimeLocal)
  const eventDate = dayjsInstanceEventDate.format('ddd, MMM DD, YYYY')
  const eventHour = dayjsInstanceEventDate.format('h:mmA')
  const quantity = orderItem?.quantity
  const flex = orderItem?.flex
  const notes = orderItem?.notes

  return (
    <div className="px-4 lg:px-0">
      <div className="flex w-full items-center rounded-t-lg bg-accent px-4 py-3 text-[14px] font-semibold text-white md:px-6 lg:px-8 lg:py-4">
        <Image
          alt="exclamation icon"
          className="mr-2"
          height={14}
          src={resolveImagePath('/img/exclamation-icon.svg')}
          unoptimized
          width={14}
        />{' '}
        This is not a ticket
      </div>
      <div className="rounded-b-lg border border-gray-300 bg-white pb-6 pt-4 text-dark md:rounded-t-lg md:py-8 lg:mx-0 lg:rounded-t-none">
        <div className="flex flex-col gap-3 px-6 lg:px-8">
          <div className="hidden md:block lg:hidden">
            <span
              className="opacity-60 text-large"
              data-testid="eventDateTimeQuantity"
              id="eventDateTimeQuantity"
            >
              {`${!event?.dateTbd ? eventDate : 'TBD'} ᛫ ${
                !event?.timeTbd ? eventHour : 'TBD'
              } ᛫ ${quantity} ticket${Number(quantity) > 1 ? 's' : ''}`}
            </span>
          </div>
          <h3
            className="h3-sm md:h3-lg"
            data-cy="eventName"
            data-testid="eventName"
            id="eventName"
          >
            {getEventName(event)}
          </h3>
          <div className="flex flex-col-reverse gap-0 md:flex-col md:gap-1">
            <span
              className="opacity-60 h6-sm md:text-large"
              data-testid="eventVenueNameCityState"
              id="eventVenueNameCityState"
            >
              {`${event?.venue?.name}, ${event?.venue?.city}, ${event?.venue?.state}`}
            </span>
            <span
              className="opacity-60 h6-sm md:hidden md:text-large lg:block"
              data-testid="eventDateTime"
              id="eventDateTime"
            >
              {`${!event?.dateTbd ? eventDate : 'TBD'} ᛫ ${
                !event?.timeTbd ? eventHour : 'TBD'
              }`}
            </span>
          </div>
          {isDeliveryMethodMobileVisible && (
            <div
              className="flex flex-row gap-2 md:hidden"
              data-testid="eventDeliveryMethod"
              id="eventDeliveryMethod"
            >
              <Icon
                className="md:hidden lg:block"
                height={20}
                name={DeliveryMethodIcon[deliveryMethod?.enumName || '']}
                width={20}
              />
              <span className="self-center !font-semibold h6-lg">
                {deliveryMethod?.retailDisplayName}
              </span>
              <ToolTip open={isInfoTooltipOpen}>
                <ToolTip.Activator>
                  <div
                    className="cursor-pointer self-center"
                    onClick={() =>
                      isMobile && setIsInfoModal(!isInfoTooltipOpen)
                    }
                    onMouseEnter={() => !isMobile && setIsInfoTooltipOpen(true)}
                    onMouseLeave={() =>
                      !isMobile && setIsInfoTooltipOpen(false)
                    }
                  >
                    <Image
                      alt="ticket info icon"
                      className="py-px invert"
                      height={14}
                      objectPosition="center"
                      src={resolveImagePath('/img/info-icon.svg')}
                      unoptimized
                      width={14}
                    />
                  </div>
                </ToolTip.Activator>
                <ToolTip.Content>
                  <p className="max-w-[328px] bg-dark p-3 text-start text-white opacity-80 text-large">
                    {deliveryMethod?.description}
                  </p>
                </ToolTip.Content>
              </ToolTip>

              <Modal
                keepMounted
                open={isInfoModal}
                setOpen={setIsInfoModal}
                title={deliveryMethod?.retailDisplayName || ''}
              >
                <p className="px-4 text-dark text-large">
                  {deliveryMethod?.description}
                </p>
              </Modal>
            </div>
          )}
        </div>
        <div className="flex flex-row py-4">
          {/* <div className="clip half-circle h-[30px] w-[15px] bg-[#FAFAFB]"></div> */}
          <div className="w-full self-center border-b border-dashed border-[#D9D9DA]" />
          {/* <div className="clip half-circle h-[30px] w-[15px] -scale-x-100 bg-[#FAFAFB]"></div> */}
        </div>
        <div className="flex flex-row flex-wrap justify-between gap-x-6 gap-y-3 px-6 lg:gap-y-6 lg:px-8">
          <div className="flex flex-col gap-1.5">
            <span className="opacity-60 h6-sm md:text-large">Section</span>
            <span
              className="!font-semibold display-xs md:!font-bold md:display-sm"
              data-testid="ticketSection"
              id="ticketSection"
            >
              {orderItem?.section}
            </span>
          </div>
          <div className="flex flex-row flex-nowrap gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="opacity-60 h6-sm md:text-large">Row</span>
              <span
                className="!font-semibold display-xs md:!font-bold md:display-sm"
                data-testid="ticketRow"
                id="ticketRow"
              >
                {orderItem?.row}
              </span>
            </div>

            <div className="ml-auto flex flex-col gap-1.5 text-center md:self-center">
              <span className={clsx('opacity-60 h6-sm md:text-large lg:block')}>
                Quantity
              </span>
              <span
                className={clsx(
                  '!font-semibold display-xs md:!font-bold md:display-sm lg:block'
                )}
                data-testid="ticketQuantity"
                id="ticketQuantity"
              >
                {quantity}
              </span>
            </div>
          </div>
        </div>
        {(flex || notes) && (
          <div className="mt-6 block px-8">
            <span className="flex flex-col gap-2 opacity-60 h6-sm md:text-large">
              Notes
            </span>
            <div className="h6-sm md:text-large">
              <ReadMore
                id="noteDiv"
                text={`${notes ? `${notes}. ` : ''}${
                  flex ? seatSecureText : ''
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { render } from '@testing-library/react'
import type { ImageProps } from 'next/legacy/image'
import ImageLegacy from 'next/legacy/image'
import { Ticket } from './index'
import type { components } from '@/contracts/generated/maverick-schema'
import { getEventName } from '@/utils/eventUtils'

const orderMock = {
  id: 4392,
  createdAt: '2024-02-25T02:13:52',
  status: {
    id: 25,
    name: 'TRANSFER_URL_COMPLETED',
    headline: 'Tickets Delivered',
    description:
      'The seller has transferred the tickets to you. You can have the tickets sent to your email by clicking the button below. We recommend you access this email from your mobile phone and adding the tickets to your mobile wallet right away as wifi at the venue can be unreliable.',
    actionParty: 'NONE',
  },
  emailAddress: 'zjackson@example.com',
  phoneNumber: '504-429-1853',
  deliveryMethod: 'Mobile Transfer',
  deliveryMethodDetails: {
    enumName: 'MOBILE',
    displayName: 'Mobile Transfer',
    retailDisplayName: 'Mobile Transfer',
    description:
      'Your tickets will be transferred to you electronically. Please note you need either an iOS or android mobile device to enter the event.',
  },
  serviceFee: 47.38,
  taxAmount: 0,
  deliveryFee: 5.95,
  insuranceFee: 0,
  hasInsurance: false,
  otherFee: 0,
  orderTotal: 173.33,
  inHandDate: '2024-06-09',
  delivered: true,
  deliveryTime: '2024-03-14T18:34:57',
  processed: true,
  cancelled: false,
  billingAddress: {
    phoneNumber: '001-634-981-1320x9762',
    firstName: 'Andrea',
    lastName: 'Bennett',
    company: 'Henderson Ltd',
    postalCode: '92064',
    address1: 'PSC 4815, Box 9414 APO AA 32645',
    address2: '',
    city: 'Poway',
    state: 'CA',
    country: 'US',
    save: false,
  },
  items: [
    {
      event: {
        id: 253538,
        name: 'Vampire Weekend',
        venueId: 390,
        eventTimeLocal: '2024-06-10T19:00:00',
        timeTbd: false,
        dateTbd: false,
        parking: false,
        ifNecessary: false,
        multiDate: false,
        eventPerformers: [
          {
            id: 300956,
            performerId: 9884,
            master: true,
            performer: {
              id: 9884,
              name: 'Vampire Weekend',
              primaryCategoryId: 137,
              parking: false,
              parkingPerformerId: 49268,
              slug: 'vampire-weekend',
              primaryCategory: { id: 137, name: 'Rock' },
            },
          },
        ],
        venue: {
          id: 390,
          name: 'Cal Coast Credit Union Open Air Theatre at SDSU',
          addr1: '5500 Campanile Drive',
          addr2: '',
          city: 'San Diego',
          state: 'CA',
          postalCode: '92182',
          country: 'US',
          timeZone: 'America/Los_Angeles',
          parentVenue: false,
          parking: false,
          regionId: 13,
          singleLineAddress: '5500 Campanile Drive San Diego, CA 92182',
        },
      },
      section: 'Promenade A',
      row: 'S',
      lowSeat: '21',
      highSeat: '22',
      notes: 'XFER',
      quantity: 2,
      unitBilled: 60,
      flex: false,
      instant: false,
      stockType: 'MOBILE_TICKETS',
      fulfilled: true,
      fulfillmentMethod: 'SUBMIT_TRANSFER_URL',
      transferSource: 'TICKETMASTER',
      listingId: 293326798,
    },
  ],
  paymentMethod: 'credit_card',
  creditCardLastFour: '1123',
  creditCardType: 'Visa',
  showReviewPopup: false,
} as components['schemas']['Order']

const [orderItem] = orderMock?.items || []

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    return <ImageLegacy {...props} />
  },
}))

describe('Seo', () => {
  it('renders Seo conponent', () => {
    const { getByText } = render(
      <Ticket
        deliveryMethod={orderMock.deliveryMethodDetails}
        event={orderItem.event}
        orderItem={orderItem}
      />
    )
    expect(getByText('This is not a ticket')).toBeInTheDocument()

    expect(getByText(`${getEventName(orderItem.event)}`)).toBeInTheDocument()
    expect(
      getByText(
        `${orderItem?.event?.venue?.name}, ${orderItem?.event?.venue?.city}, ${orderItem?.event?.venue?.state}`
      )
    ).toBeInTheDocument()

    expect(getByText('Section')).toBeInTheDocument()
    expect(getByText(`${orderItem?.section}`)).toBeInTheDocument()

    expect(getByText('Row')).toBeInTheDocument()
    expect(getByText(`${orderItem?.row}`)).toBeInTheDocument()

    expect(getByText('Quantity')).toBeInTheDocument()
    expect(getByText(`${orderItem?.quantity}`)).toBeInTheDocument()

    expect(getByText('Notes')).toBeInTheDocument()
  })
})

import type { IconComponentProps } from '@/components/icons';
import type { components } from '@/contracts/generated/maverick-schema';

export const TicketInfo: Record<string, components['schemas']['DeliveryMethod']> = {
  inhand_ticket: {
    id: 999,
    displayName: 'In-Hand Date',
    retailDisplayName: 'In-Hand Date',
    description: 'Tickets will be delivered by ',
    enumName: 'inhand_ticket',
  },
  inhand_ticket_delivery: {
    id: 998,
    displayName: 'In-Hand Date',
    retailDisplayName: 'In-Hand Date',
    description: 'Tickets will be ready to ship by ',
    enumName: 'inhand_ticket_delivery',
  },
  power_seller: {
    id: 997,
    displayName: 'Power Seller',
    retailDisplayName: 'Power Seller',
    description:
      'Customers can confidently trust our verified ticket seller, endorsed by GoTickets, ensuring reliable and secure ticket purchasing experiences.',
    enumName: 'power_seller',
  },
  instant_delivery: {
    id: 996,
    displayName: 'Instant Delivery',
    retailDisplayName: 'Instant Delivery',
    description:
      'Purchased tickets are delivered instantly via email or SMS upon completing the transaction.',
    enumName: 'instant_delivery',
  },
} as const;

export const DeliveryMethodIcon: Record<string, IconComponentProps['name']> = {
  MOBILE: 'MobileTicket',
  UPS_2_DAY: 'TruckShipping',
  PRINT_AT_HOME: 'Printer',
  CUSTOM_DELIVERY: 'HandTicket',
  UPS_OVERNIGHT: 'TruckShipping',
  UPS_INTERNATIONAL: 'TruckShipping',
  UPS_SATURDAY_DELIVERY: 'TruckShipping',
  AXS_TRANSFER: 'MobileTicket',

  inhand_ticket: 'CalendarPin',
  inhand_ticket_delivery: 'CalendarPin',
  power_seller: 'ShieldCheck',
  instant_delivery: 'Instant',
};

export const SHIPPING_METHODS = [
  'UPS_2_DAY',
  'UPS_OVERNIGHT',
  'UPS_INTERNATIONAL',
  'UPS_SATURDAY_DELIVERY',
  'CUSTOM_DELIVERY',
];

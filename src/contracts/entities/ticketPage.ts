export enum deliveryMethods {
  MOBILE_TICKETS = 'Mobile Tickets',
  UPS_2_DAY = 'Shipping',
  PRINT_AT_HOME = 'Print at Home',
  CUSTOM_DELIVERY = 'Custom Delivery',
  HARD = 'Truck Shipping',
}

export enum deliveryMethodIcons {
  MOBILE_TICKETS = 'MobileTicket',
  UPS_2_DAY = 'TruckShipping',
  PRINT_AT_HOME = 'Printer',
  CUSTOM_DELIVERY = 'HandTicket',
}

export type DeliveryMethod = keyof typeof deliveryMethods;

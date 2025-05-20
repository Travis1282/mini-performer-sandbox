import type { svgIcon } from '@/components/icons/SVGComponents';
import type { components } from '@/contracts/generated/maverick-schema';

export type PaymentMethodType = 'applePay' | 'creditCard' | 'googlePay' | 'payPal';

export interface IPaymentMethodsSupported {
  addendum?: string;
  icon: keyof typeof svgIcon;
  name: string;
  title: string;
  type: PaymentMethodType;
}

export const PAYMENT_METHODS: IPaymentMethodsSupported[] = [
  {
    type: 'creditCard',
    icon: 'CreditCard',
    name: 'Credit Card',
    title: 'Credit Card Details',
  },
  {
    type: 'applePay',
    icon: 'ApplePay',
    name: 'Apple Pay',
    title: 'Pay with Apple Pay',
  },
  {
    type: 'payPal',
    icon: 'PayPal',
    name: 'PayPal',
    title: 'Pay with PayPal',
  },
  {
    type: 'googlePay',
    icon: 'Google',
    name: 'Google Pay',
    title: 'Pay with Google Pay',
  },
];

export const CREDIT_CARD_FLAG_IMAGES = {
  'american-express': 'AmexLogo',
  visa: 'VisaLogo',
  discover: 'DiscoverLogo',
  mastercard: 'MasterCardLogo',
} as const;

export type PAYMENT_METHODS_TYPES = (typeof PAYMENT_METHODS)[number]['type'];

export type CARD_FLAGS = 'american-express' | 'discover' | 'mastercard' | 'visa';

// TODO: deliveryMethodName was tangled with the shippingAddress
// In order not to change any business logic, I will keep the same structure
// for the moment. As we're moving away from this checkout, I won't bother
// to untangle this.
export type PlaceOrderRequest = components['schemas']['PlaceOrderRequest'] & {
  paymentMethod?: PaymentMethodType;
  shippingAddress?: components['schemas']['Address'] & {
    deliveryMethodName?: string;
  };
  paymentNonceExpiresAt?: string;
};

export const checkoutFactory = (
  cart: components['schemas']['Cart'],
  address?: Omit<components['schemas']['Address'], 'firstName' | 'lastName'>
): PlaceOrderRequest => {
  return {
    shippingAddress: {
      phoneNumber: cart?.phoneNumber || '',
      firstName: cart?.firstName || '',
      lastName: cart?.lastName || '',
      company: '',
      postalCode: address?.postalCode || '',
      address1: address?.address1 || '',
      address2: address?.address2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || 'US',
      save: address?.save || false,
    },
    billingAddress: {
      phoneNumber: '',
      firstName: '',
      lastName: '',
      company: '',
      postalCode: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      country: 'US',
      save: false,
    },
    shippingIsBilling: false,
    customer: {
      phoneNumber: cart?.phoneNumber || '',
      firstName: cart?.firstName || '',
      lastName: cart?.lastName || '',
      emailAddress: cart?.emailAddress || '',
      company: '',
      postalCode: address?.postalCode || '',
      emailMarketingConsent: cart?.emailOptIn || false,
      smsMarketingConsent: cart?.smsOptIn || false,
      emailVerified: false,
      phoneVerified: false,
    },
    emailAddress: cart?.emailAddress || '',
    phoneNumber: cart?.phoneNumber || '',
    cartUuid: cart?.uuid || '',
    hasInsurance: false,
    insuranceFee: 0,
    orderTotal: cart?.cartTotal || 0,
    unitBilled: cart?.pricePerTicket || 0,
    deliveryFee: cart?.deliveryFee || 0,
    taxAmount: cart?.taxAmount || 0,
    serviceFee: cart?.serviceFee || 0,
    deliveryMethodId: cart?.deliveryMethod?.id || 0,
    confirmedMultipleEventOrders: false,
  };
};

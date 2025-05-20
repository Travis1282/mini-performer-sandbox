import type { components } from '@/contracts/generated/maverick-schema';
import type { GTMAddPaymentInfoProps } from '@/contracts/gtm/addPaymentInfo';
import { findMasterPerformerFromEvent } from '@/utils/eventUtils';
import { type PurchaseGtmLayerProps, upperCaseStringToCapitalize } from '@/utils/gtmLayerFormatter';
// import { sendGTMEvent } from '@next/third-parties/google';
import type {
  GtmAddToCartProps,
  GtmViewEventListProps,
  GtmViewItemListProps,
  GtmViewItemProps,
} from './types';
import { sendEventToClarity } from '../clairty';
import { sendTagToClarity } from '../clarity';
import { filterEventData, validateEventData } from './validateEventData';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM;

//todo: implement google tag manager
const sendGTMEvent = (event: unknown) => {
  console.log('sendGTMEvent', event);
};
export function GtmAddToCart(data: GtmAddToCartProps) {
  const currency = data.currency || 'USD';
  const value = data.value || 0;
  delete data.currency;
  delete data.value;
  sendEventToClarity('add_to_cart');
  sendGTMEvent({
    event: 'add_to_cart',
    ecommerce: {
      currency: currency,
      value: value,
      items: [data],
    },
  });
}

export function GtmViewEventList(data: GtmViewEventListProps) {
  const { utm_source, network, page_template, ...rest } = data;
  sendEventToClarity('view_event_list');
  sendTagToClarity('page_template', page_template ?? '');
  sendGTMEvent({
    event: 'view_event_list',
    ecommerce: {
      ...(page_template ? { page_template } : {}),
      ...(utm_source ? { source: utm_source } : {}),
      ...(network ? { network: network } : {}),
      items: [rest],
    },
  });
}

export function GtmViewItem(data: GtmViewItemProps) {
  const currency = 'USD';
  const { utm_source, network, ...rest } = data;
  sendEventToClarity('view_item');
  sendGTMEvent({
    event: 'view_item',
    ecommerce: {
      ...(utm_source ? { source: utm_source } : {}),
      ...(network ? { network: network } : {}),
      currency,
      value: data.price,
      items: [rest],
    },
  });
}

export function GtmViewItemList(data: GtmViewItemListProps) {
  const { utm_source, network, ...rest } = data;
  sendEventToClarity('view_item_list');
  sendTagToClarity('event_type', data.item_category ?? '');
  sendTagToClarity('event_category', data.item_category2 ?? '');

  sendGTMEvent({
    event: 'view_item_list',
    ecommerce: {
      ...(utm_source ? { source: utm_source } : {}),
      ...(network ? { network: network } : {}),
      items: [rest],
    },
  });
}

export function GTMAddPaymentInfo(data: GTMAddPaymentInfoProps) {
  const { currency = 'USD', value = 0, payment_type = '', checkout_version, ...rest } = data;
  sendEventToClarity('add_payment_info');
  sendGTMEvent({
    event: 'add_payment_info',
    ecommerce: {
      checkout_version,
      currency: currency,
      value: value,
      payment_type,
      items: [rest],
    },
  });
}

export interface GtmBeginCheckoutProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
  checkout_version: string;
  currency?: string;
  delivery_fee?: number;
  email?: string;
  event_time?: string;
  flex?: boolean;
  heroImage?: string;
  in_hand_date?: string;
  instant?: boolean;
  item_category?: string;
  item_category2?: string;
  item_id?: string;
  item_name?: string;
  listing_id?: string;
  location_id?: number;
  location_name?: string;
  location_region_id?: number;
  performer_image_url?: string;
  price?: number;
  primary_performer_id?: string;
  primary_performer_name?: string;
  quantity?: number;
  row?: string;
  section?: string;
  service_fee?: number;
  stock_type?: string;
  tax_amount?: number;
  unsubscribed?: boolean;
  uuid?: string;
  value?: number;
}

export function GtmBeginCheckout(data: GtmBeginCheckoutProps) {
  const { currency, checkout_version, value, email, unsubscribed, ...rest } = data;
  sendEventToClarity('begin_checkout');
  sendGTMEvent({
    event: 'begin_checkout',
    user_id: email,
    unsubscribed,
    ecommerce: {
      checkout_version,
      currency: currency || 'USD',
      value: value || 0,
      items: [rest],
    },
  });
}

export interface GtmAddShippingInfoProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
  checkout_version: string;
  currency?: string;
  delivery_fee?: number;
  event_time?: string;
  flex?: boolean;
  in_hand_date?: string;
  instant?: boolean;
  item_category?: string;
  item_category2?: string;
  item_id?: string;
  item_name?: string;
  location_id?: number;
  location_name?: string;
  location_region_id?: number;
  phone?: string;
  price?: number;
  primary_performer_id?: string;
  primary_performer_name?: string;
  quantity?: number;
  row?: string;
  section?: string;
  service_fee?: number;
  shipping_tier?: string;
  stock_type?: string;
  tax_amount?: number;
  unsubscribed_sms?: boolean;
  uuid?: string;
  value?: number;
}

export function GtmAddShippingInfo(data: GtmAddShippingInfoProps) {
  const {
    currency = 'USD',
    checkout_version,
    value = 0,
    shipping_tier = '',
    phone,
    unsubscribed_sms,
    ...rest
  } = data;

  // remove all non-numeric characters from phone number
  const unformattedPhone = phone?.replace(/\D/g, '');
  sendEventToClarity('add_shipping_info');
  sendGTMEvent({
    event: 'add_shipping_info',
    unsubscribed_sms,
    ...(!unsubscribed_sms && phone ? { phone: unformattedPhone } : {}),
    ecommerce: {
      checkout_version,
      currency,
      value,
      shipping_tier,
      items: [rest],
    },
  });
}

interface GtmPurchaseProps {
  checkoutVersion: string;
  currency?: string;
  item: PurchaseGtmLayerProps;
  order: components['schemas']['Order'];
  paymentType: string;
  promoCodeLastFour?: string;
}

export function GtmPurchase({
  currency,
  order,
  item,
  checkoutVersion,
  paymentType,
  promoCodeLastFour,
}: GtmPurchaseProps) {
  sendEventToClarity('purchase');
  sendTagToClarity('insurance_offer_status', order.hasInsurance ? 'ACCEPTED' : 'DECLINED');
  sendGTMEvent({
    event: 'purchase',
    user_id: order.emailAddress,
    phone: order.phoneNumber,
    firstName: order.billingAddress?.firstName,
    lastName: order.billingAddress?.lastName,
    billingAddr1: order.billingAddress?.address1,
    billingCity: order.billingAddress?.city,
    billingState: order.billingAddress?.state,
    billingPostalCode: order.billingAddress?.postalCode,
    billingCountry: order.billingAddress?.country,
    gp: order.gp,
    rca: order.rca,
    ecommerce: {
      checkout_version: checkoutVersion,
      currency: currency || 'USD',
      transaction_id: order.id,
      insuranceAmount: order.insuranceFee,
      insurance_offer_status: order.hasInsurance ? 'ACCEPTED' : 'DECLINED',
      promo: !!promoCodeLastFour,
      coupon: promoCodeLastFour ?? '',
      shipping: order.deliveryFee,
      payment_type: paymentType,
      tax: order.taxAmount,
      orderCreatedAt: order.createdAt,
      value: order.orderTotal,
      items: [item],
    },
  });
}

export function GtmSearch(searchTerm: string) {
  sendGTMEvent({
    event: 'search',
    search_term: searchTerm,
  });
}

export function GtmSearchInput(searchTerm: string, searchBar: 'header' | 'home') {
  sendGTMEvent({
    event: 'search_bar_input',
    search_term: searchTerm,
    search_bar: searchBar,
  });
}

export function GtmSearchResultSelected(
  searchResult: string,
  searchTerm: string,
  sectionTitle?: string
) {
  sendGTMEvent({
    event: 'search_result_selected',
    search_result: searchResult,
    search_result_section: sectionTitle,
    search_term: searchTerm,
  });
}

export function GtmSignUp() {
  sendGTMEvent({
    event: 'sign_up',
  });
}

export interface AdditionalData {
  categoryName?: string;
  countryCode?: string;
  eventCount?: number;
  eventCountBucket?: string;
  eventTimeLocal?: string;
  eventType?: string;
  lastOnsaleTimeLocal?: string;
  lastPresaleTimeLocal?: string;
  listingCount?: number;
  nextOnsaleTimeLocal?: string;
  nextPresaleTimeLocal?: string;
  performerName?: string;
  performerRank?: number;
  pricingType?: string;
  regionName?: string;
  seatingType?: string;
  stockType?: string;
  template?: string;
  variationName?: string;
  venueCapacity?: number;
  venueRank?: number;
}

export function GtmExperiment(experimentId: string, variationId: number, data?: AdditionalData) {
  const {
    categoryName,
    countryCode,
    eventTimeLocal,
    eventCount,
    eventCountBucket,
    eventType,
    lastOnsaleTimeLocal,
    lastPresaleTimeLocal,
    nextOnsaleTimeLocal,
    nextPresaleTimeLocal,
    performerName,
    performerRank,
    pricingType,
    regionName,
    venueCapacity,
    venueRank,
    listingCount,
    template,
    seatingType,
    stockType,
  } = data || {};
  // see https://developers.google.com/analytics/devguides/collection/ga4/integration
  sendTagToClarity('experiment_viewed', experimentId);

  if (data?.variationName !== undefined) {
    sendTagToClarity('experiment_variant', `${experimentId}-${data.variationName}`);
  }

  const eventData = filterEventData({
    country_code: countryCode,
    event_count_bucket: eventCountBucket,
    event_count: eventCount,
    event_time_local: eventTimeLocal,
    event: 'experiment_viewed',
    exp_variation_id: `${experimentId}-${variationId}`,
    experiment_id: experimentId,
    last_onsale_time_local: lastOnsaleTimeLocal,
    last_presale_time_local: lastPresaleTimeLocal,
    listing_count: listingCount,
    next_onsale_time_local: nextOnsaleTimeLocal,
    next_presale_time_local: nextPresaleTimeLocal,
    page_category: categoryName,
    page_event_type: eventType,
    page_performer: performerName,
    page_seating_type: seatingType,
    page_template: template,
    performer_rank: performerRank,
    pricing_type: pricingType,
    region_name: regionName,
    stock_type: stockType,
    variation_id: variationId,
    venue_capacity: venueCapacity,
    venue_rank: venueRank,
  });

  validateEventData(eventData);

  sendGTMEvent(eventData);
}

export function GtmSignUpPerformerAlerts(
  performerId: string,
  performerName: string,
  email: string
) {
  sendGTMEvent({
    event: 'sign_up_performer_alerts',
    primary_performer_id: performerId,
    primary_performer_name: performerName,
    user_id: email,
  });
}

export function GtmLogin(referring_page_path: string) {
  sendGTMEvent({
    event: 'login',
    referring_page_path,
  });
}

export function GtmEmailLogin(referring_page_path: string) {
  sendGTMEvent({
    event: 'email_login',
    referring_page_path,
  });
}

export interface Promo {
  creative_name: string;
  creative_slot: string;
  promotion_id: string;
  promotion_name: string;
}

export function gtmViewPromotion(event: components['schemas']['Event'], promo: Promo) {
  sendEventToClarity('view_promotion');
  const masterPerformer = findMasterPerformerFromEvent(event);
  sendGTMEvent({
    event: 'view_promotion',
    ecommerce: {
      ...promo,
      items: [
        {
          item_id: event.id,
          item_name: event.name,
          index: 0,
          item_category: masterPerformer?.performer?.primaryCategory?.name,
          item_category2: upperCaseStringToCapitalize(
            masterPerformer?.performer?.primaryCategory?.eventType
          ),
        },
      ],
    },
  });
}
export function gtmSelectPromotion(event: components['schemas']['Event'], promo: Promo) {
  const masterPerformer = findMasterPerformerFromEvent(event);
  sendGTMEvent({
    event: 'select_promotion',
    ecommerce: {
      ...promo,
      items: [
        {
          item_id: event.id,
          item_name: event.name,
          index: 0,
          item_category: masterPerformer?.performer?.primaryCategory?.name,
          item_category2: upperCaseStringToCapitalize(
            masterPerformer?.performer?.primaryCategory?.eventType
          ),
        },
      ],
    },
  });
}

export function gtmTicketListTimerExpired() {
  sendGTMEvent({
    event: 'time_expired',
  });
}

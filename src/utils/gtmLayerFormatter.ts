import type { Listing } from '@/contracts/entities/listing';
import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import type { GTMAddPaymentInfoProps } from '@/contracts/gtm/addPaymentInfo';
import type {
  GtmAddToCartProps,
  GtmViewEventListProps,
  GtmViewItemListProps,
  GtmViewItemProps,
} from '@/libs/gtm/types';
import { getInHandDate } from './eventUtils';
import { resolveImagePath } from './helpers';

interface CheckoutGtmLayerProps {
  event?: components['schemas']['Event'];
  listing?: components['schemas']['Listing'];
  performer?: components['schemas']['Performer'];
  qty: number;
}

export function formatAddToCart({
  event,
  performer,
  listing,
  qty,
}: CheckoutGtmLayerProps): GtmAddToCartProps {
  const masterPerformer =
    event?.eventPerformers?.find((eventPerformer) => eventPerformer?.master) ||
    event?.eventPerformers?.[0];
  const secondaryPerformers = event?.eventPerformers?.filter(
    (eventPerformer) => !eventPerformer.master && masterPerformer?.id !== eventPerformer?.id
  );

  return {
    currency: 'USD',
    item_id: String(event?.id),
    item_name: event?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id:
      secondaryPerformers?.map((eventPerformer) => eventPerformer.performerId)?.join(', ') || '',
    alt_performer_name:
      secondaryPerformers?.map((eventPerformer) => eventPerformer.performer?.name)?.join(', ') ||
      '',
    location_id: event?.venue?.id,
    location_name: event?.venue?.name,
    event_time: event?.eventTimeLocal,
    item_category: performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(performer?.primaryCategory?.eventType),
    price: Number((listing?.displayPrice || 0).toFixed(2)),
    value: listing?.displayPrice ? Number((listing?.displayPrice * qty).toFixed(2)) : undefined,
    service_fee: Number((listing?.serviceFee || 0).toFixed(2)),
    quantity: qty,
    stock_type: listing?.stockType,
    section: listing?.section,
    row: listing?.row,
    flex: listing?.flex,
    instant: listing?.instant,
    in_hand_date: getInHandDate(listing?.inHandDate)?.toISOString(),
    location_region_id: event?.venue?.regionId,
  };
}

export function formatViewItemList({
  event,
  performer,
  utmParams,
  listCount,
}: {
  event?: components['schemas']['Event'];
  performer?: components['schemas']['Performer'];
  utmParams: Record<string, string>;
  listCount?: number;
}): GtmViewItemListProps {
  const masterPerformer =
    event?.eventPerformers?.find((eventPerformer) => eventPerformer?.master) ||
    event?.eventPerformers?.[0];
  const altPerformer = event?.eventPerformers?.find(
    (eventPerformer) => !eventPerformer?.master && masterPerformer?.id !== eventPerformer?.id
  );

  return {
    item_id: String(event?.id),
    item_name: event?.name,
    primary_performer_name: masterPerformer?.performer?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    alt_performer_name: altPerformer?.performer?.name ?? '',
    alt_performer_id: String(altPerformer?.performerId ?? ''),
    item_category: performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(performer?.primaryCategory?.eventType),
    performer_image_url:
      masterPerformer?.performer?.heroImagePath ??
      masterPerformer?.performer?.primaryCategory?.performerHeroImagePath ??
      '',
    event_time: event?.eventTimeLocal,
    event_type: performer?.primaryCategory?.eventType,
    location_id: event?.venue?.id,
    location_name: event?.venue?.name,
    location_region_id: event?.venue?.regionId,
    location_region_name: event?.venue?.regionName,
    network: utmParams?.network,
    utm_source: utmParams?.utm_source,
    venue_rank: event?.venue?.popularity,
    venue_capacity: event?.venue?.capacity,
    performer_rank: performer?.popularity,
    days_to_event: event?.daysToEvent,
    pricing_type: event?.pricingType,
    list_count: listCount,
    onsale_time_local: event?.lastOnsaleTimeLocal,
    presale_time_local: event?.lastPresaleTimeLocal,
    season_ticket: event?.seasonTicket,
    parking_event_id: event?.parkingEventId,
  };
}

export function formatViewItem({
  ticket,
  event,
  performer,
  utmParams,
}: {
  ticket?: components['schemas']['Listing'];
  event?: components['schemas']['Event'];
  performer?: components['schemas']['Performer'];
  utmParams: Record<string, string>;
}): GtmViewItemProps {
  const masterPerformer =
    event?.eventPerformers?.find((eventPerformer) => eventPerformer?.master) ||
    event?.eventPerformers?.[0];
  const altPerformer = event?.eventPerformers?.find(
    (eventPerformer) => !eventPerformer?.master && masterPerformer?.id !== eventPerformer?.id
  );

  return {
    item_id: String(event?.id),
    location_name: event?.venue?.name,
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id: String(altPerformer?.performerId),
    alt_performer_name: altPerformer?.performer?.name ?? '',
    event_time: event?.eventTimeLocal,
    item_category: performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(performer?.primaryCategory?.eventType),
    item_name: event?.name,
    location_id: event?.venue?.id,
    primary_performer_id: String(masterPerformer?.performerId),
    price: Number((ticket?.displayPrice || 0).toFixed(2)),
    service_fee: Number((ticket?.serviceFee || 0).toFixed(2)),
    quantity: 1,
    stock_type: ticket?.stockType || '',
    section: ticket?.section || '',
    row: ticket?.row || '',
    flex: !!ticket?.flex,
    instant: !!ticket?.instant,
    location_region_id: event?.venue?.regionId,
    in_hand_date: getInHandDate(ticket?.inHandDate)?.toISOString(),
    network: utmParams?.network,
    utm_source: utmParams?.utm_source,
  };
}

export function formatViewEventList({
  data,
  utmParams,
  pageType,
  region,
  slug,
}: {
  data?: components['schemas']['CmsPathResponse'];
  utmParams: Record<string, string>;
  pageType: string;
  region?: Region;
  slug?: string;
}): GtmViewEventListProps {
  const getPageTemplate = () => {
    switch (pageType) {
      case 'performer':
        return {
          primary_performer_id: String(data?.performer?.id),
          primary_performer_name: data?.performer?.name,
          page_template: 'Performer Pages',
          performer_image_url: data?.performer?.heroImagePath,
          item_category: data?.performer?.primaryCategory?.name,
          item_category2: upperCaseStringToCapitalize(data?.performer?.primaryCategory?.eventType),
          location_region_id: region?.id,
          location_region_name: region?.name,
          slug: data?.performer?.slug,
          performer_rank: data?.performer?.popularity,
          category: data?.performer?.primaryCategory?.name,
          event_type: data?.performer?.primaryCategory?.eventType,
          first_public_on_sale_time: data?.events?.[0]?.lastOnsaleTimeLocal,
          list_count: data?.events?.length,
        };
      case 'venue':
        return {
          page_template: 'Venue Pages',
          performer_image_url: data?.venue?.heroImagePath,
          location_id: data?.venue?.id,
          location_name: data?.venue?.name,
          location_region_id: data?.venue?.regionId,
          location_region_name: data?.venue?.regionName,
          slug: data?.venue?.slug,
          venue_capacity: data?.venue?.capacity,
          venue_rank: data?.venue?.popularity,
          venue_id: data?.venue?.id,
          venue_region_id: data?.venue?.regionId,
          venue_region: data?.venue?.regionName,
          list_count: data?.events?.length,
        };
      case 'league-category':
      case 'category':
        return {
          page_template: 'Category Pages',
          performer_image_url: data?.category?.performerHeroImagePath,
          location_region_id: region?.id,
          location_region_name: region?.name,
          slug: data?.category?.slug,
          item_category: data?.category?.name,
          item_category2: upperCaseStringToCapitalize(data?.category?.eventType),
          category: data?.performer?.primaryCategory?.name,
          event_type: data?.performer?.primaryCategory?.eventType,
          list_count: data?.events?.length,
        };
      case 'region':
        return {
          page_template: 'Region Pages',
          performer_image_url: region?.heroImagePath
            ? resolveImagePath(region?.heroImagePath)
            : resolveImagePath('/img/general-venue.webp'),
          location_region_id: region?.id,
          location_region_name: region?.name,
          slug,
        };
      default:
        return {};
    }
  };

  return {
    ...getPageTemplate(),
    network: utmParams?.network,
    utm_source: utmParams?.utm_source,
  };
}

export interface AddPaymentInfoLayerProps {
  cart: components['schemas']['Cart'] | null;
  checkoutVersion?: string;
  listing: Listing;
  method: string;
}

export function formatAddPaymentInfo({
  cart,
  listing,
  method,
  checkoutVersion,
}: AddPaymentInfoLayerProps) {
  const masterPerformer = cart?.event?.eventPerformers?.find((performer) => performer.master);
  const altPerformer = cart?.event?.eventPerformers?.find((performer) => !performer.master);

  return {
    checkout_version: checkoutVersion ?? 'v1',
    currency: 'USD',
    value: cart?.cartTotal,
    payment_type: method,
    item_id: String(cart?.eventId),
    item_name: cart?.event?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id: altPerformer ? String(altPerformer.performerId) : '',
    alt_performer_name: altPerformer ? altPerformer?.performer?.name : '',
    location_id: cart?.event?.venueId,
    location_name: cart?.event?.venue?.name,
    event_time: cart?.event?.eventTimeLocal,
    item_category: masterPerformer?.performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(
      masterPerformer?.performer?.primaryCategory?.eventType
    ),
    price: Number((listing?.displayPrice || 0).toFixed(2)),
    service_fee: Number((listing?.serviceFee || 0).toFixed(2)),
    tax_amount: cart?.taxAmount,
    quantity: cart?.quantity,
    stock_type: cart?.deliveryMethod?.displayName,
    section: cart?.section,
    row: cart?.row,
    flex: listing?.flex,
    instant: listing?.instant,
    uuid: cart?.uuid,
    in_hand_date: getInHandDate(listing?.inHandDate).toString(),
    location_region_id: cart?.event?.venue?.regionId,
  } as GTMAddPaymentInfoProps;
}

export interface BeginCheckoutGtmLayerProps {
  cart?: components['schemas']['Cart'] | null;
  checkoutVersion?: string;
  event?: components['schemas']['Event'];
  heroImage: string;
  quantity: number;
  ticket?: Listing;
  unsubscribed?: boolean;
}

export function formatBeginCheckout({
  event,
  quantity,
  cart,
  ticket,
  heroImage,
  unsubscribed,
  checkoutVersion,
}: BeginCheckoutGtmLayerProps) {
  const masterPerformer =
    event?.eventPerformers?.find((eventPerformer) => eventPerformer?.master) ||
    event?.eventPerformers?.[0];
  const altPerformer = event?.eventPerformers
    ? event.eventPerformers.find(
        (eventPerformer) => !eventPerformer.master && masterPerformer?.id !== eventPerformer?.id
      )
    : undefined;

  return {
    checkout_version: checkoutVersion ?? 'v1',
    currency: 'USD',
    value: ticket?.displayPrice ? Number((ticket?.displayPrice * quantity).toFixed(2)) : undefined,
    item_id: String(event?.id),
    item_name: event?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id: String(altPerformer?.id),
    alt_performer_name: altPerformer?.performer?.name ?? '',
    location_id: event?.venue?.id,
    location_name: event?.venue?.name,
    event_time: event?.eventTimeLocal,
    item_category: masterPerformer?.performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(
      masterPerformer?.performer?.primaryCategory?.eventType
    ),
    price: Number((ticket?.displayPrice || 0).toFixed(2)),
    service_fee: Number((ticket?.serviceFee || 0).toFixed(2)),
    deliveryFee: cart?.deliveryFee,
    tax_amount: cart?.taxAmount,
    quantity,
    stock_type: ticket?.stockType,
    section: ticket?.section,
    row: ticket?.row,
    flex: ticket?.flex,
    instant: ticket?.instant,
    uuid: String(cart?.uuid),
    email: cart?.emailAddress,
    performer_image_url: heroImage,
    listing_id: String(cart?.listingId),
    unsubscribed,
    in_hand_date: getInHandDate(ticket?.inHandDate)?.toISOString(),
    location_region_id: event?.venue?.regionId,
  };
}

export interface AddShippingInfoLayerProps {
  cart: components['schemas']['Cart'] | null;
  checkoutVersion?: string;
  event?: components['schemas']['Event'];
  quantity: number;
  ticket?: Listing;
}

export function formatAddShippingInfo({
  event,
  quantity,
  cart,
  ticket,
  checkoutVersion,
}: AddShippingInfoLayerProps) {
  const masterPerformer =
    event?.eventPerformers?.find((eventPerformer) => eventPerformer?.master) ||
    event?.eventPerformers?.[0];
  const altPerformer = event?.eventPerformers?.find(
    (eventPerformer) => !eventPerformer.master && masterPerformer?.id !== eventPerformer?.id
  );

  return {
    checkout_version: checkoutVersion ?? 'v1',
    currency: 'USD',
    value: ticket?.displayPrice ? Number((ticket?.displayPrice * quantity).toFixed(2)) : undefined,
    shipping_tier: cart?.deliveryMethod?.enumName,
    item_id: String(event?.id),
    item_name: event?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id: String(altPerformer?.performerId),
    alt_performer_name: altPerformer?.performer?.name || '',
    location_id: event?.venue?.id,
    location_name: event?.venue?.name,
    event_time: event?.eventTimeLocal,
    item_category: masterPerformer?.performer?.primaryCategory?.name ?? '',
    item_category2:
      upperCaseStringToCapitalize(masterPerformer?.performer?.primaryCategory?.eventType) ?? '',
    price: Number((ticket?.displayPrice || 0).toFixed(2)),
    service_fee: Number((ticket?.serviceFee || 0).toFixed(2)),
    quantity,
    stock_type: ticket?.stockType,
    section: ticket?.section,
    row: ticket?.row,
    flex: ticket?.flex,
    instant: ticket?.instant,
    uuid: String(cart?.uuid),
    in_hand_date: getInHandDate(ticket?.inHandDate)?.toISOString(),
    location_region_id: event?.venue?.regionId,
    unsubscribed_sms: !cart?.smsOptIn,
    phone: cart?.phoneNumber,
  };
}

export interface PurchaseProps {
  cartUuid: string;
  categories: components['schemas']['Category'][];
  order: components['schemas']['Order'];
}
export interface PurchaseGtmLayerProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
  currency?: string;
  delivery_fee?: number;
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
  uuid?: string;
  value?: number;
}
export function formatPurchase({ cartUuid, order }: PurchaseProps): PurchaseGtmLayerProps {
  const orderItem = order?.items?.[0];
  const event = order?.items?.[0].event;
  const masterPerformer = event?.eventPerformers?.find((performer) => performer.master);

  const altPerformer = event?.eventPerformers?.find((performer) => !performer.master);

  return {
    currency: 'USD',
    value: order.orderTotal,
    item_id: String(event?.id),
    item_name: event?.name,
    primary_performer_id: String(masterPerformer?.performerId),
    primary_performer_name: masterPerformer?.performer?.name,
    alt_performer_id: altPerformer ? String(altPerformer.performerId) : '',
    alt_performer_name: altPerformer ? altPerformer.performer?.name : '',
    location_id: event?.venueId,
    location_name: event?.venue?.name,
    event_time: event?.eventTimeLocal,
    item_category: masterPerformer?.performer?.primaryCategory?.name,
    item_category2: upperCaseStringToCapitalize(
      masterPerformer?.performer?.primaryCategory?.eventType
    ),
    price: Number((orderItem?.unitBilled ?? 0).toFixed(2)),
    service_fee: Number((order.serviceFee ?? 0).toFixed(2)),
    quantity: orderItem?.quantity,
    stock_type: order.deliveryMethod,
    section: orderItem?.section,
    row: orderItem?.row,
    flex: orderItem?.flex,
    tax_amount: order.taxAmount,
    instant: orderItem?.instant,
    uuid: cartUuid,
    listing_id: String(orderItem?.listingId),
    performer_image_url: masterPerformer?.performer?.heroImagePath,
    in_hand_date: getInHandDate(order?.inHandDate)?.toISOString(),
    location_region_id: orderItem?.event?.venue?.regionId,
  };
}

// create a function that receives a capslock string and return it just capilized
export const upperCaseStringToCapitalize = (string?: string) => {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

import type { components } from '@/contracts/generated/maverick-schema';

export interface GtmAddToCartProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
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
  price?: number;
  primary_performer_id?: string;
  primary_performer_name?: string;
  quantity?: number;
  row?: string;
  section?: string;
  service_fee?: number;
  stock_type?: string;
  tax_amount?: number;
  value?: number;
}

export interface GtmViewEventListProps {
  item_category?: components['schemas']['Category'] | string;
  item_category2?: string;
  location_id?: number;
  location_region_id?: number;
  location_region_name?: string;
  network?: string;
  page_template?: string;
  performer_image_url?: string;
  primary_performer_id?: string;
  primary_performer_name?: string;
  region_id?: number;
  slug?: string;
  stock_type?: string;
  utm_source?: string;
}

export interface GtmViewItemListProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
  days_to_event?: number;
  event_time?: string;
  event_type?: string;
  item_category?: string;
  item_category2?: string;
  item_id?: string;
  item_name?: string;
  last_onsale_time?: string;
  list_count?: number;
  location_id?: number;
  location_name?: string;
  location_region_id?: number;
  location_region_name?: string;
  network?: string;
  onsale_time_local?: string;
  parking_event_id?: number;
  performer_image_url: string;
  performer_rank?: number;
  presale_time_local?: string;
  pricing_type?: string;
  primary_performer_id?: string;
  primary_performer_name?: string;
  season_ticket?: boolean;
  utm_source?: string;
  venue_capacity?: number;
  venue_rank?: number;
}

export interface GtmViewItemProps {
  alt_performer_id?: string;
  alt_performer_name?: string;
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
  network?: string;
  price?: number;
  primary_performer_id?: string;
  primary_performer_name?: string;
  quantity?: number;
  row?: string;
  section?: string;
  service_fee?: number;
  stock_type?: string;
  utm_source?: string;
}

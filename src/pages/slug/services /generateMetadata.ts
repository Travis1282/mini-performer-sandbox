import type { components } from '@/contracts/generated/maverick-schema';
import { siteName } from '@/services/config';
import { basePath } from '@/services/config';
import { getHeroImage } from '@/utils/eventUtils';
import { redirect } from 'react-router';
import type { SearchPageParams } from '../types';

interface GenerateMetadataParams {
  data: components['schemas']['CmsPathResponse'];
  searchParams: SearchPageParams['searchParams'];
  slug: string;
}

export interface GenerateMetadataResp {
  alternates: {
    canonical: string;
  };
  description: string;
  icons: {
    apple: string;
    icon: string;
  };
  keywords: string;
  metadataBase: URL;
  openGraph: {
    type: string;
    title: string;
    description: string;
    url: URL;
    siteName: string;
    images: {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[];
  };
  title: string;
  twitter: {
    title: string;
    description: string;
    site: string;
    creator: string;
    images: {
      url: string;
    }[];
    card: string;
  };
}

export function generateMetadata({
  slug,
  searchParams,
  data,
}: GenerateMetadataParams): GenerateMetadataResp {
  if (data?.redirect && data?.redirectLocation) {
    const queryString =
      searchParams && Object.keys(searchParams).length
        ? `?${new URLSearchParams(searchParams).toString()}`
        : '';
    throw redirect(data.redirectLocation + queryString);
  }

  const heroImage =
    data && 'performer' in data
      ? getHeroImage('performer', data.performer)
      : data && 'category' in data
        ? getHeroImage('category', data.category)
        : 'https://static.gotickets.com/img/go-icon-logo.png';

  const title = data?.title + ` | ${siteName}`;
  const keywords = data?.metaKeywords ?? '';
  const description = data?.metaDescription ?? '';

  const image = {
    url: heroImage,
    width: 640,
    height: 221,
    alt: title,
  };

  return {
    metadataBase: new URL(basePath),
    title,
    keywords,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: new URL(basePath),
      siteName: siteName,
      images: [image],
    },
    twitter: {
      title,
      description,
      site: '@GoTickets',
      creator: '@GoTickets',
      images: [image],
      card: 'summary',
    },
    icons: {
      apple: 'https://static.gotickets.com/img/go-icon-logo.png',
      icon: 'https://static.gotickets.com/img/go-icon-logo.png',
    },
    alternates: {
      canonical: slug,
    },
  };
}

import type { components } from '@/contracts/generated/maverick-schema';
import { leagueMap } from '@/contracts/sports';
import { getCms } from '@/services/maverick/getCms';
import { getEventsPaginated } from '@/services/maverick/getEventsPaginated';
import { buildServerRequestInit } from '@/utils/buildServerRequestInit';
import { reThrowError } from '@/utils/reThrowError';
import { redirect } from 'react-router';
import type { SearchPageParams } from '../types';
import type { GenerateMetadataResp } from './generateMetadata';
import { generateMetadata } from './generateMetadata';
import { checkHasEventsForSimpleView } from './utils';

export interface GetPerformerDataResp {
  data: components['schemas']['CmsPathResponse'];
  eventsListResp: Awaited<ReturnType<typeof getEventsPaginated>>;
  hasSpecificHeroImage: boolean;
  isALeagueCategory: boolean;
  metadata: GenerateMetadataResp;
  searchParams?: SearchPageParams['searchParams'];
  showTabs: boolean;
  slug: string;
  titleOverride?: string;
}

export const getPerformerData = async (
  slug: string,
  searchParams?: SearchPageParams['searchParams']
): Promise<GetPerformerDataResp | undefined> => {
  try {
    const response = await getCms({
      init: buildServerRequestInit(),
      params: {
        query: {
          path: slug,
        },
      },
    });

    const { data } = response;
    console.log('data', data);

    if (!data) {
      redirect('/404');
      return;
    }

    const metadata = generateMetadata({
      slug,
      searchParams,
      data,
    });

    const isALeagueCategory =
      data && 'category' in data
        ? !!Object.keys(leagueMap).find((key) => key.includes(slug))
        : false;
    const hasSpecificHeroImage = Boolean(data?.performer?.heroImagePath);
    const semSimpleViewEnabled = !!(searchParams && searchParams.fv);
    const hasVenueOrRegionFilters =
      searchParams?.venue !== undefined || searchParams?.region !== undefined;
    const hasEventsForSimpleView = checkHasEventsForSimpleView(
      semSimpleViewEnabled,
      hasVenueOrRegionFilters,
      searchParams,
      data
    );
    const showTabs = !(
      semSimpleViewEnabled &&
      (!hasVenueOrRegionFilters || hasEventsForSimpleView)
    );
    const titleOverride = searchParams?.hovr;

    if (!data.performer?.id) {
      return;
    }

    const eventsListResp = await getEventsPaginated({
      query: { performerId: [Number(data.performer.id)] },
    });

    return {
      slug,
      searchParams,
      data,
      isALeagueCategory,
      metadata,
      hasSpecificHeroImage,
      showTabs,
      titleOverride,
      eventsListResp,
    };
  } catch (error) {
    reThrowError(error);
  }
};

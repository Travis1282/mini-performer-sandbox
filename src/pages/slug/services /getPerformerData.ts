import { redirect } from 'react-router';
import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import { getCms } from '@/services/maverick/getCms';
import { getRegions } from '@/services/maverick/getRegions';
import { getHeroImage } from '@/utils/eventUtils';
import { reThrowError } from '@/utils/reThrowError';
import type { SearchPageParams } from '../types';

export interface GetPerformerDataResp {
  data: components['schemas']['CmsPathResponse'];
  heroImage: string;
  regions: Region[];
  searchParams?: SearchPageParams['searchParams'];
  slug: string;
}

export const getPerformerData = async (
  slug = 'billie-eilish',
  searchParams?: SearchPageParams['searchParams']
): Promise<GetPerformerDataResp | undefined> => {
  try {
    const { data } = await getCms();
    const regions = await getRegions();

    if (!data) {
      redirect('/404');
      return;
    }

    const heroImage =
      data && 'performer' in data
        ? getHeroImage('performer', data.performer)
        : data && 'category' in data
          ? getHeroImage('category', data.category)
          : 'https://static.gotickets.com/img/go-icon-logo.png';

    return {
      slug,
      searchParams,
      data,
      heroImage,
      regions,
      
    };
  } catch (error) {
    reThrowError(error);
  }
};

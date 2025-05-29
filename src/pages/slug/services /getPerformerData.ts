import type { components } from '@/contracts/generated/maverick-schema';
import { getCms } from '@/services/maverick/getCms';
import { getHeroImage } from '@/utils/eventUtils';
import { reThrowError } from '@/utils/reThrowError';
import { redirect } from 'react-router';
import type { SearchPageParams } from '../types';

export interface GetPerformerDataResp {
  data: components['schemas']['CmsPathResponse'];
  heroImage: string;
  searchParams?: SearchPageParams['searchParams'];
  slug: string;
}

export const getPerformerData = async (
  slug = 'billie-eilish',
  searchParams?: SearchPageParams['searchParams']
): Promise<GetPerformerDataResp | undefined> => {
  try {
    const response = await getCms({
      params: {
        query: {
          path: slug,
        },
      },
    });

    const { data } = response;

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
    };
  } catch (error) {
    reThrowError(error);
  }
};

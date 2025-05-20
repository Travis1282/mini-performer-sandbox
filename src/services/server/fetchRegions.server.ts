import { getRegions } from '@/services/maverick/getRegions';
import { buildServerRequestInit } from '@/services/utils/buildServerRequestInit';
import { reThrowError } from '@/utils/reThrowError';

export async function fetchRegions() {
  const { error, data } = await getRegions({
    init: buildServerRequestInit({
      cache: 'force-cache',
    }),
  });

  if (error) {
    reThrowError(error);
  }

  return data;
}

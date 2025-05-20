import { getSeatSecure } from '@/services/maverick/getSeatSecure';
import { buildServerRequestInit } from '@/services/utils/buildServerRequestInit';
import { reThrowError } from '@/utils/reThrowError';

export async function fetchSeatSecure() {
  const { error, data } = await getSeatSecure({
    init: buildServerRequestInit({
      cache: 'force-cache',
    }),
  });

  if (error) {
    reThrowError(error);
  }

  return data;
}

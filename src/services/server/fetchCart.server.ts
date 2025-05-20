import type { paths } from '@/contracts/generated/maverick-schema';
import { getCart } from '@/services/maverick/getCart';
import { buildServerRequestInit } from '@/services/utils/buildServerRequestInit';

interface FetchCartOptions {
  params: paths['/rest/carts/{cart-uuid}']['get']['parameters'];
}

export async function fetchCart({ params }: FetchCartOptions) {
  const result = await getCart({
    init: buildServerRequestInit(),
    params,
  });

  return result;
}

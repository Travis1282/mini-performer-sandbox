import type { paths } from '@/contracts/generated/maverick-schema';
import { client } from '@/services/maverick/maverick-client';

export interface postConfirmTransferReceiptOptions {
  init?: RequestInit;
  params: paths['/rest/orders/{secret-value}/confirm-transfer-receipt']['post']['parameters'];
}

export function postConfirmTransferReceipt({ init, params }: postConfirmTransferReceiptOptions) {
  return client().POST('/rest/orders/{secret-value}/confirm-transfer-receipt', {
    ...(init ?? {}),
    params,
    body: undefined,
    parseAs: 'text',
  });
}

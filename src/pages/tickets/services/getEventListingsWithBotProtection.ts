import type { paths } from '@/services/maverick/generated/maverick-schema'
import type {
  GetEventListingsOptions} from '@/services/maverick/getEventListings';

import {
  getEventListings
} from '@/services/maverick/getEventListings'

import { getBotDetectionToken } from './getBotDetectionToken'

export async function getEventListingsWithBotProtection(
  options: GetEventListingsOptions
): Promise<{
  data: paths['/rest/events/{event-id}/listings']['get']['responses']['200']['content']['application/json;charset=utf-8']
  response: Response
}> {
  try {
    const token = await getBotDetectionToken()
    const { data, response } = await getEventListings({
      params: { ...options.params, header: { 'X-Bot-Detection': token } },
    })
    if (!data) {
      throw new Error('No data')
    }
    return {
      data,
      response,
    }
  } catch (error) {
    throw error
  }
}

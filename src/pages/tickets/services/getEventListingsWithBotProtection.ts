import type { paths } from '@/services/maverick/generated/maverick-schema'
import type { GetEventListingsOptions } from '@/services/maverick/get-event-listings'
import { getEventListings } from '@/services/maverick/get-event-listings'
import { getBotDetectionToken } from './get-bot-detection-token'

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

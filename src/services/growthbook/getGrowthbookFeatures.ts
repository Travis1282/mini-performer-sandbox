import type { FeatureApiResponse } from '@growthbook/growthbook-react'
import { gbClientKey } from '../config'
import { getFeatures } from '../maverick/get-features'

export async function getGrowthbookFeatures() {
  let featuresPayload: FeatureApiResponse | undefined = undefined
  try {
    const { data } = await getFeatures({
      params: {
        path: {
          clientKey: gbClientKey,
        },
      },
    })
    featuresPayload = data as FeatureApiResponse
  } catch (error) {
    console.log(error)
  }
  return featuresPayload
}

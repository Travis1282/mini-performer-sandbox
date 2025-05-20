import type { Attributes, FeatureApiResponse } from '@growthbook/growthbook-react';
import { GrowthBook } from '@growthbook/growthbook-react';
import { buildInitialGrowthbookTargetingAttributes } from './buildInitialGrowthbookTargetingAttributes';

interface CreateGrowthBookOptions {
  attributes?: Attributes;
  payload: FeatureApiResponse;
}

export function createGrowthBook({ payload, attributes }: CreateGrowthBookOptions) {
  const defaultAttributes = buildInitialGrowthbookTargetingAttributes();
  const initialAttributes = { ...defaultAttributes, ...attributes };
  const gb = new GrowthBook({
    attributes: initialAttributes,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    trackingCallback: (experiment: any, result: any) => {
      console.log('Experiment Viewed', {
        experimentId: experiment.key,
        variationId: result.key,
      });
    },
  });

  // Initialize with streaming updates enabled
  gb.initSync({
    payload,
  });

  return gb;
}

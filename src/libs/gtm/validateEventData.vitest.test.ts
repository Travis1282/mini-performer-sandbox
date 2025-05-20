import { describe, expect, it, vi } from 'vitest';
import { filterEventData, validateEventData } from './validateEventData';

describe('validateEventData', () => {
  it('should log error when event data has more than 25 properties', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    // Create an object with 26 properties
    const largeEventData = Array.from({ length: 26 }).reduce<Record<string, string>>(
      (acc, _, index) => {
        return { ...acc, [`prop${index}`]: `value${index}` };
      },
      {}
    );

    validateEventData(largeEventData);

    expect(consoleSpy).toHaveBeenCalledWith(
      'GTM event data too long:',
      largeEventData,
      'please remove unneccessary data'
    );

    consoleSpy.mockRestore();
  });

  it('should not log error when event data has 25 or fewer properties', () => {
    const consoleSpy = vi.spyOn(console, 'error');

    const validEventData = {
      event: 'purchase',
      currency: 'USD',
      value: 99.99,
    };

    validateEventData(validEventData);

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});

describe('filterEventData', () => {
  it('should remove properties with null or undefined values', () => {
    const eventData = {
      event: 'purchase',
      currency: 'USD',
      value: 99.99,
      coupon: null,
      discount: undefined,
      shipping: 0,
      tax: '',
    };

    const filteredData = filterEventData(eventData);

    expect(filteredData).toEqual({
      event: 'purchase',
      currency: 'USD',
      value: 99.99,
      shipping: 0,
      tax: '',
    });
  });

  it('should return empty object when all values are null or undefined', () => {
    const eventData = {
      prop1: null,
      prop2: undefined,
    };

    const filteredData = filterEventData(eventData);

    expect(filteredData).toEqual({});
  });

  it('should return same object when no null or undefined values exist', () => {
    const eventData = {
      event: 'view_item',
      currency: 'EUR',
      value: 49.99,
    };

    const filteredData = filterEventData(eventData);

    expect(filteredData).toEqual(eventData);
  });
});

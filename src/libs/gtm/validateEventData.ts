import _isNil from 'lodash-es/isNil';
import _omitBy from 'lodash-es/omitBy';

export function validateEventData(eventData: Record<string, unknown>) {
  if (Object.keys(eventData).length > 25) {
    console.error('GTM event data too long:', eventData, 'please remove unneccessary data');
  }
}

/**
 * removes object properties that have null, undefined or empty values
 * @param eventData
 * @returns
 */
export function filterEventData(eventData: Record<string, unknown>) {
  return _omitBy(eventData, _isNil);
}

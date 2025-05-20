import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import type { IpLocation } from './ip-loc.types';
import { getUserLocation } from '../maverick/get-user-location';
import { CLOSEST_REGION_COOKIE } from './constants';
import { getIpAndLoc } from './get-ip-loc';

export async function getLocationRegion(c: Context) {
  let closestRegionId: string | undefined = getCookie(c, CLOSEST_REGION_COOKIE);
  let ipLocation: IpLocation | undefined;

  try {
    ipLocation = getIpAndLoc(c.req.raw);
  } catch (error) {
    console.log(error);
  }

  if (
    ipLocation?.ip &&
    ipLocation?.loc &&
    ['US', 'CA'].includes(ipLocation.loc) &&
    !closestRegionId
  ) {
    try {
      const { data } = await getUserLocation({
        params: {
          query: {
            ipAddress: ipLocation.ip ?? '',
            country: ipLocation.loc ?? '',
            latitude: Number(ipLocation.latitude),
            longitude: Number(ipLocation.longitude),
          },
        },
      });
      if (data) {
        closestRegionId = `${data.closestRegion?.id}`;
      }
    } catch (error) {
      closestRegionId = '0';
      console.error(error);
    }
  } else if (!closestRegionId) {
    closestRegionId = '0';
  }

  if (closestRegionId) {
    setCookie(c, CLOSEST_REGION_COOKIE, closestRegionId, {
      path: '/',
    });
  }

  return {
    ipLocation,
    closestRegionId,
  };
}

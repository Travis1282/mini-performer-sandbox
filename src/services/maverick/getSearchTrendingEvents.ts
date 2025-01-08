import { paths } from "./generated/maverick-schema";
import { client } from "./maverick-client";

export interface GetSearchTendingEventsOptions {
  init?: Omit<RequestInit, "body">;
  params?: paths["/rest/search/trending/events"]["get"]["parameters"];
}

export function getSearchTrendingEvents({
  init = {},
  params = {},
}: GetSearchTendingEventsOptions) {
  return client.GET("/rest/search/trending/events", {
    ...init,
    params,
  });
}

import dayjs from "dayjs";
import { components } from "../maverick/generated/maverick-schema";
import { sanitizeString } from "../string/sanitize-string";

export function getEventTicketsPath(event: components["schemas"]["Event"]) {
  const dateFormat = dayjs(event.eventTimeLocal).format("M-D-YYYY");

  const local = sanitizeString(
    event.venue
      ? `${event.venue.name}-${event.venue.city}-${event.venue.state}`
      : ""
  );

  let slug = event.slug || sanitizeString(event.name ?? "");
  if (slug.indexOf("tickets") < 0) {
    slug = slug + "-tickets";
  }

  return `/tickets/${event.id}/${slug}/${local}-${dateFormat}`;
}

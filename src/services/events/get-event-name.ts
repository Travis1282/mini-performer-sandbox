import { components } from "../maverick/generated/maverick-schema";
import { hasMinimumAge } from "./has-minimum-age";

export function getEventName(event?: components["schemas"]["Event"]) {
  return `${event?.name}${
    hasMinimumAge(event) ? ` (${event?.minimumAge}+)` : ""
  }`;
}

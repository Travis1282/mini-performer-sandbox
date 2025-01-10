import { components } from "../maverick/generated/maverick-schema";

export function shouldShowSeatedTogether({
  isMultiple,
  event,
  listing,
}: {
  isMultiple: boolean;
  event?: components["schemas"]["Event"];
  listing?: components["schemas"]["Listing"];
}) {
  return (
    isMultiple &&
    !event?.venueConfiguration?.generalAdmission &&
    !listing?.flex &&
    !event?.parking &&
    !listing?.attributes?.includes(32) &&
    !listing?.generalAdmission
  );
}

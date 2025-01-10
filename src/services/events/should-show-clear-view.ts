import { components } from "../maverick/generated/maverick-schema";

export function shouldShowClearView({
  listing,
  event,
}: {
  listing?: components["schemas"]["Listing"];
  event?: components["schemas"]["Event"];
}) {
  return (
    !listing?.attributes?.includes(2) &&
    !listing?.attributes?.includes(3) &&
    !listing?.attributes?.includes(9) &&
    !listing?.attributes?.includes(10) &&
    !listing?.attributes?.includes(21) &&
    !listing?.attributes?.includes(22) &&
    !listing?.attributes?.includes(23) &&
    !listing?.attributes?.includes(48) &&
    !listing?.generalAdmission &&
    !event?.parking
  );
}

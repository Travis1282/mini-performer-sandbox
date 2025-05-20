// import { sendGTMEvent } from '@next/third-parties/google'

//todo: implement google tag manager
const sendGTMEvent = (event: unknown) => {
  console.log('sendGTMEvent', event);
};
export interface GtmTicketInsuranceOptions {
  insurance_fee: number;
  insurance_offer: 'accepted' | 'declined';
  insurance_purchased: 'complete' | 'incomplete' | 'resign';
  payment_type: string;
}

/**
 * Sends a ticket_insurance event to Google Tag Manager.
 *
 * @param options - Options passed to the GTM event.
 * @param options.insurance_offer - The status of the ticket insurance offer.
 *   'accepted' if the user accepted the offer, 'declined' if the user declined.
 * @param options.insurance_purchased - The status of the ticket insurance purchase.
 *   'complete' if the purchase was successful, 'resign' if the purchase was
 *   cancelled, 'incomplete' if the purchase is still in progress.
 * @param options.insurance_fee - The cost of the ticket insurance.
 * @param options.payment_type - The type of payment used for the purchase.
 */
export function gtmTicketInsurance({
  insurance_offer,
  insurance_purchased,
  insurance_fee,
  payment_type,
}: GtmTicketInsuranceOptions) {
  sendGTMEvent({
    event: 'ticket_insurance',
    insurance_offer,
    insurance_purchased,
    insurance_fee: insurance_fee.toFixed(2),
    payment_type,
  });
}

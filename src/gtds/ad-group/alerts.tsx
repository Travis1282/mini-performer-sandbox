import Icon from '@/components/Shared/Icons'

export function AdGroupBuyerGuarantee() {
  return (
    <div className="w-100 flex justify-center">
      <div className="mx-4 my-8 flex w-full flex-wrap items-center rounded border-l-[10px] border-l-submit bg-submit bg-opacity-10 text-dark lg:mx-0 lg:flex-nowrap">
        <div className="m-4 grid min-h-[42px] min-w-[42px] place-items-center rounded-full bg-submit bg-none lg:m-6">
          <Icon fill="#fff" height={21} name="ShieldCheckRounded" width={26} />
        </div>
        <p className="block text-[16px] font-semibold lg:hidden">
          100% Buyer Guarantee
        </p>

        <div className="mx-4 mb-4 grow py-0 pr-5 lg:mx-0 lg:mb-0 lg:py-3">
          <p className="hidden text-[16px] font-semibold lg:block">
            100% Buyer Guarantee
          </p>
          <ul className="list-disc pl-6 text-[14px] font-medium">
            <li>
              Every ticket listed on GoTickets is authentic and verified from
              trusted sellers
            </li>
            <li>Purchase protection and a commitment to on-time delivery</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export function SafeAndSecureBuyerGuarantee() {
  return (
    <div className="w-100 flex justify-center">
      <div className="mx-4 my-8 flex w-full flex-wrap items-center rounded border-l-[10px] border-l-submit bg-submit bg-opacity-10 text-dark lg:mx-0 lg:flex-nowrap">
        <div className="m-4 grid min-h-[42px] min-w-[42px] place-items-center rounded-full bg-submit bg-none lg:m-6">
          <Icon fill="#fff" height={21} name="ShieldCheckRounded" width={26} />
        </div>
        <p className="block text-[16px] font-semibold lg:hidden">
          Safe & Secure Checkout
        </p>

        <div className="mx-4 mb-4 max-w-[] grow py-0 pr-5 lg:mx-0 lg:mb-0 lg:py-3">
          <p className="hidden text-[16px] font-semibold lg:block">
            Safe & Secure Checkout
          </p>
          <ul className="list-disc pl-6 text-[14px] font-medium">
            <li>
              Our site uses SSL encryption to ensure the transmission of your
              order information for processing
            </li>
            <li>
              All transactions are secure and backed by 100% purchase protection
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

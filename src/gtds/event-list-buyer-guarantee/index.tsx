import Icon from '../Icons'

export default function EventListBuyerGuarantee() {
  return (
    <div className="flex w-full flex-row gap-[23px] bg-[linear-gradient(90deg,#27800520_0%,rgba(70,191,0,0)_100%)] px-4 py-3 text-left lg:w-fit lg:gap-[15px] lg:bg-none lg:px-6">
      <div className="grid place-items-center rounded-full bg-none lg:h-10 lg:w-10 lg:bg-accent">
        <div className="block lg:hidden">
          <Icon
            fill="#3899F8"
            height={21}
            name="ShieldCheckRounded"
            width={26}
          />
        </div>
        <div className="hidden lg:block">
          <Icon fill="#fff" height={21} name="ShieldCheckRounded" width={26} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm !font-semibold text-dark lg:text-base">
          100% Buyer Guarantee
        </span>
        <span className="text-xs !font-medium text-[#808993] lg:text-sm">
          Verified, authentic tickets. Purchase protection.
        </span>
      </div>
    </div>
  )
}

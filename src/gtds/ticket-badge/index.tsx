import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'

interface TicketBadgeProps {
  className?: string
  type:
    | 'JUST_SOLD'
    | 'LAST_IN_SECTION'
    | 'LOW_PRICE'
    | 'POWER_SElLER'
    | 'SELLING_FAST'
    | 'SUPER_SALE'
}
const TicketBadge = ({ type, className }: TicketBadgeProps) => {
  function getText() {
    switch (type) {
      case 'SELLING_FAST':
        return 'SELLING FAST'
      case 'SUPER_SALE':
        return 'SUPER SELLER'
      case 'POWER_SElLER':
        return 'POWER SELLER'
      case 'JUST_SOLD':
        return 'TICKETS JUST SOLD'
      case 'LOW_PRICE':
        return 'LOWEST PRICE'
      case 'LAST_IN_SECTION':
        return 'LAST TICKET IN SECTION'
      default:
        return ''
    }
  }

  function getIcon() {
    switch (type) {
      case 'SELLING_FAST':
        return 'grow-arrow-green.svg'
      case 'SUPER_SALE':
        return 'diamond-yellow.svg'
      case 'POWER_SElLER':
        return 'flame-orange.svg'
      default:
        return ''
    }
  }
  const icon = getIcon()
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center gap-[5px] rounded-[40px] p-[3px] text-center lg:p-0 lg:pl-[3px] lg:pr-2',
        type === 'POWER_SElLER' && 'text-orange bg-[#FE5C361A]',
        type === 'LOW_PRICE' &&
          'border-submit text-submit border bg-[#46BF001A] !py-[1px] !pl-2 !pr-2',
        type === 'JUST_SOLD' &&
          'border-orange text-orange border bg-[#FE5C361A] !py-[2px] !pl-2',
        type === 'SUPER_SALE' && 'bg-[#FF9C001A] text-[#FF9C00]',
        type === 'SELLING_FAST' && 'text-submit bg-[#46BF001A]',
        type === 'LAST_IN_SECTION' &&
          'border border-[#516AEC] bg-[#516AEC1A] !py-[1px] !pl-2 !pr-2 text-[#516AEC]',
        className
      )}
      id={type}
    >
      {icon && (
        <Image
          alt={`${type} icon on badge`}
          height={11}
          src={resolveImagePath(`/img/${icon}`)}
          unoptimized
          width={11}
        />
      )}
      <span className={clsx('text-xs !font-bold uppercase lg:block')}>
        {getText()}
      </span>
    </div>
  )
}

export default TicketBadge

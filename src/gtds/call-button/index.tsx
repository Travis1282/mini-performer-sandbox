import { supportPhoneNumber } from '@/utils/config'
import { resolveImagePath } from '@/utils/helpers'
import Image from 'next/image'

export function CallButton() {
  const phoneNumber = supportPhoneNumber.replace(/[-() ]/g, '')

  return (
    <a className="group flex" href={`tel:1${phoneNumber}`}>
      <Image
        alt="phone call icon"
        className="mr-0 lg:mr-3"
        height={18}
        src={resolveImagePath('/img/icons/fi-rr-phone-call.svg')}
        width={18}
      />
      <span className="hidden whitespace-nowrap text-submit group-hover:brightness-90 lg:block">
        {supportPhoneNumber}
      </span>
    </a>
  )
}

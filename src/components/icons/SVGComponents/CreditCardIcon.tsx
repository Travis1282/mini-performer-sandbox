import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCreditCardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 21 20"
    {...props}
  >
    <g fill="#011327" clipPath="url(#CreditCardIcon_svg__a)">
      <path d="M18 2.5H3A2.5 2.5 0 0 0 .5 5v1.667h20V5A2.5 2.5 0 0 0 18 2.5M.5 17.503h20V8.336H.5zm5.833-4.584a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0" />
    </g>
    <defs>
      <clipPath id="CreditCardIcon_svg__a">
        <path fill="#fff" d="M.5 0h20v20H.5z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCreditCardIcon

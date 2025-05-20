import * as React from 'react'
import type { SVGProps } from 'react'
const SvgShieldIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 19 20"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#ShieldIcon_svg__a)">
      <path d="M14.71 2.194 9.75.541a.8.8 0 0 0-.5 0L4.29 2.194A3.95 3.95 0 0 0 1.584 5.95V10c0 5.988 7.283 9.294 7.595 9.432a.8.8 0 0 0 .643 0c.312-.138 7.595-3.444 7.595-9.432V5.95a3.95 3.95 0 0 0-2.707-3.756M15.834 10c0 4.319-5.003 7.151-6.334 7.829-1.332-.675-6.333-3.5-6.333-7.829V5.95A2.375 2.375 0 0 1 4.79 3.695l4.71-1.57 4.708 1.57a2.375 2.375 0 0 1 1.625 2.253z" />
      <path d="m12.112 7.071-3.315 3.325L7.02 8.544A.792.792 0 1 0 5.88 9.64l1.825 1.9a1.48 1.48 0 0 0 1.065.475h.026a1.48 1.48 0 0 0 1.057-.438l3.382-3.382a.797.797 0 0 0-.256-1.296.79.79 0 0 0-.867.171" />
    </g>
    <defs>
      <clipPath id="ShieldIcon_svg__a">
        <path fill="#fff" d="M0 .5h19v19H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgShieldIcon

import * as React from 'react'
import type { SVGProps } from 'react'
const SvgParking = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#Parking_svg__a)">
      <path
        fill={props.color ?? '#011327'}
        d="M5.333 12.667A.667.667 0 0 1 4.667 12V6a2.67 2.67 0 0 1 2.666-2.667H9c1.654 0 3 1.346 3 3s-1.346 3-3 3H6V12a.667.667 0 0 1-.667.667M6 8h3c.92 0 1.667-.748 1.667-1.667 0-.918-.748-1.666-1.667-1.666H7.333C6.598 4.667 6 5.265 6 6zm6.667 8H3.333A3.337 3.337 0 0 1 0 12.667V3.333A3.337 3.337 0 0 1 3.333 0h9.334A3.337 3.337 0 0 1 16 3.333v9.334A3.337 3.337 0 0 1 12.667 16M3.333 1.333c-1.102 0-2 .898-2 2v9.334c0 1.102.898 2 2 2h9.334c1.102 0 2-.898 2-2V3.333c0-1.102-.898-2-2-2z"
      />
    </g>
    <defs>
      <clipPath id="Parking_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgParking

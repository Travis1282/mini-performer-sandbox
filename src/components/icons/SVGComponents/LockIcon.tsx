import * as React from 'react'
import type { SVGProps } from 'react'
const SvgLockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#LockIcon_svg__a)">
      <path d="M14.25 6.318V5.25a5.25 5.25 0 1 0-10.5 0v1.068A3.75 3.75 0 0 0 1.5 9.75v4.5A3.754 3.754 0 0 0 5.25 18h7.5a3.754 3.754 0 0 0 3.75-3.75v-4.5a3.75 3.75 0 0 0-2.25-3.432m-9-1.068a3.75 3.75 0 0 1 7.5 0V6h-7.5zm9.75 9a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 3 14.25v-4.5A2.25 2.25 0 0 1 5.25 7.5h7.5A2.25 2.25 0 0 1 15 9.75z" />
      <path d="M9 10.5a.75.75 0 0 0-.75.75v1.5a.75.75 0 1 0 1.5 0v-1.5A.75.75 0 0 0 9 10.5" />
    </g>
    <defs>
      <clipPath id="LockIcon_svg__a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgLockIcon

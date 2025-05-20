import * as React from 'react'
import type { SVGProps } from 'react'
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g clipPath="url(#Search_svg__a)">
      <path
        fill="currentColor"
        d="M17.67 16.084 14.186 12.6a7.878 7.878 0 1 0-1.587 1.587l3.485 3.486a1.122 1.122 0 0 0 1.586-1.586zm-9.762-2.57a5.606 5.606 0 1 1 0-11.212 5.606 5.606 0 0 1 0 11.212"
      />
    </g>
    <defs>
      <clipPath id="Search_svg__a">
        <path fill="currentColor" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgSearch

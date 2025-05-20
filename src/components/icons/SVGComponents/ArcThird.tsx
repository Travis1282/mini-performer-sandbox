import * as React from 'react'
import type { SVGProps } from 'react'
const SvgArcThird = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
    className="arc-third_svg__size-6"
    data-slot="icon"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a9 9 0 0 1 7.794 4.5 9 9 0 0 1 0 9"
    />
  </svg>
)
export default SvgArcThird

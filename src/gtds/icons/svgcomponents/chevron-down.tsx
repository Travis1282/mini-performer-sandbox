import type { SVGProps } from 'react'
import * as React from 'react'
const ChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 12 8"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 2 6 6 2 2"
      stroke={props.color || '#3899F8'}
      strokeLinecap="square"
      strokeWidth={1.5}
    />
  </svg>
)
export default ChevronDown

import type { SVGProps } from 'react'
import * as React from 'react'
const Coupon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.5 0h-6.235c-.412 0-.988.239-1.28.53L.438 9.078a1.504 1.504 0 0 0 0 2.12l6.364 6.365a1.503 1.503 0 0 0 2.12-.001l8.548-8.546c.291-.291.53-.869.53-1.28V1.5c0-.825-.675-1.5-1.5-1.5Zm-3 6a1.5 1.5 0 1 1 0-3.001A1.5 1.5 0 0 1 13.5 6Z"
      fill={props.color || '#000'}
    />
  </svg>
)
export default Coupon

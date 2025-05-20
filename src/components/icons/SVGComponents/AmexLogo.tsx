import * as React from 'react'
import type { SVGProps } from 'react'
const SvgAmexLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 20"
    {...props}
  >
    <mask
      id="AmexLogo_svg__a"
      width={32}
      height={20}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <path fill="#016FD0" d="M0 0h32v20H0z" />
    </mask>
    <g mask="url(#AmexLogo_svg__a)">
      <path
        fill="#016FD0"
        d="M0 1.667C0 .747.819 0 1.829 0H30.17C31.181 0 32 .746 32 1.667v16.666c0 .92-.819 1.667-1.829 1.667H1.83C.819 20 0 19.254 0 18.333z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M5.16 7 2 12.992h3.783l.469-.955h1.072l.469.955h4.164v-.729l.371.73h2.154l.371-.745v.744h8.66l1.053-.93.986.93L30 13l-3.17-2.987L30 7h-4.379l-1.025.913L23.641 7H14.22l-.809 1.547L12.583 7H8.808v.704L8.388 7zm12.932.85h4.973l1.521 1.409 1.57-1.408h1.521l-2.311 2.161 2.311 2.136h-1.59l-1.521-1.424-1.578 1.424h-4.896zm1.228 1.676V8.74h3.103l1.354 1.256-1.414 1.262H19.32V10.4h2.713v-.875zM5.892 7.851h1.844l2.096 4.063V7.851h2.02l1.62 2.913 1.491-2.913h2.01v4.3H15.75l-.01-3.37-1.783 3.37h-1.094L11.07 8.78v3.37H8.554l-.477-.964H5.5l-.476.963H3.676zm.048 2.445.85-1.718.847 1.718z"
        clipRule="evenodd"
      />
    </g>
  </svg>
)
export default SvgAmexLogo

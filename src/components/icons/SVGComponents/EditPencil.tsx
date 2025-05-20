import * as React from 'react'
import type { SVGProps } from 'react'
const SvgEditPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M14.204 7.796 16 6c.545-.545.818-.818.963-1.112a2 2 0 0 0 0-1.776C16.818 2.818 16.545 2.545 16 2c-.546-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964L10.18 3.819a10.9 10.9 0 0 0 4.023 3.977M8.727 5.273l-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.317 1.145l-.615 3.077c-.067.332-.1.498-.005.593.094.095.26.061.593-.005l3.077-.616c.59-.117.884-.176 1.145-.316.262-.14.474-.352.9-.777l6.889-6.89a12.9 12.9 0 0 1-4.02-3.981"
      clipRule="evenodd"
    />
  </svg>
)
export default SvgEditPencil

import type { SVGProps } from 'react'
import * as React from 'react'
const Mobileticket = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.36 16.506c.517 0 .937-.42.937-.938V3.75A3.754 3.754 0 0 0 16.547 0H7.453a3.754 3.754 0 0 0-3.75 3.75v16.5A3.754 3.754 0 0 0 7.453 24h9.094a3.754 3.754 0 0 0 3.75-3.75.937.937 0 1 0-1.875 0 1.877 1.877 0 0 1-1.875 1.875H7.453a1.877 1.877 0 0 1-1.875-1.875V3.75c0-1.034.841-1.875 1.875-1.875h9.094c1.034 0 1.875.841 1.875 1.875v11.818c0 .518.42.938.937.938Z"
      fill={props.fill || '#3899F8'}
    />
    <path
      d="M12 20.678a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.875ZM13.875 4.271a.937.937 0 0 0-.938-.937h-1.874a.937.937 0 1 0 0 1.875h1.874c.518 0 .938-.42.938-.938Z"
      fill={props.fill || '#3899F8'}
    />
  </svg>
)
export default Mobileticket

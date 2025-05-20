import type { SVGProps } from 'react';
import * as React from 'react';
const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={12}
    viewBox="0 0 14 12"
    width={14}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13 5H3l3.29-3.29A1 1 0 1 0 4.88.29L.59 4.59A2 2 0 0 0 0 6a2 2 0 0 0 .59 1.4l4.29 4.3a1 1 0 0 0 1.628-1.096 1 1 0 0 0-.218-.324L3 7h10a1 1 0 1 0 0-2Z"
      fill="#011327"
    />
  </svg>
);
export default ArrowLeft;

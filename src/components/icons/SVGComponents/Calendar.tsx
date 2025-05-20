import * as React from 'react'
import type { SVGProps } from 'react'
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g clipPath="url(#Calendar_svg__a)">
      <path
        fill={props.color ?? '#011327'}
        d="M12.667 1.333H12V.667a.667.667 0 0 0-1.333 0v.666H5.333V.667A.667.667 0 0 0 4 .667v.666h-.667A3.337 3.337 0 0 0 0 4.667v8A3.337 3.337 0 0 0 3.333 16h9.334A3.337 3.337 0 0 0 16 12.667v-8a3.337 3.337 0 0 0-3.333-3.334M3.333 2.667h9.334c1.102 0 2 .897 2 2v.666H1.333v-.666c0-1.103.898-2 2-2m9.334 12H3.333c-1.102 0-2-.898-2-2v-6h13.334v6c0 1.102-.898 2-2 2m-1.736-4.432c0 .252-.176.465-.377.577l-1.043.58.463 1.262a.591.591 0 0 1-.916.67l-1.037-.801-1.038.802a.591.591 0 0 1-.916-.671l.463-1.262-1.043-.58c-.201-.112-.377-.325-.377-.577 0-.214.186-.451.487-.451h1.498l.398-1.522a.555.555 0 0 1 .528-.414.555.555 0 0 1 .528.414l.397 1.522h1.498c.301 0 .487.236.487.45"
      />
    </g>
    <defs>
      <clipPath id="Calendar_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCalendar

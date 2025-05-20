import type { SVGProps } from 'react';
import * as React from 'react';
const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#a)">
      <path
        d="m4.432 12.084-.696 2.598-2.544.054A9.955 9.955 0 0 1 0 9.997a9.95 9.95 0 0 1 1.118-4.599l2.266.416.992 2.251a5.944 5.944 0 0 0-.32 1.932c0 .734.132 1.438.376 2.087Z"
        fill="#FBBB00"
      />
      <path
        d="M19.824 8.133a10.02 10.02 0 0 1-.044 3.956 9.998 9.998 0 0 1-3.52 5.71h-.001l-2.854-.146-.403-2.52a5.96 5.96 0 0 0 2.564-3.044h-5.347V8.133h9.605Z"
        fill="#518EF8"
      />
      <path
        d="M16.26 17.797v.001A9.958 9.958 0 0 1 10 20a9.998 9.998 0 0 1-8.809-5.261l3.241-2.653a5.946 5.946 0 0 0 8.57 3.045l3.257 2.666Z"
        fill="#28B446"
      />
      <path
        d="m16.382 2.302-3.24 2.652a5.948 5.948 0 0 0-8.767 3.114L1.118 5.401A9.998 9.998 0 0 1 9.998 0c2.426 0 4.651.864 6.383 2.302Z"
        fill="#F14336"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path d="M0 0h20v20H0z" fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);
export default GoogleIcon;

import React from 'react'

import { resolveImagePath } from '../../services/images/resolve-image-path'

export default function NotFound() {
  return (
    <div className="h-full-screen flex w-full flex-col items-center justify-center">
      <img
        alt="404 Page not found image"
        className="mb-12 h-[64px] w-[200px] lg:h-[103px] lg:w-[315px]"
        height={103}
        src={resolveImagePath('/img/NotFound404.svg')}
        width={315}
      />
      <h2 className="text-dark h2-sm lg:h2-lg mb-3">
        This Page Doesn&rsquo;t Exist
      </h2>
      <span className="text-dark text-large mb-12 opacity-60">
        It never existed or was deleted. Sorry!
      </span>
    </div>
  )
}

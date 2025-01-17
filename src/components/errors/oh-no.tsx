'use client'

import { Link, useRouteError } from 'react-router'
import { resolveImagePath } from '../../services/images/resolve-image-path'

export function GlobalErrorContent() {
  let error = useRouteError()
  console.error(error)
  return (
    <div className="w-dvh flex h-dvh h-screen w-screen flex-col items-center justify-center">
      <img
        alt="gotickets logo"
        className="my-8 w-80"
        src={resolveImagePath('/img/gotickets-dark.svg')}
      />
      <h2 className="text-dark h2-sm lg:h2-lg mb-3">Oh No!</h2>
      <p className="text-dark text-large mb-12 opacity-60">
        Something went wrong!
      </p>
      <div className="flex flex-col flex-wrap items-center justify-between gap-4">
        <button
          className="rounded bg-go-blue-500 px-4 py-2 font-semibold text-white hover:bg-go-blue-600 active:bg-go-blue-700"
          onClick={() => {
            window?.location.reload()
          }}
        >
          Reload the page
        </button>
        <Link
          aria-label="Go to Home Page"
          className="rounded bg-go-blue-500 px-4 py-2 font-semibold text-white hover:bg-go-blue-600 active:bg-go-blue-700"
          to="/"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  )
}

"use client";

import { Link, useRouteError } from "react-router";
import { resolveImagePath } from "../../services/images/resolve-image-path";

export function GlobalErrorContent() {
  let error = useRouteError();
  console.error(error);
  return (
    <div className="h-screen w-screen h-dvh w-dvh flex flex-col items-center justify-center">
      <img
        alt="gotickets logo"
        className="my-8 w-80"
        src={resolveImagePath("/img/gotickets-dark.svg")}
      />
      <h2 className="mb-3 text-dark h2-sm lg:h2-lg">Oh No!</h2>
      <p className="mb-12 text-dark opacity-60 text-large">
        Something went wrong!
      </p>
      <div className="flex flex-col flex-wrap items-center justify-between gap-4">
        <button
          className="px-4 py-2 rounded bg-go-blue-500 font-semibold text-white hover:bg-go-blue-600 active:bg-go-blue-700"
          onClick={() => {
            window?.location.reload();
          }}
        >
          Reload the page
        </button>
        <Link
          aria-label="Go to Home Page"
          className="px-4 py-2 rounded bg-go-blue-500 font-semibold text-white hover:bg-go-blue-600 active:bg-go-blue-700"
          to="/"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

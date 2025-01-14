import React from "react";
import { resolveImagePath } from "../../services/images/resolve-image-path";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center h-full-screen">
      <img
        alt="404 Page not found image"
        className="mb-12 h-[64px] w-[200px] lg:h-[103px] lg:w-[315px]"
        height={103}
        src={resolveImagePath("/img/NotFound404.svg")}
        width={315}
      />
      <h2 className="mb-3 text-dark h2-sm lg:h2-lg">
        This Page Doesn&rsquo;t Exist
      </h2>
      <span className="mb-12 text-dark opacity-60 text-large">
        It never existed or was deleted. Sorry!
      </span>
    </div>
  );
}

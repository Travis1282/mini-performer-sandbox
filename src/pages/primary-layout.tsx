import { LayoutFooter } from '@/components/layout/Footer';
import { Outlet } from 'react-router';

export function PrimaryLayout() {
  return (
    <main>
      {/* <div className="">
        <div className="bg-go-blue-900 w-full p-4 text-3xl font-bold text-white">GoTickets</div>
        <nav className="scrolling-touch bg-go-blue-200 flex flex-nowrap gap-2 overflow-x-auto p-4 font-semibold">
          <Link className="flex-[0_0_auto] text-blue-600" to="/">
            Home
          </Link>
          <Link className="flex-[0_0_auto] text-blue-600" to="/about">
            About
          </Link>
          <Link className="flex-[0_0_auto] text-blue-600" to="/bruno-mars-tickets">
            Bruno Mars Tickets
          </Link>
          <Link className="flex-[0_0_auto] text-blue-600" to="/bruno-mars">
            Bruno Mars Tickets link - redirect
          </Link>
          <Link className="flex-[0_0_auto] text-blue-600" to="/bruno-mars-404">
            Bruno Mars Tickets link - 404
          </Link>
        </nav>
      </div> */}
      <Outlet />
      <LayoutFooter />
    </main>
  );
}

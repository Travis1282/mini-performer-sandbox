import { Link, Outlet } from "react-router";

export function PrimaryLayout() {
  return (
    <div className="">
      <div className="text-3xl font-bold bg-go-blue-900 text-white w-full p-4">
        GoTickets
      </div>
      <nav className="flex gap-4 bg-go-blue-200 p-4 font-semibold">
        <Link className="text-blue-600" to="/">
          Home
        </Link>
        <Link className="text-blue-600" to="/about">
          About
        </Link>
        <Link className="text-blue-600" to="/bruno-mars-tickets">
          Slug route
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

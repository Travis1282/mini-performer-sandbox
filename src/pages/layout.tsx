import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <main className="flex flex-col gap-4 items-center p-6">
      <div className="text-3xl font-bold bg-green-600 text-white w-full p-4 rounded">
        GoTickets
      </div>
      <Link className="text-blue-600" to="/">
        Home
      </Link>
      <Link className="text-blue-600" to="/about">
        About
      </Link>
      <Link className="text-blue-600" to="/bruno-mars-tickets">
        Slug route
      </Link>
      <Outlet />
    </main>
  );
}

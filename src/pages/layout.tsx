import { Link, Outlet } from "react-router";
import { Button } from "../components/button/button";

export function Layout() {
  return (
    <main className="flex flex-col gap-4 items-center p-6">
      <h1 className="text-3xl font-bold bg-green-600 text-white w-full p-4 rounded">
        Buy tickets online for your fav event!
      </h1>
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

import { Link, Outlet } from 'react-router'

export function PrimaryLayout() {
  return (
    <div className="">
      <div className="w-full bg-go-blue-900 p-4 text-3xl font-bold text-white">
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
          Bruno Mars Tickets
        </Link>
        <Link className="text-blue-600" to="/bruno-mars">
          Bruno Mars Tickets link - redirect
        </Link>
        <Link className="text-blue-600" to="/bruno-mars-404">
          Bruno Mars Tickets link - 404
        </Link>
      </nav>
      <Outlet />
    </div>
  )
}

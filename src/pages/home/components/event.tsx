import React from "react";
import { components } from "../../../services/maverick/generated/maverick-schema";
import dayjs from "dayjs";
import { Link } from "react-router";
import { getEventTicketsPath } from "../../../services/events/get-event-tickets-path";

export function Event({ event }: { event: components["schemas"]["Event"] }) {
  const date = dayjs(event.eventTimeLocal).format("MMM DD").toUpperCase();
  return (
    <div className="flex flex-col gap-2 rounded border p-4 border-gray-300">
      <h3 className="font-bold text-base">{event.name}</h3>
      <p>{date}</p>
      <Link to={getEventTicketsPath(event)} className="self-end">
        View Tickets &#10132;
      </Link>
    </div>
  );
}

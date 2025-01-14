import React from "react";
import { useLoaderData, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getEventListingsWithBotProtection } from "./services/getEventListingsWithBotProtection";
import TicketListItem from "./components/ticket-list-item";
import { components } from "../../services/maverick/generated/maverick-schema";
import { findMasterPerformerFromEvent } from "../../services/events/find-master-performer-from-event";
import { LayoutNavbarTickets } from "./components/layout-navbar-tickets";
import { TicketList } from "./components/ticket-list";

export function Tickets() {
  const { data: loaderData } = useLoaderData<{
    data: components["schemas"]["GetEventMetadataResponse"];
  }>();

  if (!loaderData.event) {
    throw new Error("Event not found");
  }

  const params = useParams<{ eventId: string }>();

  const performer = findMasterPerformerFromEvent(loaderData.event);

  const {
    data: listings,
    status,
    error,
  } = useQuery({
    queryKey: ["event-listings", "get", params.eventId],
    queryFn: () =>
      getEventListingsWithBotProtection({
        params: { path: { "event-id": Number(params.eventId) } },
      }),
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col gap-3 w-full">
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <span className="text-red-600 p-4 text-center border border-red-600">
        Error: {error.message}
      </span>
    );
  }

  if (!loaderData.event) {
    return (
      <span className="text-red-600 p-4 text-center border border-red-600">
        No event
      </span>
    );
  }

  return (
    <main className="flex flex-col w-full h-full">
      <LayoutNavbarTickets
        event={loaderData.event}
        performer={performer?.performer}
      />
      <img
        className="w-full object-cover"
        src="https://place-hold.it/250x250"
      />
      <TicketList listings={listings.data.listings} event={loaderData.event} />
    </main>
  );
}

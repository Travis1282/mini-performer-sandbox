import React from "react";
import { useLoaderData } from "react-router";
import { components } from "../../services/maverick/generated/maverick-schema";
import { Event } from "./components/event";

export default function Home(props: any) {
  const { data, response } = useLoaderData<{
    data: components["schemas"]["Event"][];
    response: any;
  }>();

  return (
    <>
      <title>Gotickets BETA</title>
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Trending events for Chicago</h1>
        {data.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {data.map((event: components["schemas"]["Event"]) => (
              <Event event={event} key={event.id} />
            ))}
          </ul>
        ) : null}
      </section>
    </>
  );
}

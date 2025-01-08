import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import Home from "./pages/home/home";
import Slug from "./pages/slug";
import About from "./pages/about";
import { getEventListings } from "./services/maverick/getEventListings";
import { getEventMetadata } from "./services/maverick/getEventMetadata";
import { getSearchTrendingEvents } from "./services/maverick/getSearchTrendingEvents";

let router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        Component: Home,
        index: true,
        loader: ({ request, params }) =>
          getSearchTrendingEvents({
            init: {
              signal: request.signal,
            },
            params: {
              query: {
                regionId: "1",
              },
            },
          }),
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Slug,
        path: ":slug",
      },
    ],
  },
]);

export default router;

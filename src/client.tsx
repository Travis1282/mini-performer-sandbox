import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";
// Supports weights 200-800
import "@fontsource-variable/plus-jakarta-sans";
// Supports weights 200-800, italic
import "@fontsource-variable/plus-jakarta-sans/wght-italic.css";

import "./style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

console.log({ apiUrl: import.meta.env.VITE_API_URL });

const rootNode = document.getElementById("root");
if (rootNode) {
  try {
    createRoot(rootNode).render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("Error rendering router:", error);
  }
} else {
  console.error("Root node not found");
}

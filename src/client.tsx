import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";

import "./style.css";

console.log(import.meta.env.VITE_API_URL);

const rootNode = document.getElementById("root");
if (rootNode) {
  try {
    createRoot(rootNode).render(<RouterProvider router={router} />);
  } catch (error) {
    console.error("Error rendering router:", error);
  }
} else {
  console.error("Root node not found");
}

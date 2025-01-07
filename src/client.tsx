import { createRoot } from "react-dom/client";
import { Layout } from "./pages/layout";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";

import "./style.css";
import About from "./pages/about";
import Slug from "./pages/slug";

const rootNode = document.getElementById("root");
if (rootNode) {
  createRoot(rootNode).render(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path=":slug" element={<Slug />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
} else {
  console.error("Root node not found");
}

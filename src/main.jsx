import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContextAPI.jsx";
import { AdminProductProvider } from "./context/AdminContex.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProductProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AdminProductProvider>
  </StrictMode>
);

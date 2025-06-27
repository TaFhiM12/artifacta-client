import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Contexts/AuthProvider.jsx";
import { router } from './Routes/Routes';
import { ParallaxProvider } from "react-scroll-parallax";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParallaxProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </ParallaxProvider>
  </StrictMode>
);
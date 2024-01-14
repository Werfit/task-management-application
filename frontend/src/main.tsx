import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app.tsx";
import "./styles/index.css";
import { DashboardProvider } from "./context/dashboard/dashboard.context.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DashboardProvider>
      <RouterProvider router={router} />
    </DashboardProvider>
  </React.StrictMode>,
);

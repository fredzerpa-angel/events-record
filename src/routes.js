import { Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Events } from "./pages/events";
import { Reports } from "./pages/reports";
import { Settings } from "./pages/settings";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: "events",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Events />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: "404",
    element: <NotFound />,
  },
];

import { createBrowserRouter } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { Onboarding } from "./components/Onboarding";
import { Insights } from "./components/Insights";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/insights",
    Component: Insights,
  },
]);

import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LandingPage from "@/pages/LandingPage";
import FormShowcase from "@/pages/FormShowcase";
import DataShowcase from "@/pages/DataShowcase";
import NavigationShowcase from "@/pages/NavigationShowcase";
import FeedbackShowcase from "@/pages/FeedbackShowcase";
import AnalyticsShowcase from "@/pages/AnalyticsShowcase";
import AppLayout from "@/components/layout/AppLayout";

const LoginPage = () => <div className="p-8">Login Page skeleton</div>;
const SuperAdminPage = () => <div className="p-8">Super Admin Dashboard skeleton</div>;
const SocietyAdminPage = () => <div className="p-8">Society Admin Dashboard skeleton</div>;
const ResidentPage = () => <div className="p-8">Resident Dashboard skeleton</div>;
const SecurityPage = () => <div className="p-8">Security Dashboard skeleton</div>;
const StaffPage = () => <div className="p-8">Staff Dashboard skeleton</div>;
const UnauthorizedPage = () => <div className="p-8">401 Unauthorized</div>;
const NotFoundPage = () => <div className="p-8">404 Not Found</div>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "forms",
        element: <FormShowcase />,
      },
      {
        path: "data-display",
        element: <DataShowcase />,
      },
      {
        path: "feedback",
        element: <FeedbackShowcase />,
      },
      {
        path: "analytics",
        element: <AnalyticsShowcase />,
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <NavigationShowcase />,
      },
      {
        path: "*",
        element: <NavigationShowcase />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "super-admin",
        element: <SuperAdminPage />,
      },
      {
        path: "society-admin",
        element: <SocietyAdminPage />,
      },
      {
        path: "resident",
        element: <ResidentPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
      {
        path: "staff",
        element: <StaffPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

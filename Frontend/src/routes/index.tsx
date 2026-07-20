import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

// Placeholder pages for skeletons
const LandingPage = () => <div className="p-8">Landing Page skeleton</div>;
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
        path: "unauthorized",
        element: <UnauthorizedPage />,
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

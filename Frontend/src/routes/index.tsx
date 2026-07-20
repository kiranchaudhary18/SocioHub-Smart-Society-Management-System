import { createBrowserRouter, Outlet } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import BlankLayout from "@/layouts/BlankLayout";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout";

import LandingPage from "@/pages/LandingPage";
import FormShowcase from "@/pages/FormShowcase";
import DataShowcase from "@/pages/DataShowcase";
import NavigationShowcase from "@/pages/NavigationShowcase";
import FeedbackShowcase from "@/pages/FeedbackShowcase";
import AnalyticsShowcase from "@/pages/AnalyticsShowcase";
import ForbiddenPage from "@/pages/ForbiddenPage";
import MaintenancePage from "@/pages/MaintenancePage";

import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/signup/pages/SignupPage";
import PasswordRecoveryPage from "@/features/password/pages/PasswordRecoveryPage";
import VerificationPage from "@/features/verification/pages/VerificationPage";

import { SessionProvider } from "@/contexts/SessionContext";
import { ProtectedRoute } from "@/core/guards/ProtectedRoute";
import { GuestRoute } from "@/core/guards/GuestRoute";
import { RoleRoute } from "@/core/guards/RoleRoute";
import { Role } from "@/types/auth";

// Temporary Skeletons
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
    element: (
      <SessionProvider>
        <Outlet />
      </SessionProvider>
    ),
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { path: "/", element: <LandingPage /> },
          { path: "forms", element: <FormShowcase /> },
          { path: "data-display", element: <DataShowcase /> },
          { path: "feedback", element: <FeedbackShowcase /> },
          { path: "analytics", element: <AnalyticsShowcase /> },
          { path: "unauthorized", element: <UnauthorizedPage /> },
          { path: "403", element: <ForbiddenPage /> },
          { path: "maintenance", element: <MaintenancePage /> },
        ],
      },
      
      // Guest Routes (Login, Signup, Forgot Password)
      {
        path: "/auth",
        element: (
          <GuestRoute>
            <BlankLayout />
          </GuestRoute>
        ),
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "recovery", element: <PasswordRecoveryPage /> },
          { path: "verify", element: <VerificationPage /> },
        ],
      },
      
      // Application Shell (Requires Authentication)
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <AuthenticatedLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "app", element: <NavigationShowcase /> },
          
          // Role Based Dashboards
          {
            path: "super-admin",
            element: <RoleRoute requiredRole={Role.SUPER_ADMIN} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <SuperAdminPage /> },
            ]
          },
          {
            path: "admin",
            element: <RoleRoute requiredRole={Role.SOCIETY_ADMIN} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <SocietyAdminPage /> },
            ]
          },
          {
            path: "resident",
            element: <RoleRoute requiredRole={Role.RESIDENT} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <ResidentPage /> },
            ]
          },
          {
            path: "security",
            element: <RoleRoute requiredRole={Role.SECURITY} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <SecurityPage /> },
            ]
          },
          {
            path: "staff",
            element: <RoleRoute requiredRole={Role.STAFF} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <StaffPage /> },
            ]
          },
        ],
      },
      
      { path: "*", element: <NotFoundPage /> },
    ]
  }
]);

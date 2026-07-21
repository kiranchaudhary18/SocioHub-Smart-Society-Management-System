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
import { RoleRoute } from "@/core/guards/RoleRoute";
import { Role } from "@/types/auth";

// Super Admin Dashboards
import { DashboardLayout } from "@/features/super-admin/components/layout/DashboardLayout";
import SuperAdminDashboard from "@/features/super-admin/pages/SuperAdminDashboard";
import PendingApprovalsPage from "@/features/super-admin/pages/PendingApprovalsPage";
import AllSocietiesPage from "@/features/super-admin/pages/AllSocietiesPage";
import SocietyDetailsPage from "@/features/super-admin/pages/SocietyDetailsPage";
import CreateSocietyPage from "@/features/super-admin/pages/CreateSocietyPage";
import SocietyAdminsPage from "@/features/super-admin/pages/SocietyAdminsPage";
import PlatformUsersPage from "@/features/super-admin/pages/PlatformUsersPage";
import AnalyticsPage from "@/features/super-admin/pages/AnalyticsPage";
import AnnouncementsPage from "@/features/super-admin/pages/AnnouncementsPage";
import SupportCenterPage from "@/features/super-admin/pages/SupportCenterPage";
import AuditLogsPage from "@/features/super-admin/pages/AuditLogsPage";
import RolesPermissionsPage from "@/features/super-admin/pages/RolesPermissionsPage";
import CMSPage from "@/features/super-admin/pages/CMSPage";
import SettingsPage from "@/features/super-admin/pages/SettingsPage";
import ProfilePage from "@/features/super-admin/pages/ProfilePage";

import SocietyAdminLayout from "@/features/society-admin/components/layout/SocietyAdminLayout";
import { PlaceholderPage } from "@/features/society-admin/pages/PlaceholderPage";

// Society Admin Pages
import DashboardPage from "@/features/society-admin/pages/dashboard/DashboardPage";
import BuildingsPage from "@/features/society-admin/pages/buildings/BuildingsPage";
import BuildingDetailsPage from "@/features/society-admin/pages/buildings/BuildingDetailsPage";
import FlatsPage from "@/features/society-admin/pages/flats/FlatsPage";
import FlatDetailsPage from "@/features/society-admin/pages/flats/FlatDetailsPage";
import AmenitiesPage from "@/features/society-admin/pages/amenities/AmenitiesPage";
import ParkingPage from "@/features/society-admin/pages/parking/ParkingPage";
import ResidentsPage from "@/features/society-admin/pages/residents/ResidentsPage";
import ResidentDetailsPage from "@/features/society-admin/pages/residents/ResidentDetailsPage";
import ResidentApprovalsPage from "@/features/society-admin/pages/residents/ResidentApprovalsPage";

import VisitorsPage from "@/features/society-admin/pages/visitors/VisitorsPage";
import VisitorDetailsPage from "@/features/society-admin/pages/visitors/VisitorDetailsPage";
import VisitorPassesPage from "@/features/society-admin/pages/visitors/VisitorPassesPage";

import ComplaintsPage from "@/features/society-admin/pages/complaints/ComplaintsPage";
import ComplaintDetailsPage from "@/features/society-admin/pages/complaints/ComplaintDetailsPage";
import SocietyAdminMaintenancePage from "@/features/society-admin/pages/maintenance/MaintenancePage";
import InvoiceDetailsPage from "@/features/society-admin/pages/maintenance/InvoiceDetailsPage";
import UtilityBillsPage from "@/features/society-admin/pages/utility/UtilityBillsPage";

// Temporary Skeletons
const ResidentPage = () => <div className="p-8">Resident Dashboard skeleton</div>;
import StaffPage from "@/features/society-admin/pages/staff/StaffPage";
import StaffDetailsPage from "@/features/society-admin/pages/staff/StaffDetailsPage";
import SecurityGuardsPage from "@/features/society-admin/pages/security/SecurityGuardsPage";
import SecurityGuardDetailsPage from "@/features/society-admin/pages/security/SecurityGuardDetailsPage";
import AttendancePage from "@/features/society-admin/pages/attendance/AttendancePage";

import NoticesPage from "@/features/society-admin/pages/notices/NoticesPage";
import NoticeDetailsPage from "@/features/society-admin/pages/notices/NoticeDetailsPage";
import EventsPage from "@/features/society-admin/pages/events/EventsPage";
import EventDetailsPage from "@/features/society-admin/pages/events/EventDetailsPage";
import DocumentsPage from "@/features/society-admin/pages/documents/DocumentsPage";
import PollsPage from "@/features/society-admin/pages/polls/PollsPage";
import ReportsPage from "@/features/society-admin/pages/reports/ReportsPage";
import SocietySettingsPage from "@/features/society-admin/pages/settings/SettingsPage";
import SocietyProfilePage from "@/features/society-admin/pages/settings/ProfilePage";

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
          <BlankLayout />
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
              { path: "", element: <PlaceholderPage title="Security" /> },
            ]
          },
          {
            path: "staff",
            element: <RoleRoute requiredRole={Role.STAFF} exact><Outlet /></RoleRoute>,
            children: [
              { path: "", element: <PlaceholderPage title="Staff" /> },
            ]
          },
        ],
      },
      
      // Society Admin Shell (Custom Aurora Dashboard Layout)
      {
        path: "/admin",
        element: (
          <ProtectedRoute>
            <RoleRoute requiredRole={Role.SOCIETY_ADMIN}>
              <SocietyAdminLayout />
            </RoleRoute>
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          
          // Society
          { path: "buildings", element: <BuildingsPage /> },
          { path: "buildings/:buildingId", element: <BuildingDetailsPage /> },
          { path: "flats", element: <FlatsPage /> },
          { path: "flats/:flatId", element: <FlatDetailsPage /> },
          { path: "amenities", element: <AmenitiesPage /> },
          { path: "parking", element: <ParkingPage /> },
          
          { path: "residents", element: <ResidentsPage /> },
          { path: "residents/:residentId", element: <ResidentDetailsPage /> },
          { path: "resident-approvals", element: <ResidentApprovalsPage /> },
          
          // Visitors
          { path: "visitors", element: <VisitorsPage /> },
          { path: "visitors/:visitorId", element: <VisitorDetailsPage /> },
          { path: "visitor-passes", element: <VisitorPassesPage /> },
          
          // Operations
          { path: "complaints", element: <ComplaintsPage /> },
          { path: "complaints/:complaintId", element: <ComplaintDetailsPage /> },
          { path: "maintenance", element: <SocietyAdminMaintenancePage /> },
          { path: "maintenance/invoices/:invoiceId", element: <InvoiceDetailsPage /> },
          { path: "utility-bills", element: <UtilityBillsPage /> },
          
          // Workforce
          { path: "staff", element: <StaffPage /> },
          { path: "staff/:staffId", element: <StaffDetailsPage /> },
          { path: "security", element: <SecurityGuardsPage /> },
          { path: "security/:guardId", element: <SecurityGuardDetailsPage /> },
          { path: "attendance", element: <AttendancePage /> },
          
          // Communication
          { path: "notices", element: <NoticesPage /> },
          { path: "notices/:noticeId", element: <NoticeDetailsPage /> },
          { path: "events", element: <EventsPage /> },
          { path: "events/:eventId", element: <EventDetailsPage /> },
          { path: "documents", element: <DocumentsPage /> },
          { path: "polls", element: <PollsPage /> },
          
          // Reports
          { path: "reports", element: <ReportsPage /> },
          
          // Settings
          { path: "settings", element: <SocietySettingsPage /> },
          { path: "profile", element: <SocietyProfilePage /> },
        ]
      },
      
      // Super Admin Shell (Custom Aurora Dashboard Layout)
      {
        path: "/super-admin",
        element: (
          <ProtectedRoute>
            <RoleRoute requiredRole={Role.SUPER_ADMIN} exact>
              <DashboardLayout />
            </RoleRoute>
          </ProtectedRoute>
        ),
        children: [
          { path: "", element: <SuperAdminDashboard /> },
          { path: "approvals", element: <PendingApprovalsPage /> },
          { path: "societies", element: <AllSocietiesPage /> },
          { path: "societies/create", element: <CreateSocietyPage /> },
          { path: "societies/:id", element: <SocietyDetailsPage /> },
          { path: "society-admins", element: <SocietyAdminsPage /> },
          { path: "users", element: <PlatformUsersPage /> },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "announcements", element: <AnnouncementsPage /> },
          { path: "support", element: <SupportCenterPage /> },
          { path: "audit-logs", element: <AuditLogsPage /> },
          { path: "roles", element: <RolesPermissionsPage /> },
          { path: "cms", element: <CMSPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
      

      
      { path: "*", element: <NotFoundPage /> },
    ]
  }
]);

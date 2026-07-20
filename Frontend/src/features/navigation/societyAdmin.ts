import {
  LayoutDashboard,
  Building,
  Users,
  Home,
  AlertCircle,
  CreditCard,
  Car,
  Settings,
  ShieldCheck,
  Megaphone
} from "lucide-react"
import type { NavigationConfig } from "./types"

export const societyAdminNavigation: NavigationConfig = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      }
    ]
  },
  {
    title: "Operations",
    items: [
      {
        title: "Buildings & Flats",
        href: "/admin/buildings",
        icon: Building,
      },
      {
        title: "Residents",
        href: "/admin/residents",
        icon: Users,
      },
      {
        title: "Staff Management",
        href: "/admin/staff",
        icon: ShieldCheck,
      },
      {
        title: "Amenities",
        href: "/admin/amenities",
        icon: Home,
      },
      {
        title: "Parking",
        href: "/admin/parking",
        icon: Car,
      }
    ]
  },
  {
    title: "Engagement",
    items: [
      {
        title: "Notice Board",
        href: "/admin/notices",
        icon: Megaphone,
      },
      {
        title: "Complaints",
        href: "/admin/complaints",
        icon: AlertCircle,
        badge: "3 Pending"
      },
      {
        title: "Billing & Payments",
        href: "/admin/billing",
        icon: CreditCard,
      }
    ]
  },
  {
    title: "Configuration",
    items: [
      {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
      }
    ]
  }
]

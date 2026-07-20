import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  Shield,
  Activity,
  CreditCard,
  FileText
} from "lucide-react"
import type { NavigationConfig } from "./types"

export const superAdminNavigation: NavigationConfig = [
  {
    items: [
      {
        title: "Overview",
        href: "/super-admin",
        icon: LayoutDashboard,
      }
    ]
  },
  {
    title: "Platform Management",
    items: [
      {
        title: "Societies",
        href: "/super-admin/societies",
        icon: Building2,
        badge: "New"
      },
      {
        title: "Global Users",
        href: "/super-admin/users",
        icon: Users,
      },
      {
        title: "Platform Subscriptions",
        href: "/super-admin/billing",
        icon: CreditCard,
      }
    ]
  },
  {
    title: "System",
    items: [
      {
        title: "Audit Logs",
        href: "/super-admin/logs",
        icon: Activity,
      },
      {
        title: "Global Reports",
        href: "/super-admin/reports",
        icon: FileText,
      },
      {
        title: "Security Settings",
        href: "/super-admin/security",
        icon: Shield,
      },
      {
        title: "Settings",
        href: "/super-admin/settings",
        icon: Settings,
      }
    ]
  }
]

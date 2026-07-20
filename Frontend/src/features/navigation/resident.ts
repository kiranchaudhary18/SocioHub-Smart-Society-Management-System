import {
  Home,
  CreditCard,
  AlertTriangle,
  Megaphone,
  Users,
  Calendar,
  Settings
} from "lucide-react"
import type { NavigationConfig } from "./types"

export const residentNavigation: NavigationConfig = [
  {
    items: [
      {
        title: "My Home",
        href: "/resident",
        icon: Home,
      }
    ]
  },
  {
    title: "Services",
    items: [
      {
        title: "Payments",
        href: "/resident/payments",
        icon: CreditCard,
        badge: "Due"
      },
      {
        title: "Complaints",
        href: "/resident/complaints",
        icon: AlertTriangle,
      },
      {
        title: "Amenities Booking",
        href: "/resident/amenities",
        icon: Calendar,
      }
    ]
  },
  {
    title: "Community",
    items: [
      {
        title: "Notice Board",
        href: "/resident/notices",
        icon: Megaphone,
      },
      {
        title: "Family Members",
        href: "/resident/family",
        icon: Users,
      },
      {
        title: "Profile & Settings",
        href: "/resident/settings",
        icon: Settings,
      }
    ]
  }
]

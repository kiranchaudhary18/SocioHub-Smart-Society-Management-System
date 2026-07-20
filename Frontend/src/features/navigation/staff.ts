import {
  Briefcase,
  CheckSquare,
  AlertCircle,
  CalendarDays
} from "lucide-react"
import type { NavigationConfig } from "./types"

export const staffNavigation: NavigationConfig = [
  {
    items: [
      {
        title: "My Tasks",
        href: "/staff",
        icon: Briefcase,
      }
    ]
  },
  {
    title: "Operations",
    items: [
      {
        title: "Assigned Complaints",
        href: "/staff/complaints",
        icon: AlertCircle,
        badge: "1 New"
      },
      {
        title: "Maintenance Log",
        href: "/staff/maintenance",
        icon: CheckSquare,
      },
      {
        title: "Schedule",
        href: "/staff/schedule",
        icon: CalendarDays,
      }
    ]
  }
]

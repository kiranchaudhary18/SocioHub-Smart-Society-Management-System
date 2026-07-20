import {
  ShieldAlert,
  UserPlus,
  CarFront,
  Camera,
  History
} from "lucide-react"
import type { NavigationConfig } from "./types"

export const securityNavigation: NavigationConfig = [
  {
    items: [
      {
        title: "Gate Check-in",
        href: "/security",
        icon: ShieldAlert,
      }
    ]
  },
  {
    title: "Logs",
    items: [
      {
        title: "Visitors",
        href: "/security/visitors",
        icon: UserPlus,
      },
      {
        title: "Vehicles",
        href: "/security/vehicles",
        icon: CarFront,
      },
      {
        title: "Patrol History",
        href: "/security/patrol",
        icon: History,
      },
      {
        title: "CCTV Feeds",
        href: "/security/cameras",
        icon: Camera,
      }
    ]
  }
]

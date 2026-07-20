import type { LucideIcon } from "lucide-react"

export interface NavItemType {
  title: string
  href?: string
  icon?: LucideIcon
  disabled?: boolean
  external?: boolean
  badge?: string
  children?: NavItemType[]
}

export interface NavSection {
  title?: string
  items: NavItemType[]
}

export type NavigationConfig = NavSection[]

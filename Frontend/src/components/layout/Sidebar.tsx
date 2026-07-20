
import { motion } from "framer-motion"
import { LayoutDashboard, Users, Building, Shield, AlertTriangle, CreditCard, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavItem } from "./NavItem"

export interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  className?: string
}

export function Sidebar({ isCollapsed, setIsCollapsed, className }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 280,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex flex-col h-screen glass-strong border-r border-border shrink-0 z-40 transition-shadow duration-300",
        className
      )}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-mint to-aurora-aqua flex items-center justify-center shrink-0 shadow-glow">
            <span className="text-foreground font-bold font-heading text-lg leading-none">S</span>
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-heading font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              SocioHub
            </motion.span>
          )}
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 custom-scrollbar flex flex-col gap-1">
        
        <div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2 px-3">
          {!isCollapsed ? "Main Menu" : "•••"}
        </div>

        <NavItem 
          label="Dashboard" 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          href="/dashboard"
          isSidebarCollapsed={isCollapsed}
          active
        />
        
        <NavItem 
          label="Residents" 
          icon={<Users className="w-5 h-5" />} 
          href="/residents"
          isSidebarCollapsed={isCollapsed}
        />
        
        <NavItem 
          label="Facilities" 
          icon={<Building className="w-5 h-5" />} 
          isSidebarCollapsed={isCollapsed}
        >
          <NavItem label="Buildings" href="/buildings" isSidebarCollapsed={isCollapsed} />
          <NavItem label="Flats" href="/flats" isSidebarCollapsed={isCollapsed} />
          <NavItem label="Amenities" href="/amenities" isSidebarCollapsed={isCollapsed} />
        </NavItem>

        <NavItem 
          label="Security" 
          icon={<Shield className="w-5 h-5" />} 
          href="/security"
          badge={3}
          isSidebarCollapsed={isCollapsed}
        />

        <div className="mt-6 mb-2 px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
          {!isCollapsed ? "Operations" : "•••"}
        </div>

        <NavItem 
          label="Complaints" 
          icon={<AlertTriangle className="w-5 h-5" />} 
          href="/complaints"
          badge={12}
          isSidebarCollapsed={isCollapsed}
        />

        <NavItem 
          label="Payments" 
          icon={<CreditCard className="w-5 h-5" />} 
          href="/payments"
          isSidebarCollapsed={isCollapsed}
        />

      </div>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-border/50">
        <NavItem 
          label="Settings" 
          icon={<Settings className="w-5 h-5" />} 
          href="/settings"
          isSidebarCollapsed={isCollapsed}
        />
      </div>

      {/* Collapse Toggle Button (Desktop) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all z-50 hidden md:flex"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

    </motion.aside>
  )
}

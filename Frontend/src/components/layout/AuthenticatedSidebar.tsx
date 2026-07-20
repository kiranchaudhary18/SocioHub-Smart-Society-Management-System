import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getNavigationForRole } from "@/features/navigation"
import { useSession } from "@/hooks/useSession"
import { NavItem } from "./NavItem"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function AuthenticatedSidebar() {
  const { user } = useSession()
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!user) return null

  const config = getNavigationForRole(user.role)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "relative flex flex-col h-screen glass-strong border-r border-border shrink-0 z-40 transition-shadow duration-300"
      )}
    >
      {/* Brand */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aurora-mint to-aurora-aqua flex items-center justify-center shrink-0 shadow-glow">
            <span className="text-foreground font-bold font-heading text-lg leading-none">S</span>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-heading font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
              >
                SocioHub
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 custom-scrollbar flex flex-col gap-6">
        {config.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {section.title && (
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                {!isCollapsed ? section.title : "•••"}
              </div>
            )}
            {section.items.map((item, itemIdx) => (
              <NavItem 
                key={itemIdx}
                label={item.title} 
                icon={item.icon && <item.icon className="w-5 h-5" />} 
                href={item.href || "#"}
                badge={item.badge}
                isSidebarCollapsed={isCollapsed}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-background border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:shadow-md transition-all z-50 hidden md:flex"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
      
    </motion.aside>
  )
}

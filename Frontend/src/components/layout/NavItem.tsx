import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItemProps {
  label: string
  icon?: React.ReactNode
  href?: string
  badge?: number | string
  active?: boolean
  expanded?: boolean
  children?: React.ReactNode
  onClick?: () => void
  isSidebarCollapsed?: boolean
}

export function NavItem({
  label,
  icon,
  href,
  badge,
  active,
  expanded = false,
  children,
  onClick,
  isSidebarCollapsed = false,
}: NavItemProps) {
  const [isOpen, setIsOpen] = React.useState(expanded)
  const location = useLocation()
  
  // Auto-expand if a child is active
  const isChildActive = React.useMemo(() => {
    if (!children || !href) return false
    return location.pathname.startsWith(href)
  }, [location.pathname, href, children])

  React.useEffect(() => {
    if (isChildActive) setIsOpen(true)
  }, [isChildActive])

  // If no href, it's a folder/group
  const isFolder = !!children
  
  // Determine if currently active
  const isActive = active !== undefined ? active : (href && location.pathname === href) || (isFolder && isChildActive)

  const content = (
    <>
      {/* Animated active background */}
      {isActive && !isSidebarCollapsed && (
        <motion.div
          layoutId="activeNavBackground"
          className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20 pointer-events-none"
          initial={false}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      
      {/* Icon Area */}
      {icon && (
        <div className={cn(
          "relative flex items-center justify-center min-w-[24px] h-[24px] transition-colors duration-200 z-10",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}>
          {icon}
          
          {/* Minimized Active Indicator (when sidebar collapsed) */}
          {isActive && isSidebarCollapsed && (
            <motion.div
              layoutId="collapsedActiveIndicator"
              className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full"
              initial={false}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
        </div>
      )}

      {/* Label and Badge Area (Hidden when collapsed) */}
      <AnimatePresence initial={false}>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex flex-1 items-center justify-between overflow-hidden whitespace-nowrap z-10"
          >
            <span className={cn(
              "ml-3 text-sm font-medium transition-colors duration-200",
              isActive ? "text-primary-700 dark:text-primary-300" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {label}
            </span>

            <div className="flex items-center ml-2">
              {badge && (
                <span className="flex items-center justify-center px-2 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full">
                  {badge}
                </span>
              )}
              {isFolder && (
                <ChevronDown
                  className={cn(
                    "ml-2 h-4 w-4 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180"
                  )}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  const handleClick = (e: React.MouseEvent) => {
    if (isFolder) {
      e.preventDefault()
      setIsOpen(!isOpen)
    }
    onClick?.()
  }

  const wrapperClasses = cn(
    "relative flex items-center w-full px-3 py-2.5 rounded-xl cursor-pointer group transition-colors duration-200",
    !isActive && "hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50",
    isSidebarCollapsed && "justify-center px-0"
  )

  return (
    <div className="flex flex-col w-full">
      {href && !isFolder ? (
        <NavLink to={href} className={wrapperClasses} onClick={handleClick}>
          {content}
        </NavLink>
      ) : (
        <div className={wrapperClasses} onClick={handleClick}>
          {content}
        </div>
      )}

      {/* Nested Children */}
      <AnimatePresence initial={false}>
        {isFolder && isOpen && !isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-1 pb-1 pl-[22px] ml-4 border-l border-neutral-200 dark:border-neutral-800 space-y-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

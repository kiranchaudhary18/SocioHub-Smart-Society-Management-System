import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Building,
  Shield,
  Settings,
  Menu,
  Bell,
  Search,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users, label: "Residents", href: "/dashboard/resident" },
  { icon: Building, label: "Society Admin", href: "/dashboard/society-admin" },
  { icon: Shield, label: "Security", href: "/dashboard/security" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex text-foreground">
      {/* Floating Sidebar */}
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "sticky top-4 left-4 h-[calc(100vh-32px)] rounded-[24px] bg-card shadow-soft border border-border/40 m-4 flex flex-col z-40 overflow-hidden"
        )}
      >
        <div className="p-6 flex items-center justify-between h-20">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-heading font-bold text-xl text-gradient-primary whitespace-nowrap"
            >
              ResiCore
            </motion.span>
          )}
          {isCollapsed && (
            <span className="font-heading font-bold text-xl text-gradient-primary mx-auto">
              SH
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== "/dashboard");
            
            return (
              <Link
                key={item.label}
                to={item.href}
                className="relative flex items-center p-3 rounded-[14px] group transition-all duration-200"
              >
                {/* Active Indicator / Hover bg */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-primary/10 rounded-[14px]"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-muted/50 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                <div className="relative z-10 flex items-center w-full">
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "ml-3 text-sm font-medium whitespace-nowrap",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/40">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-[14px] hover:bg-muted/50 transition-colors text-muted-foreground"
          >
            <ChevronLeft
              className={cn("w-5 h-5 transition-transform duration-300", isCollapsed && "rotate-180")}
            />
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Sticky Glass Navbar */}
        <header className="sticky top-0 z-30 h-20 px-8 flex items-center justify-between bg-background/60 backdrop-blur-md border-b border-border/40">
          
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden text-muted-foreground hover:text-foreground">
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Beautiful Search */}
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full h-10 pl-10 pr-4 rounded-[14px] bg-card border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Placeholder */}
            <button className="relative p-2 rounded-[14px] hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
            </button>

            {/* Profile Dropdown Placeholder */}
            <div className="flex items-center gap-3 pl-4 border-l border-border/40 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-primary p-[2px]">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-sm font-bold text-foreground">
                  JD
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Building2, Users, UserSquare2, 
  AlertTriangle, Briefcase, Megaphone, BarChart3, Settings,
  ChevronLeft, ChevronRight, ChevronDown
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSession } from "@/hooks/useSession";

const NAV_ITEMS = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
    accentColor: "#72F1D1",
  },
  {
    name: "Society",
    icon: Building2,
    accentColor: "#3DD9FF",
    subItems: [
      { name: "Buildings", path: "/admin/buildings" },
      { name: "Flats", path: "/admin/flats" },
      { name: "Amenities", path: "/admin/amenities" },
      { name: "Parking", path: "/admin/parking" },
    ]
  },
  {
    name: "Residents",
    icon: Users,
    accentColor: "#8F7CFF",
    subItems: [
      { name: "All Residents", path: "/admin/residents" },
      { name: "Approval Requests", path: "/admin/resident-approvals" },
    ]
  },
  {
    name: "Visitors",
    icon: UserSquare2,
    accentColor: "#FFD166",
    subItems: [
      { name: "Visitor Management", path: "/admin/visitors" },
      { name: "Visitor Passes", path: "/admin/visitor-passes" },
    ]
  },
  {
    name: "Operations",
    icon: AlertTriangle,
    accentColor: "#FF7A7A",
    subItems: [
      { name: "Complaints", path: "/admin/complaints" },
      { name: "Maintenance", path: "/admin/maintenance" },
      { name: "Utility Bills", path: "/admin/utility-bills" },
    ]
  },
  {
    name: "Workforce",
    icon: Briefcase,
    accentColor: "#8BF178",
    subItems: [
      { name: "Staff", path: "/admin/staff" },
      { name: "Security Guards", path: "/admin/security" },
      { name: "Attendance", path: "/admin/attendance" },
    ]
  },
  {
    name: "Communication",
    icon: Megaphone,
    accentColor: "#FF5DA2",
    subItems: [
      { name: "Notices", path: "/admin/notices" },
      { name: "Events", path: "/admin/events" },
      { name: "Documents", path: "/admin/documents" },
      { name: "Polls & Surveys", path: "/admin/polls" },
    ]
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
    accentColor: "#38BDF8",
  },
  {
    name: "Settings",
    icon: Settings,
    accentColor: "#64748B",
    subItems: [
      { name: "Society Settings", path: "/admin/settings" },
      { name: "Profile", path: "/admin/profile" },
    ]
  }
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const { logout } = useSession();

  // Auto-expand group if a child route is active
  useEffect(() => {
    const currentPath = location.pathname;
    const newExpanded = { ...expandedGroups };
    let changed = false;

    NAV_ITEMS.forEach(item => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some(sub => currentPath.startsWith(sub.path));
        if (hasActiveChild && !expandedGroups[item.name]) {
          newExpanded[item.name] = true;
          changed = true;
        }
      }
    });

    if (changed) {
      setExpandedGroups(newExpanded);
    }
  }, [location.pathname]);

  const toggleGroup = (name: string) => {
    if (collapsed) setCollapsed(false);
    setExpandedGroups(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
      className="h-[calc(100vh-32px)] my-4 ml-4 shrink-0 bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col relative z-50 overflow-hidden"
    >
      {/* Logo Section */}
      <div className="h-24 flex items-center px-6 border-b border-white/40 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#72F1D1] to-[#3DD9FF] flex items-center justify-center shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-transform">
          <span className="text-white font-heading font-black text-xl">S</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-4 flex flex-col"
            >
              <span className="font-heading font-black text-xl text-slate-800 tracking-tight whitespace-nowrap leading-tight">
                SocioHub
              </span>
              <span className="text-[10px] font-bold text-[#72F1D1] uppercase tracking-widest leading-tight">
                Society Admin
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-8 right-[-14px] w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-[#72F1D1] hover:scale-110 transition-all z-10 hidden lg:flex"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 px-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const isGroupActive = item.subItems?.some(sub => location.pathname.startsWith(sub.path));
          const isExactActive = item.path === location.pathname;
          const isActive = isExactActive || isGroupActive;
          const isExpanded = expandedGroups[item.name];

          return (
            <div key={item.name} className="flex flex-col">
              {item.path ? (
                <Link 
                  to={item.path}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300",
                    isActive 
                      ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-bold" 
                      : "hover:bg-white/50 text-slate-500 hover:text-slate-800 font-medium"
                  )}
                  style={isActive ? { color: item.accentColor } : {}}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator-society"
                      className="absolute left-0 w-1.5 h-6 rounded-r-full shadow-sm"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  )}
                  <item.icon 
                    className="w-5 h-5 shrink-0 transition-all duration-300" 
                    style={isActive ? { color: item.accentColor, filter: `drop-shadow(0 0 6px ${item.accentColor}60)` } : {}}
                  />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              ) : (
                <button 
                  onClick={() => toggleGroup(item.name)}
                  className={cn(
                    "group relative flex items-center justify-between px-3 py-3 rounded-2xl transition-all duration-300 w-full text-left",
                    isActive 
                      ? "bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] font-bold" 
                      : "hover:bg-white/50 text-slate-500 hover:text-slate-800 font-medium"
                  )}
                  style={isActive ? { color: item.accentColor } : {}}
                >
                  <div className="flex items-center gap-3">
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator-society"
                        className="absolute left-0 w-1.5 h-6 rounded-r-full shadow-sm"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    )}
                    <item.icon 
                      className="w-5 h-5 shrink-0 transition-all duration-300" 
                      style={isActive ? { color: item.accentColor, filter: `drop-shadow(0 0 6px ${item.accentColor}60)` } : {}}
                    />
                    <AnimatePresence mode="wait">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {!collapsed && (
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 opacity-50", isExpanded && "rotate-180")} />
                  )}
                </button>
              )}

              {/* Sub Items (Dropdown) */}
              <AnimatePresence>
                {isExpanded && !collapsed && item.subItems && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 mt-1 ml-11 relative before:content-[''] before:absolute before:left-[-15px] before:top-0 before:bottom-4 before:w-px before:bg-slate-200">
                      {item.subItems.map((sub) => {
                        const isSubActive = location.pathname.startsWith(sub.path);
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className={cn(
                              "text-sm px-3 py-2 rounded-xl transition-all duration-300 font-medium relative before:content-[''] before:absolute before:left-[-15px] before:top-1/2 before:w-3 before:h-px",
                              isSubActive 
                                ? "bg-white text-slate-800 shadow-sm before:bg-slate-300" 
                                : "text-slate-500 hover:text-slate-800 hover:bg-white/40 before:bg-slate-200"
                            )}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/40 bg-white/30 backdrop-blur-xl">
        <button 
          onClick={logout}
          className="group relative flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 w-full hover:bg-[#FF7A7A]/10 text-slate-500 hover:text-[#FF7A7A] font-bold"
        >
          <LayoutDashboard className="w-5 h-5 shrink-0 opacity-0 absolute" /> {/* Spacer trick */}
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.aside>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, Building2, UserCog, 
  BarChart3, Megaphone, HelpCircle, 
  FileText, ShieldCheck, Database, Settings, 
  ChevronLeft, ChevronRight 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { group: "Platform", items: [
    { name: "Dashboard", icon: LayoutDashboard, path: "/super-admin" },
    { name: "Pending Approvals", icon: ShieldCheck, path: "/super-admin/approvals" },
    { name: "Societies", icon: Building2, path: "/super-admin/societies" },
    { name: "Society Admins", icon: UserCog, path: "/super-admin/society-admins" },
    { name: "Platform Users", icon: Users, path: "/super-admin/users" },
  ]},
  { group: "Business", items: [
    { name: "Analytics & Reports", icon: BarChart3, path: "/super-admin/analytics" },
    { name: "Announcements", icon: Megaphone, path: "/super-admin/announcements" },
  ]},
  { group: "System", items: [
    { name: "Support Center", icon: HelpCircle, path: "/super-admin/support" },
    { name: "Audit Logs", icon: FileText, path: "/super-admin/audit-logs" },
    { name: "Roles", icon: ShieldCheck, path: "/super-admin/roles" },
    { name: "CMS", icon: Database, path: "/super-admin/cms" },
  ]}
];

const BOTTOM_ITEMS = [
  { name: "Settings", icon: Settings, path: "/super-admin/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const renderItem = (item: any, isLogout: boolean = false) => {
    const isActive = location.pathname === item.path;
    
    return (
      <Link 
        key={item.name}
        to={item.path}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300",
          isActive 
            ? "bg-white/80 shadow-[0_4px_20px_rgba(114,241,209,0.15)] text-[#8F7CFF]" 
            : "hover:bg-white/40 text-slate-500 hover:text-slate-800",
          isLogout && "hover:text-[#FF7A7A] hover:bg-[#FF7A7A]/10"
        )}
      >
        {/* Active Indicator Glow */}
        {isActive && (
          <motion.div
            layoutId="active-indicator"
            className="absolute left-0 w-1 h-6 rounded-r-full bg-[#72F1D1] shadow-[0_0_10px_#72F1D1]"
          />
        )}
        
        <item.icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive && "text-[#72F1D1]")} />
        
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium text-sm whitespace-nowrap overflow-hidden"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    );
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
      className="h-[calc(100vh-32px)] my-4 ml-4 shrink-0 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col relative z-50 overflow-hidden"
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center px-6 border-b border-white/40">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] flex items-center justify-center shrink-0 shadow-lg">
          <span className="text-white font-heading font-black text-lg">S</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="ml-3 font-heading font-bold text-xl text-slate-800 tracking-tight whitespace-nowrap"
            >
              SocioHub
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-6 right-[-12px] w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-[#8F7CFF] transition-colors z-10 hidden lg:flex"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-3 flex flex-col gap-6">
        {NAV_ITEMS.map((group) => (
          <div key={group.group} className="flex flex-col gap-1">
            {!collapsed && (
              <span className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {group.group}
              </span>
            )}
            {group.items.map((item) => renderItem(item))}
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/40 flex flex-col gap-1">
        {BOTTOM_ITEMS.map((item) => renderItem(item, false))}
      </div>
    </motion.aside>
  );
}

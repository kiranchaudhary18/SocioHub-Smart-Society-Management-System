import { Search, User, LogOut, Bell, Building, ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useSession } from "@/hooks/useSession";

export function Topbar() {
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");
  const { logout, user } = useSession();
  const location = useLocation();

  // Generate breadcrumbs from path
  const paths = location.pathname.split("/").filter(Boolean);
  
  // Format path segments for display
  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <header className="h-20 w-full shrink-0 flex items-center justify-between px-8 relative z-40 mt-4">
      {/* Left side: Breadcrumbs */}
      <div className="flex-1 max-w-md hidden md:flex items-center">
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-500 bg-white/60 backdrop-blur-xl border border-white/80 px-4 py-2.5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <Link to="/resident" className="hover:text-[#8F7CFF] transition-colors flex items-center gap-1.5">
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          
          {paths.slice(1).map((segment, index) => {
            const isLast = index === paths.length - 2;
            const path = `/resident/${paths.slice(1, index + 2).join("/")}`;
            
            // Skip ID segments
            if (segment.length > 20 || !isNaN(Number(segment))) return null;
            
            return (
              <div key={path} className="flex items-center space-x-2">
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                {isLast ? (
                  <span className="text-slate-800 font-bold">{formatSegment(segment)}</span>
                ) : (
                  <Link to={path} className="hover:text-[#8F7CFF] transition-colors">
                    {formatSegment(segment)}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md relative group ml-auto md:ml-0 md:mr-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#8F7CFF] transition-colors" />
        </div>
        <input
          type="text"
          className="w-full h-11 bg-white/60 backdrop-blur-xl border border-white/80 text-slate-800 text-sm rounded-2xl pl-11 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 transition-all placeholder:text-slate-400 font-medium"
          placeholder="Search portal..."
        />
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>{currentDate}</span>
        </div>

        <div className="h-6 w-px bg-slate-200/50 hidden lg:block" />

        {/* Current Society Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm cursor-pointer hover:bg-white/80 transition-colors tooltip-trigger" title="Society Context">
          <Building className="w-4 h-4 text-[#8F7CFF]" />
          <span className="text-xs font-bold text-slate-700">Prestige Falcon City</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 flex items-center justify-center text-slate-500 hover:text-[#FF5DA2] hover:bg-white/90 shadow-sm transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FF5DA2] border border-white" />
          </button>
        </div>

        {/* Resident Avatar & Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-1 pr-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm hover:bg-white/90 transition-all cursor-pointer">
            <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] p-0.5">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName} ${user?.lastName}&backgroundColor=transparent`}
                  alt="Resident"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-bold text-slate-800 leading-tight">{user?.firstName} {user?.lastName}</span>
              <span className="text-[10px] font-bold text-slate-500 leading-tight uppercase tracking-widest mt-0.5">Resident</span>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
            <Link to="/resident/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#8F7CFF] font-bold text-sm transition-colors">
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <div className="h-px bg-slate-100 my-1 mx-2" />
            <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FF7A7A]/10 text-slate-600 hover:text-[#FF7A7A] font-bold text-sm transition-colors text-left">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

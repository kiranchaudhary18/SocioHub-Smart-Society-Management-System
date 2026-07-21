import { Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export function Topbar() {
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <header className="h-20 w-full shrink-0 flex items-center justify-between px-8 relative z-40 mt-4">
      {/* Left side: Command Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#8F7CFF] transition-colors" />
          </div>
          <input
            type="text"
            className="w-full h-12 bg-white/60 backdrop-blur-xl border border-white/80 text-slate-800 text-sm rounded-2xl pl-11 pr-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 transition-all placeholder:text-slate-400 font-medium"
            placeholder="Search commands, societies, or users... (⌘ K)"
          />
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500">
          <span>{currentDate}</span>
        </div>

        <div className="h-6 w-px bg-slate-200/50 hidden lg:block" />

        {/* Platform Status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm cursor-pointer hover:bg-white/80 transition-colors">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#72F1D1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#72F1D1]"></span>
          </div>
          <span className="text-xs font-bold text-slate-600">All Systems Go</span>
        </div>

        {/* Removed Action Icons as requested */}

        {/* Owner Avatar & Dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-3 p-1 pr-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-sm hover:bg-white/90 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] p-0.5">
              <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=transparent" 
                  alt="Super Admin"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-bold text-slate-800 leading-tight">Kiran Chaudhary</span>
              <span className="text-xs font-medium text-slate-500 leading-tight">Super Admin</span>
            </div>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 z-50">
            <Link to="/super-admin/profile" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-[#8F7CFF] font-bold text-sm transition-colors">
              <User className="w-4 h-4" />
              My Profile
            </Link>
            <div className="h-px bg-slate-100 my-1 mx-2" />
            <Link to="/auth/login" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#FF7A7A]/10 text-slate-600 hover:text-[#FF7A7A] font-bold text-sm transition-colors">
              <LogOut className="w-4 h-4" />
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

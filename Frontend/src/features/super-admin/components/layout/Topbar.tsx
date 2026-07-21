import { Bell, Search, Zap, CheckCircle2 } from "lucide-react";
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

        {/* Action Icons */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/80 flex items-center justify-center text-slate-500 hover:text-[#8F7CFF] hover:bg-white/90 shadow-sm transition-all relative">
            <Zap className="w-4 h-4" />
          </button>
          
          <button className="w-10 h-10 rounded-xl bg-white/60 backdrop-blur-xl border border-white/80 flex items-center justify-center text-slate-500 hover:text-[#FF5DA2] hover:bg-white/90 shadow-sm transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF5DA2] border border-white" />
          </button>
        </div>

        {/* Owner Avatar */}
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
      </div>
    </header>
  );
}

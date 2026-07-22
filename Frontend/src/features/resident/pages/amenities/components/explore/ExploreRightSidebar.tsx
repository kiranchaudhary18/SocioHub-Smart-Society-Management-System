import { ShieldCheck, CloudSun, Phone, Info } from "lucide-react";

export function ExploreRightSidebar() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Weather Widget */}
      <div className="bg-gradient-to-br from-[#3DD9FF] to-[#0A84FF] rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center justify-between relative z-10 mb-2">
          <span className="text-sm font-bold uppercase tracking-wider">Today</span>
          <CloudSun className="w-8 h-8" />
        </div>
        <div className="relative z-10 flex flex-col">
          <span className="text-4xl font-heading font-black">28°C</span>
          <span className="text-sm font-medium text-white/90">Mostly Sunny. Perfect day for Swimming or Tennis.</span>
        </div>
      </div>

      {/* Booking Rules Mini */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Booking Guidelines</h4>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8F7CFF] mt-1.5 shrink-0" />
            <span className="text-xs font-medium text-slate-600">You can book amenities up to 7 days in advance.</span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8F7CFF] mt-1.5 shrink-0" />
            <span className="text-xs font-medium text-slate-600">Cancellations must be done at least 12 hours prior to avoid penalty.</span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8F7CFF] mt-1.5 shrink-0" />
            <span className="text-xs font-medium text-slate-600">Ensure you carry your digital QR pass for entry.</span>
          </li>
        </ul>
      </div>

      {/* Office Info */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Info className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Facility Management</h4>
        </div>
        
        <div className="flex items-start gap-3">
          <Phone className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-800">Support Desk</span>
            <span className="text-xs font-black text-[#3DD9FF]">Ext. 505</span>
          </div>
        </div>
      </div>

    </div>
  );
}

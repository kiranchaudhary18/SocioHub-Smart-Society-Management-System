import { Phone, Building, Megaphone, Clock } from "lucide-react";

export function NoticesRightSidebar() {
  return (
    <div className="flex flex-col gap-6">
      
      {/* Latest Announcement Mini */}
      <div className="bg-gradient-to-br from-[#8F7CFF] to-[#604CE8] rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="flex items-center gap-2 relative z-10 mb-4">
          <Megaphone className="w-5 h-5 text-[#E5DFFF]" />
          <span className="text-sm font-bold uppercase tracking-wider text-[#E5DFFF]">Latest</span>
        </div>
        <div className="relative z-10 flex flex-col gap-2">
          <h4 className="text-lg font-heading font-black leading-tight">AGM 2026 is scheduled for next month</h4>
          <span className="text-xs font-medium text-white/80">Don't forget to mark your attendance via the Events tab.</span>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Phone className="w-4 h-4 text-red-400" />
          <h4 className="text-sm font-bold text-slate-800">Emergency Contacts</h4>
        </div>
        <ul className="flex flex-col gap-4">
          <li className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Main Gate Security</span>
            <span className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-1 rounded-md">Ext 100</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Fire Safety Officer</span>
            <span className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-1 rounded-md">Ext 101</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-sm font-bold text-slate-600">Medical Room</span>
            <span className="text-xs font-black text-slate-800 bg-slate-100 px-2 py-1 rounded-md">Ext 200</span>
          </li>
        </ul>
      </div>

      {/* Office Timings */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Building className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Society Office</h4>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Weekdays (Mon - Fri)</span>
              <span className="text-xs font-medium text-slate-500">10:00 AM - 06:00 PM</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800">Saturday</span>
              <span className="text-xs font-medium text-slate-500">10:00 AM - 02:00 PM</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-red-500">Sunday</span>
              <span className="text-xs font-medium text-slate-500">Closed</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

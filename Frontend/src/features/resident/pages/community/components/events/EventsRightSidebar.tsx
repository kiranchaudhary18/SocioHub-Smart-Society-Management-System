import { ChevronLeft, ChevronRight, CloudSun, MapPin, ExternalLink } from "lucide-react";
import type { CommunityEvent } from "../../../../services/community.service";

interface Props {
  events: CommunityEvent[];
}

export function EventsRightSidebar({ events }: Props) {
  // Calendar mini
  const currentDate = new Date("2026-08-01");
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const getEventForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Calendar Mini */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-slate-800">August 2026</h3>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"><ChevronLeft className="w-3 h-3" /></button>
            <button className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"><ChevronRight className="w-3 h-3" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-[10px] font-bold text-slate-400 uppercase">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(b => <div key={`blank-${b}`} />)}
          {days.map(day => {
            const evts = getEventForDate(day);
            const hasEvent = evts.length > 0;
            const isRegistered = evts.some(e => e.isRegistered);
            
            return (
              <div 
                key={day}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all relative
                  ${isRegistered ? 'bg-emerald-500 text-white shadow-sm' : 
                    hasEvent ? 'bg-[#8F7CFF]/10 text-[#8F7CFF] border border-[#8F7CFF]/20' : 
                    'text-slate-600 hover:bg-slate-50'}
                `}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      {/* Weather Info */}
      <div className="bg-gradient-to-br from-[#3DD9FF] to-[#0A84FF] rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-yellow-300" />
            <span className="text-sm font-bold uppercase tracking-wider text-white">Weather Forecast</span>
          </div>
          <span className="text-sm font-medium text-white/90 leading-relaxed mt-1">Perfect weather for outdoor events this weekend! Expect sunny skies with a high of 28°C.</span>
        </div>
      </div>

      {/* Venues */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Popular Venues</h4>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between items-center group cursor-pointer">
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#8F7CFF] transition-colors">Central Garden</span>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#8F7CFF]" />
          </li>
          <li className="flex justify-between items-center group cursor-pointer">
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#8F7CFF] transition-colors">Club House Hall A</span>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#8F7CFF]" />
          </li>
        </ul>
      </div>

    </div>
  );
}

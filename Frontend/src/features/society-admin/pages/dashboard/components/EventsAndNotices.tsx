import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { Calendar, Pin, Bell } from "lucide-react";

interface EventsAndNoticesProps {
  events: DashboardStats['upcomingEvents'];
  notices: DashboardStats['latestNotices'];
  delay?: number;
}

export function EventsAndNotices({ events, notices, delay = 0 }: EventsAndNoticesProps) {
  return (
    <SectionCard delay={delay} className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-white to-slate-50/50">
      
      {/* Events Column */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#8F7CFF]" /> Upcoming Events
          </h3>
        </div>
        
        <div className="flex flex-col gap-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 bg-white hover:border-[#8F7CFF]/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex flex-col items-center justify-center border border-slate-100 group-hover:bg-[#8F7CFF]/5 transition-colors">
                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">{event.date.split(" ")[0]}</span>
                <span className="text-sm font-black text-slate-700 leading-none mt-1">{event.date.split(" ")[1].replace(',', '')}</span>
              </div>
              <div className="flex-1 flex flex-col">
                <span className="font-bold text-slate-700 text-sm group-hover:text-[#8F7CFF] transition-colors">{event.title}</span>
                <span className="text-xs font-medium text-slate-500 mt-0.5">{event.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notices Column */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#FF5DA2]" /> Latest Notices
          </h3>
        </div>
        
        <div className="flex flex-col gap-4">
          {notices.map((notice) => (
            <div key={notice.id} className="flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-white hover:border-[#FF5DA2]/30 transition-all group">
              {notice.isPinned ? (
                <Pin className="w-4 h-4 text-[#FF5DA2] mt-0.5" />
              ) : (
                <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <span className="font-bold text-slate-700 text-sm group-hover:text-[#FF5DA2] transition-colors line-clamp-1">{notice.title}</span>
                <span className="text-xs font-medium text-slate-400 mt-1">{notice.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </SectionCard>
  );
}

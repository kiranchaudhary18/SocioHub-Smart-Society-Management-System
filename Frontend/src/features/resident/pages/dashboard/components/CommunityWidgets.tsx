import { motion } from "framer-motion";
import { Bell, PartyPopper, ArrowRight, ExternalLink } from "lucide-react";
import type { NoticeRecord, EventRecord } from "../../../services/dashboard.service";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  notices: NoticeRecord[];
  events: EventRecord[];
}

export function CommunityWidgets({ notices, events }: Props) {
  
  const WidgetHeader = ({ title, icon: Icon, link }: { title: string, icon: any, link: string }) => (
    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-slate-800">{title}</h3>
      </div>
      <Link to={link} className="text-xs font-bold text-[#8F7CFF] hover:text-[#7b68ee] flex items-center gap-1 group">
        View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Latest Notices */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
      >
        <WidgetHeader title="Latest Notices" icon={Bell} link="/resident/community/notices" />
        
        <div className="flex flex-col gap-3 flex-1">
          {notices.length > 0 ? notices.map((notice) => (
            <div key={notice.id} className={cn(
              "p-3 rounded-xl transition-colors border flex flex-col gap-2 cursor-pointer group",
              !notice.isRead ? "bg-[#8F7CFF]/5 border-[#8F7CFF]/20 hover:bg-[#8F7CFF]/10" : "bg-slate-50/50 hover:bg-slate-50 border-slate-100/50"
            )}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {!notice.isRead && <div className="w-2 h-2 rounded-full bg-[#8F7CFF] mt-1 shrink-0" />}
                  <h4 className={cn("text-sm font-bold line-clamp-1 pr-2 group-hover:text-[#8F7CFF] transition-colors", !notice.isRead ? "text-slate-900" : "text-slate-700")}>{notice.title}</h4>
                </div>
                {notice.priority === "HIGH" && (
                  <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700">
                    Important
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 pl-4">
                <span>{notice.date}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )) : (
            <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Bell className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-500">No new notices</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
      >
        <WidgetHeader title="Upcoming Events" icon={PartyPopper} link="/resident/community/events" />
        
        <div className="flex flex-col gap-3 flex-1">
          {events.length > 0 ? events.map((event) => (
            <div key={event.id} className="flex gap-4 p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100/50 cursor-pointer group">
              <div className="w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br from-[#3DD9FF]/20 to-[#72F1D1]/20 border border-[#3DD9FF]/30 flex flex-col items-center justify-center">
                <span className="text-xs font-bold text-[#00a3cc] uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                <span className="text-lg font-black text-slate-800 leading-none">{new Date(event.date).getDate()}</span>
              </div>
              <div className="flex flex-col justify-center flex-1">
                <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-[#3DD9FF] transition-colors">{event.title}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-medium text-slate-500">{event.venue}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          )) : (
            <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <PartyPopper className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-500">No upcoming events</p>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}

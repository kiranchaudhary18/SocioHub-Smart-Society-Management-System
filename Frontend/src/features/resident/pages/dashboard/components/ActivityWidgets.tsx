import { motion } from "framer-motion";
import { MessageSquareWarning, ArrowRight, UserPlus, CalendarDays, ExternalLink, Activity } from "lucide-react";
import type { ComplaintRecord, VisitorRecord, BookingRecord } from "../../../services/dashboard.service";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  complaints: ComplaintRecord[];
  visitors: VisitorRecord[];
  bookings: BookingRecord[];
}

export function ActivityWidgets({ complaints, visitors, bookings }: Props) {
  
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
    <div className="flex flex-col gap-6 mt-8">
      <div className="flex items-center gap-2">
        <Activity className="w-6 h-6 text-slate-400" />
        <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Recent Activity</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Complaints List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
        >
          <WidgetHeader title="My Complaints" icon={MessageSquareWarning} link="/resident/complaints" />
          
          <div className="flex flex-col gap-3 flex-1">
            {complaints.length > 0 ? complaints.map((complaint) => (
              <div key={complaint.id} className="p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100/50 flex flex-col gap-2 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 pr-2 group-hover:text-[#FF5DA2] transition-colors">{complaint.title}</h4>
                  <span className={cn(
                    "shrink-0 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                    complaint.status === "OPEN" ? "bg-amber-100 text-amber-700" :
                    complaint.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-700" :
                    "bg-emerald-100 text-emerald-700"
                  )}>
                    {complaint.status.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{complaint.category} • {complaint.createdDate}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <MessageSquareWarning className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">No active complaints</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Visitor Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
        >
          <WidgetHeader title="Today's Visitors" icon={UserPlus} link="/resident/visitors" />
          
          <div className="flex flex-col gap-3 flex-1">
            {visitors.length > 0 ? visitors.map((visitor) => (
              <div key={visitor.id} className="p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100/50 flex flex-col gap-2 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 pr-2 group-hover:text-[#3DD9FF] transition-colors">{visitor.name}</h4>
                  <span className={cn(
                    "shrink-0 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                    visitor.status === "ENTERED" ? "bg-emerald-100 text-emerald-700" :
                    visitor.status === "EXPECTED" ? "bg-amber-100 text-amber-700" :
                    "bg-slate-100 text-slate-700"
                  )}>
                    {visitor.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{visitor.purpose} • {visitor.entryTime || visitor.expectedTime}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <UserPlus className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">No expected visitors today</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-5 flex flex-col"
        >
          <WidgetHeader title="Upcoming Bookings" icon={CalendarDays} link="/resident/amenities" />
          
          <div className="flex flex-col gap-3 flex-1">
            {bookings.length > 0 ? bookings.map((booking) => (
              <div key={booking.id} className="p-3 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors border border-slate-100/50 flex flex-col gap-2 cursor-pointer group">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 pr-2 group-hover:text-[#8BF178] transition-colors">{booking.facility}</h4>
                  <span className={cn(
                    "shrink-0 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider",
                    booking.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-700" :
                    booking.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  )}>
                    {booking.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>{booking.date} • {booking.timeSlot}</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )) : (
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <CalendarDays className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">No upcoming bookings</p>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

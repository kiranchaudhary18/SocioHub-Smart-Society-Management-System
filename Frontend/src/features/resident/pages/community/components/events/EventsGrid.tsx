import { MapPin, Calendar, Clock, TicketCheck, ArrowRight } from "lucide-react";
import type { CommunityEvent } from "../../../../services/community.service";

interface Props {
  events: CommunityEvent[];
  onView: (e: CommunityEvent) => void;
}

export function EventsGrid({ events, onView }: Props) {
  if (events.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Upcoming Events</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no events scheduled at this moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {events.map(event => (
        <div 
          key={event.id}
          onClick={() => onView(event)}
          className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer group hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col h-full relative"
        >
          {event.isRegistered && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm">
              <TicketCheck className="w-3 h-3" /> Registered
            </div>
          )}

          <div className={`w-full aspect-[16/9] ${event.imagePlaceholder} relative overflow-hidden flex items-center justify-center`}>
             <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Cover Image</span>
          </div>

          <div className="flex flex-col p-6 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8F7CFF] mb-2">{event.category}</span>
            <h3 className="text-xl font-heading font-black text-slate-800 line-clamp-1 mb-4 group-hover:text-[#8F7CFF] transition-colors">{event.title}</h3>
            
            <div className="flex flex-col gap-2 mt-auto">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                {event.time}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="truncate">{event.venue}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs font-bold text-slate-400">{event.capacity - event.registeredCount} spots left</span>
              <span className="text-sm font-black text-[#8F7CFF] flex items-center gap-1 group-hover:gap-2 transition-all">
                Details <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

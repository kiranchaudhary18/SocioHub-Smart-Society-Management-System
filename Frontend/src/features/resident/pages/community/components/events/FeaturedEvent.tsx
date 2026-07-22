import { MapPin, Calendar, Clock, Ticket } from "lucide-react";
import type { CommunityEvent } from "../../../../services/community.service";

interface Props {
  event: CommunityEvent;
  onView: (e: CommunityEvent) => void;
}

export function FeaturedEvent({ event, onView }: Props) {
  return (
    <div 
      className={`relative w-full rounded-[32px] overflow-hidden shadow-xl min-h-[300px] flex flex-col justify-end group cursor-pointer ${event.imagePlaceholder}`}
      onClick={() => onView(event)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity group-hover:opacity-90" />
      
      <div className="relative z-10 p-8 flex flex-col md:flex-row gap-6 justify-between items-end">
        <div className="flex flex-col gap-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
              Featured Event
            </span>
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-200">
              {event.category}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight">
            {event.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-200 mt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-white" />
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-white" />
              {event.time}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-white" />
              {event.venue}
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
            <Ticket className="w-4 h-4" />
            <span className="text-sm font-bold">{event.capacity - event.registeredCount} spots left</span>
          </div>
          <button 
            className="w-full md:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black text-sm transition-transform shadow-lg group-hover:scale-105 duration-300"
          >
            {event.isRegistered ? "View Pass" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

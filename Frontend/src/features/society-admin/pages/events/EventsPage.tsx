import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventService } from "../../services/event.service";
import type { SocietyEvent, EventStats } from "../../services/event.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { 
  Calendar, CheckCircle2, Users, Clock, MapPin, Plus, 
  Download, Search, Filter, CalendarDays, List as ListIcon, MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [events, setEvents] = useState<SocietyEvent[]>([]);
  const [stats, setStats] = useState<EventStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [eventsData, statsData] = await Promise.all([
        eventService.getEvents(),
        eventService.getStats()
      ]);
      setEvents(eventsData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredEvents = events.filter(e => 
    `${e.title} ${e.location} ${e.organizer}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "UPCOMING": return "warning";
      case "ONGOING": return "info";
      case "COMPLETED": return "success";
      case "CANCELLED": return "danger";
      default: return "neutral";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Events</h1>
          <p className="text-slate-500 font-medium mt-1">Plan and organize society activities.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<CalendarDays className="w-4 h-4" />}>Calendar View</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create Event</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Upcoming Events" value={stats.upcomingEvents} icon={<Calendar className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} trend={{ value: 2, isPositive: true }} />
          <StatCard title="Completed" value={stats.completedEvents} icon={<CheckCircle2 className="w-5 h-5 text-[#72F1D1]" />} delay={0.15} />
          <StatCard title="Registrations" value={stats.registrations} icon={<Users className="w-5 h-5 text-[#FFD166]" />} delay={0.2} trend={{ value: 45, isPositive: true }} />
          <StatCard title="Today's Events" value={stats.todaysEvents} icon={<Clock className="w-5 h-5 text-[#3DD9FF]" />} delay={0.25} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search events by title or location..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'grid' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <CalendarDays className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'list' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="List View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-96 bg-white/60 rounded-[32px] animate-pulse" />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-white transition-all group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={event.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <StatusBadge variant={getStatusVariant(event.status) as any}>{event.status}</StatusBadge>
                    </div>
                    <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    
                    <div className="absolute bottom-4 left-4 flex flex-col text-white">
                      <span className="text-xl font-bold leading-tight">{event.title}</span>
                      <span className="text-xs font-medium text-white/80 mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {event.date}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100/50">
                      <div className="flex flex-col gap-1.5 w-1/2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Time</span>
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#8F7CFF]" /> {event.time}</span>
                      </div>
                      <div className="w-px h-8 bg-slate-100" />
                      <div className="flex flex-col gap-1.5 w-1/2 pl-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</span>
                        <span className="text-sm font-bold text-slate-700 flex items-center gap-1.5 truncate"><MapPin className="w-4 h-4 text-[#FF7A7A]" /> {event.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                      {event.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((_, idx) => (
                            <img key={idx} src={`https://ui-avatars.com/api/?name=User+${idx}&background=f1f5f9&color=64748b`} className="w-7 h-7 rounded-full border-2 border-white" alt="participant" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-slate-500">+{event.participantsCount} going</span>
                      </div>
                      
                      <Link to={`/admin/events/${event.id}`} className="text-sm font-bold text-[#8F7CFF] hover:text-[#7b68ee] transition-colors">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-5 whitespace-nowrap">Event Details</th>
                      <th className="px-6 py-5 whitespace-nowrap">Date & Time</th>
                      <th className="px-6 py-5 whitespace-nowrap">Location</th>
                      <th className="px-6 py-5 whitespace-nowrap">Status</th>
                      <th className="px-6 py-5 whitespace-nowrap">Registrations</th>
                      <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event, i) => (
                      <motion.tr 
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-slate-50 hover:bg-white transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img src={event.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} alt={event.title} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                            <div className="flex flex-col">
                              <Link to={`/admin/events/${event.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors line-clamp-1">
                                {event.title}
                              </Link>
                              <span className="text-[10px] font-black tracking-wider text-slate-400 mt-1">ORG: {event.organizer}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {event.date}</span>
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {event.time}</span>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {event.location}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge variant={getStatusVariant(event.status) as any}>
                            {event.status}
                          </StatusBadge>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {[1, 2].map((_, idx) => (
                                <img key={idx} src={`https://ui-avatars.com/api/?name=User+${idx}&background=f1f5f9&color=64748b`} className="w-6 h-6 rounded-full border border-white" alt="participant" />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-slate-500">+{event.participantsCount}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}

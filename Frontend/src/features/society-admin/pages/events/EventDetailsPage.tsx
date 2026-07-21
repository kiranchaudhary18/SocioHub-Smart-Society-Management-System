import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { eventService } from "../../services/event.service";
import type { SocietyEvent } from "../../services/event.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Edit3, Trash2, CalendarClock, Users, 
  MapPin, Clock, Copy, IndianRupee, Image as ImageIcon, FileText,
  CheckCircle2
} from "lucide-react";

export default function EventDetailsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<SocietyEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (eventId) {
      eventService.getEvent(eventId).then(data => {
        if (data) setEvent(data);
        setIsLoading(false);
      });
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-64 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] xl:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <Link to="/admin/events" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
      </div>
    );
  }

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
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/events" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>Edit Event</ActionButton>
          <ActionButton variant="outline" leftIcon={<Copy className="w-4 h-4" />}>Duplicate</ActionButton>
          <ActionButton variant="outline" leftIcon={<Trash2 className="w-4 h-4 text-red-500" />} className="text-red-500 border-red-200 hover:bg-red-50">Cancel Event</ActionButton>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative w-full h-64 md:h-80 rounded-[32px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] group">
        <img 
          src={event.bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col text-white">
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge variant={getStatusVariant(event.status) as any}>{event.status}</StatusBadge>
              <span className="text-xs font-bold text-white/80 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl uppercase tracking-widest">
                {event.organizer}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2 text-white">
              {event.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
            <div className="flex flex-col px-4 border-r border-white/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1 flex items-center gap-1.5"><CalendarClock className="w-3.5 h-3.5" /> Date</span>
              <span className="font-bold text-white text-sm">{event.date}</span>
            </div>
            <div className="flex flex-col px-4 border-r border-white/20">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Time</span>
              <span className="font-bold text-white text-sm">{event.time}</span>
            </div>
            <div className="flex flex-col px-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Location</span>
              <span className="font-bold text-white text-sm">{event.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Content */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#8F7CFF]" /> Event Details
            </h3>
            <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </SectionCard>

          {/* Budget Overview */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-[#72F1D1]" /> Budget Overview
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-800">₹{event.budget.spent.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400">Total Spent</span>
                </div>
                <div className="text-right flex flex-col">
                  <span className="text-xl font-bold text-slate-600">₹{event.budget.allocated.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400">Allocated Budget</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <div 
                  className="bg-[#72F1D1] h-full rounded-full" 
                  style={{ width: `${(event.budget.spent / event.budget.allocated) * 100}%` }} 
                />
              </div>
            </div>
          </SectionCard>

          {/* Schedule Timeline */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FFD166]" /> Schedule
            </h3>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#8F7CFF] rounded-full z-10 top-1" />
                <div className="flex items-start justify-between ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">Setup & Registration</span>
                    <span className="text-xs font-medium text-slate-500 mt-1">Check-in desk opens.</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200">18:00</span>
                </div>
              </div>
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#72F1D1] rounded-full z-10 top-1" />
                <div className="flex items-start justify-between ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">Cultural Performances</span>
                    <span className="text-xs font-medium text-slate-500 mt-1">Dance and music by residents.</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200">19:00</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#FFD166] rounded-full z-10 top-1" />
                <div className="flex items-start justify-between ml-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700">Dinner & Fireworks</span>
                    <span className="text-xs font-medium text-slate-500 mt-1">Potluck dinner followed by fireworks.</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-200">20:30</span>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right Column - Stats & Settings */}
        <div className="flex flex-col gap-6">
          
          <SectionCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3DD9FF]" /> Participants
              </h3>
              <span className="text-xs font-bold bg-slate-100 text-slate-500 px-2.5 py-1 rounded-lg">
                {event.participantsCount} / {event.maxParticipants}
              </span>
            </div>
            
            <div className="flex flex-col gap-4">
              {event.participants.length > 0 ? (
                <>
                  {event.participants.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <img src={p.photo} alt={p.name} className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{p.name}</span>
                          <span className="text-[10px] font-bold text-slate-400">{p.unit} • {p.registeredAt}</span>
                        </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-[#72F1D1]" />
                    </div>
                  ))}
                  <button className="w-full text-center text-sm font-bold text-[#8F7CFF] hover:text-[#7b68ee] transition-colors py-2">
                    View All {event.participantsCount} Participants
                  </button>
                </>
              ) : (
                <div className="text-center py-6 flex flex-col items-center justify-center text-slate-400">
                  <Users className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-sm font-bold">No participants yet.</span>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-slate-400" /> Event Gallery
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="h-24 bg-slate-100 rounded-xl overflow-hidden group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="h-24 bg-slate-100 rounded-xl overflow-hidden group cursor-pointer relative">
                <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">+5</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 shadow-sm">
              Upload Photos
            </button>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

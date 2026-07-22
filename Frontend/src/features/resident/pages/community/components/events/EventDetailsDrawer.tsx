import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, MapPin, Users, Ticket, Download, ShieldAlert, Share2 } from "lucide-react";
import type { CommunityEvent } from "../../../../services/community.service";

interface Props {
  event: CommunityEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (id: string) => Promise<void>;
}

export function EventDetailsDrawer({ event, isOpen, onClose, onRegister }: Props) {
  const [isRegistering, setIsRegistering] = useState(false);

  if (!event) return null;

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await onRegister(event.id);
      // Don't close immediately, let them see the updated status
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-y-auto"
          >
            {/* Action Bar */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20">
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Hero Banner */}
            <div className={`w-full h-72 ${event.imagePlaceholder} relative flex flex-col justify-end p-8`}>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="relative z-10">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-white border border-white/20 mb-3 inline-block">
                  {event.category}
                </span>
                <h2 className="text-3xl font-heading font-black text-white leading-tight">
                  {event.title}
                </h2>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-8 -mt-6 relative z-10">
              
              {/* Registration Status / Action */}
              <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-slate-800">
                    {event.capacity - event.registeredCount} spots remaining
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    {event.registeredCount} members attending
                  </span>
                </div>
                
                {event.isRegistered ? (
                  <button className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 border border-emerald-100 transition-colors hover:bg-emerald-100">
                    <Download className="w-4 h-4" /> Download Entry Pass
                  </button>
                ) : (
                  <button 
                    onClick={handleRegister}
                    disabled={isRegistering || event.registeredCount >= event.capacity}
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all disabled:opacity-50"
                  >
                    {isRegistering ? "Processing..." : "Confirm Registration"}
                  </button>
                )}
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{event.time}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 col-span-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Venue</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{event.venue}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-heading font-black text-slate-800">About Event</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mt-2">
                  <Users className="w-4 h-4" /> Organized by {event.organizer}
                </div>
              </div>

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-heading font-black text-slate-800">Event Agenda</h3>
                  <div className="flex flex-col gap-4 relative">
                    <div className="absolute top-2 bottom-2 left-[19px] w-0.5 bg-slate-200 z-0" />
                    {event.agenda.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-[#8F7CFF] flex items-center justify-center shrink-0 shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-[#8F7CFF]" />
                        </div>
                        <div className="flex flex-col justify-center bg-white border border-slate-200 p-3 rounded-2xl shadow-sm flex-1">
                          <span className="text-xs font-bold text-[#8F7CFF] mb-0.5">{item.time}</span>
                          <span className="text-sm font-bold text-slate-800">{item.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rules */}
              {event.rules && event.rules.length > 0 && (
                <div className="flex flex-col gap-4 bg-amber-50/50 p-6 rounded-3xl border border-amber-100/50 mt-4">
                  <div className="flex items-center gap-2 text-amber-700">
                    <ShieldAlert className="w-5 h-5" />
                    <h4 className="font-bold">Guidelines & Rules</h4>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {event.rules.map((rule: string, idx: number) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span className="text-sm font-medium text-amber-900/80">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

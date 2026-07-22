import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Users, Star, Info, ShieldAlert, BadgeIndianRupee, Calendar } from "lucide-react";
import type { Amenity } from "../../../../services/amenity.service";

interface Props {
  amenity: Amenity | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (data: any) => Promise<void>;
}

export function AmenityDetailsDrawer({ amenity, isOpen, onClose, onBook }: Props) {
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [guests, setGuests] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!amenity) return null;

  const handleBook = async () => {
    if (!bookingDate || !timeSlot) return;
    setIsSubmitting(true);
    try {
      await onBook({
        amenityId: amenity.id,
        bookingDate,
        timeSlot,
        guests
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setBookingDate("");
        setTimeSlot("");
        setGuests(1);
      }, 2000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
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
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 flex items-center justify-between z-10 shadow-sm">
              <h2 className="text-lg font-heading font-black text-slate-800 flex items-center gap-2">
                Facility Details
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-8">
              
              {/* Hero Image */}
              <div className={`w-full h-64 rounded-3xl ${amenity.imagePlaceholder} relative overflow-hidden shadow-sm flex items-center justify-center`}>
                <span className="text-white/50 font-bold uppercase tracking-widest text-lg">Image Gallery Preview</span>
              </div>

              {/* Title & Key Info */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-3xl font-heading font-black text-slate-800 tracking-tight">{amenity.name}</h3>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-xl font-bold shrink-0">
                    <Star className="w-4 h-4 fill-amber-500" />
                    {amenity.rating}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-600">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg">{amenity.type}</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-lg">{amenity.category}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm font-medium text-slate-500 leading-relaxed">
                {amenity.description}
              </p>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timings</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-[#8F7CFF]" />
                    <span className="text-sm font-bold text-slate-800">{amenity.openingTime} - {amenity.closingTime}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-[#3DD9FF]" />
                    <span className="text-sm font-bold text-slate-800">Max {amenity.capacity} people</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Charges</span>
                  <div className="flex items-center gap-2 mt-1">
                    <BadgeIndianRupee className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-800">{amenity.hourlyRate > 0 ? `₹${amenity.hourlyRate} / hour` : "Free"}</span>
                  </div>
                </div>
              </div>

              {/* Facilities & Rules */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Info className="w-5 h-5" />
                  <h4 className="font-bold">Facilities Included</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {amenity.facilities.map((f: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-100/50">
                <div className="flex items-center gap-2 text-amber-700">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="font-bold">Rules & Guidelines</h4>
                </div>
                <ul className="list-disc pl-5 flex flex-col gap-1.5">
                  {amenity.rules.map((r: string, i: number) => (
                    <li key={i} className="text-sm font-medium text-amber-900/70">{r}</li>
                  ))}
                </ul>
              </div>

              {/* Booking Form (Mock) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-6 mt-4">
                <h4 className="font-bold text-slate-800">Reserve this Amenity</h4>
                
                {showSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center">
                    <span className="font-bold text-emerald-600">Booking Confirmed! 🎉</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Date</label>
                        <input 
                          type="date"
                          value={bookingDate}
                          onChange={e => setBookingDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Slot</label>
                        <select 
                          value={timeSlot}
                          onChange={e => setTimeSlot(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF]"
                        >
                          <option value="">Select Time</option>
                          <option value="06:00 AM - 08:00 AM">06:00 AM - 08:00 AM</option>
                          <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                          <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                          <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Guests</label>
                      <input 
                        type="number"
                        min={1}
                        max={amenity.capacity}
                        value={guests}
                        onChange={e => setGuests(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF]"
                      />
                    </div>
                    <button 
                      onClick={handleBook}
                      disabled={isSubmitting || !bookingDate || !timeSlot}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Calendar className="w-4 h-4" />
                      {isSubmitting ? "Processing..." : "Confirm Booking"}
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

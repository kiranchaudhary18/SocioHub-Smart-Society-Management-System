import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, QrCode, Clock, Users, Calendar, Ban } from "lucide-react";
import type { AmenityBooking } from "../../../../services/amenity.service";

interface Props {
  booking: AmenityBooking | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel: (id: string) => Promise<void>;
}

export function BookingDetailsDrawer({ booking, isOpen, onClose, onCancel }: Props) {
  const [isCancelling, setIsCancelling] = useState(false);

  if (!booking) return null;

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await onCancel(booking.id);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsCancelling(false);
    }
  };

  const isCancellable = booking.status === "UPCOMING" || booking.status === "CONFIRMED";

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
                Booking Details
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              
              {/* Top Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono bg-slate-50 px-3 py-1 rounded-full mb-3">
                  {booking.id}
                </span>
                <h3 className="text-2xl font-heading font-black text-slate-800 mb-1">{booking.amenityName}</h3>
                
                <div className={`mt-3 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  booking.status === 'UPCOMING' || booking.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  booking.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border border-red-100' :
                  'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {booking.status}
                </div>
              </div>

              {/* QR Pass (if applicable) */}
              {(booking.status === "UPCOMING" || booking.status === "CONFIRMED") && booking.qrPassCode && (
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="w-48 h-48 bg-white rounded-2xl p-4 flex items-center justify-center relative z-10 mb-4 group-hover:scale-105 transition-transform">
                    {/* Placeholder for QR Code image */}
                    <div className="w-full h-full border-4 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50">
                      <QrCode className="w-12 h-12 text-slate-300" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest font-mono">Scan for Entry</span>
                </div>
              )}

              {/* Booking Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-[#8F7CFF]" />
                    <span className="text-sm font-bold text-slate-800">{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Slot</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-[#3DD9FF]" />
                    <span className="text-sm font-bold text-slate-800">{booking.timeSlot}</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guests</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-800">{booking.guests} People</span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payment</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-slate-800">{booking.amount > 0 ? `₹${booking.amount}` : "Free"}</span>
                    {booking.amount > 0 && (
                      <span className={`text-[10px] font-bold uppercase ${booking.paymentStatus === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        ({booking.paymentStatus})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {booking.specialInstructions && (
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Special Instructions</span>
                  <p className="text-sm font-medium text-amber-900/80">{booking.specialInstructions}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-4 pb-6">
                <button className="w-full py-4 bg-white border border-slate-200 hover:border-[#8F7CFF] hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Receipt
                </button>
                {isCancellable && (
                  <button 
                    onClick={handleCancel}
                    disabled={isCancelling}
                    className="w-full py-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Ban className="w-4 h-4" />
                    {isCancelling ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

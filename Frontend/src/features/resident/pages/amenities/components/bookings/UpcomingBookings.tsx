import { Clock, Calendar, ChevronRight } from "lucide-react";
import type { AmenityBooking } from "../../../../services/amenity.service";

interface Props {
  bookings: AmenityBooking[];
  onViewDetails: (booking: AmenityBooking) => void;
}

export function UpcomingBookings({ bookings, onViewDetails }: Props) {
  const upcoming = bookings.filter(b => b.status === "UPCOMING" || b.status === "CONFIRMED").slice(0, 3);

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-black text-slate-800">Upcoming Slots</h3>
        <span className="text-xs font-bold text-[#8F7CFF] bg-[#8F7CFF]/10 px-3 py-1 rounded-full">{upcoming.length} Pending</span>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center h-full gap-2">
            <Calendar className="w-8 h-8 text-slate-300" />
            <span className="text-sm font-medium text-slate-500">No upcoming bookings.</span>
          </div>
        ) : (
          upcoming.map(booking => (
            <div 
              key={booking.id}
              onClick={() => onViewDetails(booking)}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-[#3DD9FF] hover:shadow-md cursor-pointer transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <span className="text-sm font-black text-slate-500">{new Date(booking.bookingDate).getDate()}</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-[#0A84FF] transition-colors">{booking.amenityName}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span className="text-xs font-medium text-slate-500 truncate">{booking.timeSlot}</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-[#3DD9FF]/10 group-hover:text-[#0A84FF] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

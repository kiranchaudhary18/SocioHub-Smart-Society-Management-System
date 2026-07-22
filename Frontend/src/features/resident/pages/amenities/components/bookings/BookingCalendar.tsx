import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AmenityBooking } from "../../../../services/amenity.service";

interface Props {
  bookings: AmenityBooking[];
  onDateSelect: (dateStr: string) => void;
}

export function BookingCalendar({ bookings, onDateSelect }: Props) {
  // Use a static date (August 2026 for mock) to ensure consistency with mock bookings
  const [currentDate, setCurrentDate] = useState(new Date("2026-08-01"));

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const prevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const nextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => b.bookingDate === dateStr && (b.status === "UPCOMING" || b.status === "CONFIRMED"));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-black text-slate-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 flex-1">
        {blanks.map(b => <div key={`blank-${b}`} />)}
        
        {days.map(day => {
          const dayBookings = getBookingsForDate(day);
          const hasBooking = dayBookings.length > 0;
          
          return (
            <div 
              key={day}
              onClick={() => {
                const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                onDateSelect(dateStr);
              }}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all relative
                ${hasBooking ? 'bg-[#3DD9FF]/10 hover:bg-[#3DD9FF]/20 border border-[#3DD9FF]/20' : 'hover:bg-slate-50 border border-transparent'}
              `}
            >
              <span className={`text-sm font-bold ${hasBooking ? 'text-[#0A84FF]' : 'text-slate-700'}`}>{day}</span>
              {hasBooking && (
                <div className="absolute bottom-2 flex gap-1">
                  {dayBookings.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#0A84FF]" />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

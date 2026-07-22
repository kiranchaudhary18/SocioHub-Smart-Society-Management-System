import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { amenityService, type AmenityBooking } from "../../services/amenity.service";
import { BookingOverviewKPIs } from "./components/bookings/BookingOverviewKPIs";
import { BookingCalendar } from "./components/bookings/BookingCalendar";
import { UpcomingBookings } from "./components/bookings/UpcomingBookings";
import { BookingHistoryTable } from "./components/bookings/BookingHistoryTable";
import { BookingDetailsDrawer } from "./components/bookings/BookingDetailsDrawer";
import { Loader2 } from "lucide-react";

export default function MyBookingsPage() {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState<AmenityBooking | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myBookings'],
    queryFn: async () => {
      const [kpis, bookings] = await Promise.all([
        amenityService.getBookingKPIs(),
        amenityService.getMyBookings()
      ]);
      return { kpis, bookings };
    }
  });

  const cancelMutation = useMutation({
    mutationFn: amenityService.cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
      queryClient.invalidateQueries({ queryKey: ['exploreAmenities'] });
    }
  });

  const handleDateSelect = (dateStr: string) => {
    if (!data) return;
    const dateBookings = data.bookings.filter(b => b.bookingDate === dateStr && (b.status === "UPCOMING" || b.status === "CONFIRMED"));
    if (dateBookings.length > 0) {
      setSelectedBooking(dateBookings[0]);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading bookings...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load bookings</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">My Bookings</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Track and manage all your amenity reservations.</p>
      </div>

      <BookingOverviewKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-2">
        {/* Left Col (Calendar + Upcoming) */}
        <div className="xl:col-span-1 flex flex-col gap-8">
          <div className="h-[420px]">
            <BookingCalendar bookings={data.bookings} onDateSelect={handleDateSelect} />
          </div>
          <div className="flex-1">
            <UpcomingBookings bookings={data.bookings} onViewDetails={setSelectedBooking} />
          </div>
        </div>

        {/* Right Col (Table) */}
        <div className="xl:col-span-2">
          <BookingHistoryTable bookings={data.bookings} onViewDetails={setSelectedBooking} />
        </div>
      </div>

      <BookingDetailsDrawer 
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onCancel={async (id) => {
          await cancelMutation.mutateAsync(id);
        }}
      />

    </div>
  );
}

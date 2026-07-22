import { useState, useMemo } from "react";
import { Eye, Search, Filter, CalendarX, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import type { AmenityBooking } from "../../../../services/amenity.service";

interface Props {
  bookings: AmenityBooking[];
  onViewDetails: (booking: AmenityBooking) => void;
}

export function BookingHistoryTable({ bookings, onViewDetails }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchSearch = b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.amenityName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [bookings, searchTerm, statusFilter]);

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "UPCOMING": 
      case "CONFIRMED": 
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">{status}</span>;
      case "COMPLETED": 
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">Completed</span>;
      case "CANCELLED": 
        return <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[10px] font-bold uppercase tracking-wider">Cancelled</span>;
      default: 
        return <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <CalendarX className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Bookings Yet</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md mb-6">Reserve your favourite amenities and they will appear here.</p>
        <Link 
          to="/resident/amenities/explore"
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Explore Amenities
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col gap-6">
      
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <h3 className="text-xl font-heading font-black text-slate-800">Booking History</h3>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full lg:w-72">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text" 
              placeholder="Search ID or Amenity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <Filter className="w-4 h-4 text-slate-400" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-600 focus:outline-none cursor-pointer"
            >
              <option value="ALL">All Status</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Booking ID</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amenity</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date & Time</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
               <tr>
                 <td colSpan={6} className="px-4 py-8 text-center text-sm font-medium text-slate-500">
                   No bookings match your filters.
                 </td>
               </tr>
            ) : filtered.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => onViewDetails(b)}>
                <td className="px-4 py-4">
                  <span className="text-xs font-black text-slate-400 font-mono tracking-wider">{b.id}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-bold text-slate-800">{b.amenityName}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                      {b.timeSlot}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{b.amount > 0 ? `₹${b.amount}` : "Free"}</span>
                    {b.amount > 0 && (
                      <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${b.paymentStatus === 'PAID' ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {b.paymentStatus}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  {renderStatusBadge(b.status)}
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onViewDetails(b); }}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" /> Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

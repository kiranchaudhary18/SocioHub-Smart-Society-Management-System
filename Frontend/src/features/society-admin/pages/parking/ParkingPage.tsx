import { useState, useEffect } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { StatCard } from "../../components/ui/StatCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { societyService } from "../../services/society.service";
import type { ParkingSlot } from "../../services/society.service";
import { Car, Search, Filter, Plus, Zap, BatteryCharging, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ParkingPage() {
  const [slots, setSlots] = useState<ParkingSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    societyService.getParkingSlots().then(data => {
      setSlots(data);
      setIsLoading(false);
    });
  }, []);

  const filteredSlots = slots.filter(slot => {
    if (filter === "All") return true;
    if (filter === "Vacant") return slot.status === "Vacant";
    if (filter === "EV") return slot.type === "EV";
    if (filter === "Visitor") return slot.type === "Visitor";
    return true;
  });

  const getSlotColor = (slot: ParkingSlot) => {
    if (slot.status === "Vacant") return "border-slate-200 bg-slate-50 hover:border-slate-300";
    if (slot.type === "Visitor") return "border-[#FFD166]/40 bg-[#FFD166]/10";
    if (slot.type === "EV") return "border-[#3DD9FF]/40 bg-[#3DD9FF]/10";
    return "border-[#72F1D1]/40 bg-[#72F1D1]/10";
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeader 
        title="Parking Management"
        description="Allocate and monitor society parking slots."
        icon={<Car className="w-6 h-6 text-[#FFD166]" />}
        actions={
          <ActionButton leftIcon={<Plus className="w-4 h-4" />}>
            Assign Slot
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Slots" value="500" icon={<Car className="w-6 h-6" />} delay={0.1} />
        <StatCard title="Available Slots" value="45" icon={<AlertCircle className="w-6 h-6" />} trend={{value: 2, isPositive: false}} delay={0.2} />
        <StatCard title="Visitor Parking" value="25" icon={<Users className="w-6 h-6" />} subtitle="12 currently occupied" delay={0.3} />
        <StatCard title="EV Charging" value="10" icon={<BatteryCharging className="w-6 h-6" />} delay={0.4} />
      </div>

      <SectionCard className="flex flex-col gap-6 min-h-[500px]">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 custom-scrollbar">
            {["All", "Vacant", "EV", "Visitor"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  filter === f 
                    ? "bg-slate-800 text-white shadow-md" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search flat or vehicle..." 
                className="w-full h-10 bg-white border border-slate-200 rounded-xl pl-10 pr-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#72F1D1]/50"
              />
            </div>
            <ActionButton variant="secondary" size="icon" className="shrink-0"><Filter className="w-4 h-4" /></ActionButton>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 py-2">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-xs font-medium text-slate-500">Vacant</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#72F1D1]" /><span className="text-xs font-medium text-slate-500">Resident</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FFD166]" /><span className="text-xs font-medium text-slate-500">Visitor</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3DD9FF]" /><span className="text-xs font-medium text-slate-500">EV Station</span></div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {[...Array(24)].map((_, i) => <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filteredSlots.map((slot, i) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                key={slot.id}
                className={`p-3 rounded-2xl border ${getSlotColor(slot)} cursor-pointer hover:-translate-y-1 transition-all group relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-heading font-black text-slate-800">{slot.slotNumber}</span>
                  {slot.type === "EV" && <Zap className="w-3.5 h-3.5 text-[#3DD9FF]" />}
                </div>
                
                <div className="mt-4 flex flex-col gap-0.5">
                  {slot.status === "Occupied" ? (
                    <>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{slot.flatId || "Visitor"}</span>
                      <span className="text-xs font-bold text-slate-700 truncate">{slot.vehicleNumber}</span>
                    </>
                  ) : (
                    <span className="text-xs font-medium text-slate-400 mt-3">Available</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

// Ensure Users is imported for StatCard icon
import { Users } from "lucide-react";

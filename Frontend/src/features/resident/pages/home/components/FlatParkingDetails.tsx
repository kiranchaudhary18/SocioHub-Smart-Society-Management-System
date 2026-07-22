import { motion } from "framer-motion";
import { Car, Info, MapPin } from "lucide-react";
import type { ParkingDetails } from "../../../services/myHome.service";

interface Props {
  parking: ParkingDetails;
}

export function FlatParkingDetails({ parking }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-[#FF5DA2]/10 text-[#FF5DA2] flex items-center justify-center">
          <Car className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Parking & Vehicles</h3>
          <p className="text-sm font-medium text-slate-500">Allotted slots and registered vehicles</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Slots */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Allotted Slots
          </h4>
          <div className="flex flex-col gap-3">
            {parking.slots.map((slot, idx) => (
              <div key={idx} className="flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-lg font-black text-slate-800">{slot.slotNumber}</span>
                  <span className="text-xs font-medium text-slate-500">{slot.capacity}</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5DA2] bg-[#FF5DA2]/10 px-3 py-1 rounded-full border border-[#FF5DA2]/20">
                  {slot.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Vehicles */}
        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Car className="w-4 h-4" /> Registered Vehicles
          </h4>
          <div className="flex flex-col gap-3">
            {parking.registeredVehicles.map((vehicle, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-800 tracking-wide">{vehicle.number}</span>
                  <span className="text-xs font-medium text-slate-500 mt-0.5">{vehicle.make} {vehicle.model}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 p-4 bg-[#FFD166]/10 rounded-2xl text-amber-700 text-sm border border-[#FFD166]/20">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-bold mb-1">Visitor Parking Rules</span>
          <p className="font-medium leading-relaxed text-xs opacity-90">{parking.visitorRules}</p>
        </div>
      </div>
    </motion.div>
  );
}

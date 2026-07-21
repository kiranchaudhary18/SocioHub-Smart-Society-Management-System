import { SectionCard } from "../../../components/ui/SectionCard";
import type { DashboardStats } from "../../../services/dashboard.service";
import { Car, Zap } from "lucide-react";

interface ParkingWidgetProps {
  parking: DashboardStats['parking'];
  delay?: number;
}

export function ParkingWidget({ parking, delay = 0 }: ParkingWidgetProps) {
  const total = parking.occupied + parking.vacant + parking.visitor + parking.evCharging;

  return (
    <SectionCard delay={delay} className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">Parking Status</h3>
        <Car className="w-5 h-5 text-slate-400" />
      </div>

      <div className="flex flex-col gap-4">
        {/* Occupied */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#72F1D1]" />
            <span className="text-sm font-bold text-slate-600">Resident (Occupied)</span>
          </div>
          <span className="text-sm font-black text-slate-800">{parking.occupied}</span>
        </div>
        
        {/* Visitor */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
            <span className="text-sm font-bold text-slate-600">Visitor Parking</span>
          </div>
          <span className="text-sm font-black text-slate-800">{parking.visitor}</span>
        </div>

        {/* EV */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#3DD9FF]" />
            <span className="text-sm font-bold text-slate-600 flex items-center gap-1">EV Charging <Zap className="w-3 h-3 text-[#3DD9FF]" /></span>
          </div>
          <span className="text-sm font-black text-slate-800">{parking.evCharging}</span>
        </div>

        {/* Vacant */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="text-sm font-bold text-slate-500">Vacant</span>
          </div>
          <span className="text-sm font-black text-slate-800">{parking.vacant}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 flex-1 h-3 bg-slate-100 rounded-full flex overflow-hidden">
        <div style={{ width: `${(parking.occupied/total)*100}%` }} className="h-full bg-[#72F1D1]" />
        <div style={{ width: `${(parking.visitor/total)*100}%` }} className="h-full bg-[#FFD166]" />
        <div style={{ width: `${(parking.evCharging/total)*100}%` }} className="h-full bg-[#3DD9FF]" />
      </div>
    </SectionCard>
  );
}

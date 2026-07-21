import { useState, useEffect } from "react";
import { PageHeader } from "../../components/ui/PageHeader";
import { SectionCard } from "../../components/ui/SectionCard";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { societyService } from "../../services/society.service";
import type { Amenity } from "../../services/society.service";
import { Dumbbell, Plus, Users, Clock, AlertTriangle, Info, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    societyService.getAmenities().then(data => {
      setAmenities(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeader 
        title="Amenities Booking"
        description="Manage shared society facilities and booking requests."
        icon={<Dumbbell className="w-6 h-6 text-[#FF5DA2]" />}
        actions={
          <ActionButton leftIcon={<Plus className="w-4 h-4" />}>
            Add Amenity
          </ActionButton>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-80 bg-slate-100 rounded-[24px] animate-pulse" />
          ))
        ) : (
          <AnimatePresence>
            {amenities.map((amenity, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                key={amenity.id}
              >
                <SectionCard noPadding className="flex flex-col h-full group hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-slate-900/10 z-10 group-hover:bg-transparent transition-colors" />
                    <img 
                      src={amenity.image} 
                      alt={amenity.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20">
                      <StatusBadge 
                        variant={amenity.status === "Available" ? "success" : (amenity.status === "Maintenance" ? "warning" : "danger")}
                        className="backdrop-blur-xl bg-white/90"
                      >
                        {amenity.status}
                      </StatusBadge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-slate-800 tracking-tight">{amenity.name}</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed flex-1">
                      {amenity.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Capacity</span>
                          <span className="text-sm font-bold mt-1">{amenity.capacity} Pax</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <div className="flex flex-col leading-none">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hours</span>
                          <span className="text-sm font-bold mt-1">6 AM - 10 PM</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 mb-6">
                      {amenity.rules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-slate-600">{rule}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 mt-auto">
                      <ActionButton variant="primary" className="flex-1" size="sm" leftIcon={<Calendar className="w-4 h-4" />}>
                        Bookings
                      </ActionButton>
                      <ActionButton variant="secondary" size="sm" className="px-4">
                        Edit
                      </ActionButton>
                    </div>
                  </div>
                </SectionCard>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

import { Star, Clock, Users } from "lucide-react";
import type { Amenity } from "../../../../services/amenity.service";

interface Props {
  amenity: Amenity;
  onViewDetails: (amenity: Amenity) => void;
}

export function AmenityCard({ amenity, onViewDetails }: Props) {
  return (
    <div 
      onClick={() => onViewDetails(amenity)}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] cursor-pointer group hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col h-full"
    >
      {/* Image Placeholder */}
      <div className={`w-full aspect-[4/3] rounded-[24px] ${amenity.imagePlaceholder} mb-4 relative overflow-hidden flex items-center justify-center`}>
        <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-800 shadow-sm">
          {amenity.type}
        </div>
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black text-slate-800 shadow-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {amenity.rating}
        </div>
        <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Preview Image</span>
      </div>

      <div className="flex flex-col flex-1 px-2 pb-2">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-heading font-black text-slate-800 line-clamp-1 group-hover:text-[#8F7CFF] transition-colors">{amenity.name}</h3>
        </div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{amenity.category}</span>
        
        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold">{amenity.capacity} Max</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-bold">{amenity.openingTime} - {amenity.closingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

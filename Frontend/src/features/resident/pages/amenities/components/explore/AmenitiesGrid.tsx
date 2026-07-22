import { useMemo } from "react";
import type { Amenity } from "../../../../services/amenity.service";
import { AmenityCard } from "./AmenityCard";
import { SearchX } from "lucide-react";

interface Props {
  amenities: Amenity[];
  searchTerm: string;
  categoryFilter: string;
  typeFilter: string;
  onViewDetails: (amenity: Amenity) => void;
}

export function AmenitiesGrid({ amenities, searchTerm, categoryFilter, typeFilter, onViewDetails }: Props) {
  
  const filtered = useMemo(() => {
    return amenities.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = categoryFilter === "ALL" || a.category === categoryFilter;
      const matchType = typeFilter === "ALL" || a.type === typeFilter;
      return matchSearch && matchCat && matchType;
    });
  }, [amenities, searchTerm, categoryFilter, typeFilter]);

  if (filtered.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Amenities Found</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filtered.map(amenity => (
        <AmenityCard key={amenity.id} amenity={amenity} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
}

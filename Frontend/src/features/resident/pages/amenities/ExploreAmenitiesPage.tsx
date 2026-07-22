import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { amenityService, type Amenity } from "../../services/amenity.service";
import { ExploreKPIs } from "./components/explore/ExploreKPIs";
import { AmenitiesToolbar } from "./components/explore/AmenitiesToolbar";
import { AmenitiesGrid } from "./components/explore/AmenitiesGrid";
import { AmenityDetailsDrawer } from "./components/explore/AmenityDetailsDrawer";
import { ExploreRightSidebar } from "./components/explore/ExploreRightSidebar";
import { Loader2 } from "lucide-react";

export default function ExploreAmenitiesPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['exploreAmenities'],
    queryFn: async () => {
      const [kpis, amenities] = await Promise.all([
        amenityService.getExploreKPIs(),
        amenityService.getAmenities()
      ]);
      return { kpis, amenities };
    }
  });

  const bookMutation = useMutation({
    mutationFn: amenityService.bookAmenity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exploreAmenities'] });
    }
  });

  const handleReset = () => {
    setSearchTerm("");
    setCategoryFilter("ALL");
    setTypeFilter("ALL");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading amenities...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load amenities</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Explore Amenities</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Browse and reserve community facilities available in your society.</p>
      </div>

      <ExploreKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          <AmenitiesToolbar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
            typeFilter={typeFilter} setTypeFilter={setTypeFilter}
            onReset={handleReset}
          />
          
          <AmenitiesGrid 
            amenities={data.amenities}
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            typeFilter={typeFilter}
            onViewDetails={setSelectedAmenity}
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-3 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <ExploreRightSidebar />
          </div>
        </div>

      </div>

      <AmenityDetailsDrawer 
        amenity={selectedAmenity} 
        isOpen={!!selectedAmenity} 
        onClose={() => setSelectedAmenity(null)} 
        onBook={async (formData) => {
          await bookMutation.mutateAsync(formData);
        }}
      />

    </div>
  );
}

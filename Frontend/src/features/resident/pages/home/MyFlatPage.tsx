import { useQuery } from "@tanstack/react-query";
import { myHomeService } from "../../services/myHome.service";
import { PropertyOverview } from "./components/PropertyOverview";
import { PropertySpecifications } from "./components/PropertySpecifications";
import { UtilityConnections } from "./components/UtilityConnections";
import { FlatParkingDetails } from "./components/FlatParkingDetails";
import { FlatSocietyInfo } from "./components/FlatSocietyInfo";
import { FlatQuickActions } from "./components/FlatQuickActions";
import { FlatRightPanel } from "./components/FlatRightPanel";
import { Loader2 } from "lucide-react";

export default function MyFlatPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['myFlatData'],
    queryFn: async () => {
      const [
        overview,
        specs,
        utilities,
        parking,
        society,
        rightPanel
      ] = await Promise.all([
        myHomeService.getPropertyOverview(),
        myHomeService.getPropertySpecifications(),
        myHomeService.getUtilityConnections(),
        myHomeService.getParkingDetails(),
        myHomeService.getSocietyInfo(),
        myHomeService.getRightPanelData()
      ]);

      return {
        overview,
        specs,
        utilities,
        parking,
        society,
        rightPanel
      };
    }
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading property details...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load property details</h2>
        <p className="text-sm text-slate-500 max-w-md">There was a problem connecting to the server. Please check your connection and try again.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">My Flat</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">View your apartment and property information.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          <PropertyOverview overview={data.overview} />
          <PropertySpecifications specs={data.specs} />
          <UtilityConnections utilities={data.utilities} />
          <FlatParkingDetails parking={data.parking} />
          <FlatSocietyInfo info={data.society} />
          <FlatQuickActions />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <FlatRightPanel data={data.rightPanel} />
          </div>
        </div>

      </div>

    </div>
  );
}

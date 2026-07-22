import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityService, type CommunityEvent } from "../../services/community.service";
import { EventKPIs } from "./components/events/EventKPIs";
import { FeaturedEvent } from "./components/events/FeaturedEvent";
import { EventsGrid } from "./components/events/EventsGrid";
import { EventDetailsDrawer } from "./components/events/EventDetailsDrawer";
import { EventsRightSidebar } from "./components/events/EventsRightSidebar";
import { Loader2 } from "lucide-react";

export default function EventsPage() {
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const [kpis, events] = await Promise.all([
        communityService.getEventKPIs(),
        communityService.getEvents()
      ]);
      return { kpis, events };
    }
  });

  const registerMutation = useMutation({
    mutationFn: communityService.registerEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      // If modal is open, we can update local selected state or let it re-fetch.
      // Re-fetching handles it best.
    }
  });

  const featuredEvent = useMemo(() => {
    return data?.events.find(e => e.isFeatured) || data?.events[0];
  }, [data?.events]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading events...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load events</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Community Events</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Explore and participate in upcoming society events.</p>
      </div>

      <EventKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          {featuredEvent && (
            <FeaturedEvent event={featuredEvent} onView={setSelectedEvent} />
          )}

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-heading font-black text-slate-800">All Events</h3>
            <EventsGrid 
              events={data.events}
              onView={setSelectedEvent}
            />
          </div>
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <EventsRightSidebar events={data.events} />
          </div>
        </div>

      </div>

      <EventDetailsDrawer 
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onRegister={async (id) => {
          await registerMutation.mutateAsync(id);
          // Update selected event locally so drawer re-renders registered status instantly
          if (selectedEvent) {
             setSelectedEvent({ ...selectedEvent, isRegistered: true, registeredCount: selectedEvent.registeredCount + 1 });
          }
        }}
      />

    </div>
  );
}

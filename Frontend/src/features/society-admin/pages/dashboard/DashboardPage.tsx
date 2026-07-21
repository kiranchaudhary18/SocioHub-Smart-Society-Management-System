import { useState, useEffect } from "react";
import { dashboardService } from "../../services/dashboard.service";
import type { DashboardStats } from "../../services/dashboard.service";
import { WelcomeHero } from "./components/WelcomeHero";
import { OverviewKPIs } from "./components/OverviewKPIs";
import { TodayTimeline } from "./components/TodayTimeline";
import { VisitorChartWidget } from "./components/VisitorChartWidget";
import { ComplaintKanbanWidget } from "./components/ComplaintKanbanWidget";
import { MaintenanceChartWidget } from "./components/MaintenanceChartWidget";
import { ParkingWidget } from "./components/ParkingWidget";
import { EventsAndNotices } from "./components/EventsAndNotices";
import { RightSidebar } from "./components/RightSidebar";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dashboardService.getDashboardStats().then(data => {
      setStats(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="w-full h-full flex flex-col gap-6 animate-pulse">
        <div className="w-full h-48 bg-slate-100 rounded-[32px]" />
        <div className="grid grid-cols-4 gap-6">
          <div className="h-32 bg-slate-100 rounded-2xl" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
        </div>
        <div className="w-full h-96 bg-slate-100 rounded-[32px]" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col xl:flex-row gap-6">
      {/* Main Content Area (Left/Center) */}
      <div className="flex-1 flex flex-col min-w-0">
        <WelcomeHero />
        <OverviewKPIs stats={stats.overview} />
        
        {/* Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          <div className="col-span-1 lg:col-span-2">
            <ComplaintKanbanWidget complaints={stats.complaints} delay={0.4} />
          </div>
          <div className="col-span-1">
            <VisitorChartWidget visitors={stats.visitors} delay={0.5} />
          </div>

          {/* Row 2 */}
          <MaintenanceChartWidget maintenance={stats.maintenance} delay={0.6} />
          <div className="col-span-1">
            <ParkingWidget parking={stats.parking} delay={0.7} />
          </div>

          {/* Row 3 */}
          <EventsAndNotices events={stats.upcomingEvents} notices={stats.latestNotices} delay={0.8} />
          
          <div className="col-span-1 lg:col-span-3">
             <TodayTimeline timeline={stats.timeline} delay={0.9} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full xl:w-80 shrink-0">
        <RightSidebar tasks={stats.pendingTasks} />
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { 
  Building2, ChevronLeft, MapPin, Users, Shield, 
  Wrench, Car, AlertTriangle, Eye, FileText, 
  BarChart3, Settings, Calendar 
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

export default function SocietyDetailsPage() {
  const { id } = useParams();

  // Mock data for the specific society
  const society = {
    id: id || "SOC-001",
    name: "Green Valley Apartments",
    location: "Bengaluru, KA",
    secretary: "Amit Shah",
    status: "Active",
    plan: "Pro",
    joinDate: "2023-01-15T00:00:00Z",
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Building2 },
    { id: "buildings", label: "Buildings", icon: Building2 },
    { id: "residents", label: "Residents", icon: Users },
    { id: "security", label: "Security", icon: Shield },
    { id: "maintenance", label: "Maintenance", icon: Wrench },
    { id: "parking", label: "Parking", icon: Car },
    { id: "complaints", label: "Complaints", icon: AlertTriangle },
    { id: "visitors", label: "Visitors", icon: Eye },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-full">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link to="/super-admin/societies" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#8F7CFF] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Societies
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] flex items-center justify-center shadow-lg shadow-[#8F7CFF]/20 shrink-0">
              <span className="text-3xl font-heading font-black text-white">{society.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
                {society.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {society.location}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Joined Jan 2023</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
              Suspend
            </button>
            <button className="px-5 py-2.5 rounded-2xl bg-[#8F7CFF] hover:bg-[#7b68ee] transition-colors text-sm font-bold text-white shadow-lg shadow-[#8F7CFF]/30">
              Edit Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs.Root defaultValue="overview" className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-2 mb-6 overflow-x-auto custom-scrollbar"
        >
          <Tabs.List className="flex items-center gap-2 min-w-max">
            {tabs.map(tab => (
              <Tabs.Trigger 
                key={tab.id}
                value={tab.id}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-500 transition-all hover:bg-white/50 data-[state=active]:bg-white data-[state=active]:text-[#8F7CFF] data-[state=active]:shadow-sm flex items-center gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1"
        >
          <Tabs.Content value="overview" className="h-full">
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center h-[500px] text-center">
              <Building2 className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">Overview Dashboard</h3>
              <p className="text-slate-500 max-w-md">Detailed metrics and widgets for {society.name} will appear here. This section integrates directly with the society's internal metrics.</p>
            </div>
          </Tabs.Content>

          {tabs.filter(t => t.id !== "overview").map(tab => (
            <Tabs.Content key={tab.id} value={tab.id} className="h-full">
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center h-[500px] text-center">
                <tab.icon className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">{tab.label}</h3>
                <p className="text-slate-500 max-w-md">Manage {tab.label.toLowerCase()} for {society.name}. This is a dedicated view for super admins to oversee internal operations.</p>
              </div>
            </Tabs.Content>
          ))}
        </motion.div>
      </Tabs.Root>

    </div>
  );
}

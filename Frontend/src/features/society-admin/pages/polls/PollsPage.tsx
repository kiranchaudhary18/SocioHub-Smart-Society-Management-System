import { useState, useEffect } from "react";
import { pollService } from "../../services/poll.service";
import type { SocietyPoll, PollStats } from "../../services/poll.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { 
  BarChart3, CheckSquare, Plus, Download, Search, Filter, 
  MoreVertical, Users, CalendarClock, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PollsPage() {
  const [polls, setPolls] = useState<SocietyPoll[]>([]);
  const [stats, setStats] = useState<PollStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [pollsData, statsData, chartD] = await Promise.all([
        pollService.getPolls(),
        pollService.getStats(),
        pollService.getTrendData()
      ]);
      setPolls(pollsData);
      setStats(statsData);
      setChartData(chartD as any[]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredPolls = polls.filter(p => 
    p.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE": return "success";
      case "COMPLETED": return "neutral";
      case "DRAFT": return "warning";
      default: return "neutral";
    }
  };

  return (
    <div className="w-full flex h-full relative gap-6">
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Polls & Surveys</h1>
            <p className="text-slate-500 font-medium mt-1">Run digital voting and collect resident opinions.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export Data</ActionButton>
            <ActionButton variant="outline" leftIcon={<CheckSquare className="w-4 h-4" />}>Create Survey</ActionButton>
            <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create Poll</ActionButton>
          </div>
        </div>

        {/* Overview Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Active Polls" value={stats.activePolls} icon={<BarChart3 className="w-5 h-5 text-[#72F1D1]" />} delay={0.1} />
            <StatCard title="Completed" value={stats.completedPolls} icon={<CheckSquare className="w-5 h-5 text-[#8F7CFF]" />} delay={0.15} />
            <StatCard title="Participation" value={`${stats.participationRate}%`} icon={<Users className="w-5 h-5 text-[#FF5DA2]" />} delay={0.2} trend={{ value: 5, isPositive: true }} />
            <StatCard title="Pending Votes" value={stats.pendingVotes} icon={<Activity className="w-5 h-5 text-[#FFD166]" />} delay={0.25} />
          </div>
        )}

        {/* Analytics Chart */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] p-6 h-[300px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#8F7CFF]" /> Participation Trend (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8F7CFF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8F7CFF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
              />
              <Area type="monotone" dataKey="votes" name="Votes Cast" stroke="#8F7CFF" strokeWidth={3} fillOpacity={1} fill="url(#colorVotes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Toolbar */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search polls by question..." 
              className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 w-full md:w-auto">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Poll Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-white/60 rounded-[32px]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {filteredPolls.map((poll, i) => (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-white transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge variant={getStatusVariant(poll.status) as any}>{poll.status}</StatusBadge>
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 group-hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                  {poll.question}
                </h3>
                {poll.description && (
                  <p className="text-sm font-medium text-slate-500 mb-6">{poll.description}</p>
                )}

                <div className="flex flex-col gap-3 mb-6 mt-auto">
                  {poll.options.map((option) => {
                    const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div key={option.id} className="relative w-full bg-slate-100 rounded-xl overflow-hidden h-10 flex items-center">
                        <div 
                          className="absolute left-0 top-0 bottom-0 bg-[#72F1D1]/30 transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative z-10 flex justify-between w-full px-4 text-sm font-bold text-slate-700">
                          <span>{option.text}</span>
                          <span>{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
                      <Users className="w-4 h-4 text-slate-400" />
                      {poll.totalVotes} / {poll.totalEligibleVoters}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-600">
                      <CalendarClock className="w-4 h-4 text-slate-400" />
                      {poll.endDate}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

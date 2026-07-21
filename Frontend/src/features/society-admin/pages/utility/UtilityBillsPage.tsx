import { useState, useEffect } from "react";
import { utilityService } from "../../services/utility.service";
import type { UtilityBill, UtilityStats } from "../../services/utility.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { 
  Droplets, Zap, Flame, Receipt, AlertTriangle, CheckCircle2, 
  Download, Search, Filter, MoreVertical, X, CreditCard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const getUtilityIcon = (type: string) => {
  switch (type) {
    case "WATER": return <Droplets className="w-4 h-4 text-[#3DD9FF]" />;
    case "ELECTRICITY": return <Zap className="w-4 h-4 text-[#FFD166]" />;
    case "GAS": return <Flame className="w-4 h-4 text-[#FF7A7A]" />;
    case "COMMON_AREA": return <Zap className="w-4 h-4 text-[#8F7CFF]" />;
    case "GENERATOR": return <Zap className="w-4 h-4 text-slate-500" />;
    default: return <Receipt className="w-4 h-4 text-slate-400" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "PAID": return "success";
    case "PENDING": return "warning";
    case "OVERDUE": return "danger";
    default: return "neutral";
  }
};

export default function UtilityBillsPage() {
  const [bills, setBills] = useState<UtilityBill[]>([]);
  const [stats, setStats] = useState<UtilityStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBill, setSelectedBill] = useState<UtilityBill | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [billsData, statsData, chartD] = await Promise.all([
        utilityService.getBills(),
        utilityService.getStats(),
        utilityService.getConsumptionData()
      ]);
      setBills(billsData);
      setStats(statsData);
      setChartData(chartD as any[]);
    };
    fetchData();
  }, []);

  const filteredBills = bills.filter(b => 
    `${b.id} ${b.residentName} ${b.type}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex h-full relative">
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col gap-6 transition-all duration-300 ${selectedBill ? 'pr-[400px]' : ''}`}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Utility Bills</h1>
            <p className="text-slate-500 font-medium mt-1">Track utility usage and payments across all buildings.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
            <ActionButton variant="primary" leftIcon={<Receipt className="w-4 h-4" />}>Generate Bills</ActionButton>
          </div>
        </div>

        {/* Overview Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard title="Water Bills" value={stats.waterBills} icon={<Droplets className="w-5 h-5 text-[#3DD9FF]" />} delay={0.1} />
            <StatCard title="Electricity" value={stats.electricityBills} icon={<Zap className="w-5 h-5 text-[#FFD166]" />} delay={0.15} />
            <StatCard title="Gas Bills" value={stats.gasBills} icon={<Flame className="w-5 h-5 text-[#FF7A7A]" />} delay={0.2} />
            <StatCard title="Pending" value={stats.pendingBillsCount} icon={<Receipt className="w-5 h-5 text-[#FFD166]" />} delay={0.25} />
            <StatCard title="Paid" value={stats.paidBillsCount} icon={<CheckCircle2 className="w-5 h-5 text-[#72F1D1]" />} delay={0.3} trend={{ value: 5, isPositive: true }} />
            <StatCard title="Overdue" value={stats.overdueBillsCount} icon={<AlertTriangle className="w-5 h-5 text-[#FF7A7A]" />} delay={0.35} />
          </div>
        )}

        {/* Analytics Chart */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] p-6 h-[350px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#8F7CFF]" /> Consumption Trends
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3DD9FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3DD9FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorElec" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD166" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FFD166" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Area type="monotone" dataKey="electricity" name="Electricity (kWh)" stroke="#FFD166" strokeWidth={3} fillOpacity={1} fill="url(#colorElec)" />
              <Area type="monotone" dataKey="water" name="Water (kL)" stroke="#3DD9FF" strokeWidth={3} fillOpacity={1} fill="url(#colorWater)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Toolbar */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search bills by ID or resident..." 
              className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-5 whitespace-nowrap">Bill ID & Type</th>
                  <th className="px-6 py-5 whitespace-nowrap">Resident / Area</th>
                  <th className="px-6 py-5 whitespace-nowrap">Consumption</th>
                  <th className="px-6 py-5 whitespace-nowrap">Amount</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 whitespace-nowrap">Due Date</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill, i) => (
                  <motion.tr 
                    key={bill.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`group border-b border-slate-50 hover:bg-white transition-colors cursor-pointer ${selectedBill?.id === bill.id ? 'bg-[#8F7CFF]/5 border-[#8F7CFF]/20' : ''}`}
                    onClick={() => setSelectedBill(bill)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{bill.id}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 mt-1">
                          {getUtilityIcon(bill.type)}
                          {bill.type.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700">{bill.residentName}</span>
                        <span className="text-xs font-bold text-slate-400">{bill.building} - {bill.flat}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {bill.consumption.toLocaleString()} {bill.unit}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-black text-slate-700">₹{bill.amount.toLocaleString()}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant={getStatusVariant(bill.status) as any}>
                        {bill.status}
                      </StatusBadge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-slate-500">{bill.dueDate}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Right Side Drawer for Bill Details */}
      <AnimatePresence>
        {selectedBill && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[400px] bg-white/80 backdrop-blur-3xl border-l border-white/80 shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-50 p-6 flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-800">Bill Details</h2>
              <button 
                onClick={() => setSelectedBill(null)}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                {getUtilityIcon(selectedBill.type)}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-1">{selectedBill.id}</h3>
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{selectedBill.type.replace('_', ' ')}</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mb-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                <span className="text-sm font-bold text-slate-500">Amount Due</span>
                <span className="text-2xl font-black text-slate-800">₹{selectedBill.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500">Consumption</span>
                <span className="text-sm font-bold text-slate-700">{selectedBill.consumption.toLocaleString()} {selectedBill.unit}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500">Due Date</span>
                <span className="text-sm font-bold text-slate-700">{selectedBill.dueDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Status</span>
                <StatusBadge variant={getStatusVariant(selectedBill.status) as any}>{selectedBill.status}</StatusBadge>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              {selectedBill.status !== 'PAID' && (
                <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#72F1D1] hover:bg-[#5ce1c1] text-emerald-900 font-bold text-sm transition-colors shadow-sm">
                  <CreditCard className="w-4 h-4" /> Mark as Paid
                </button>
              )}
              <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay to close drawer */}
      <AnimatePresence>
        {selectedBill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBill(null)}
            className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

    </div>
  );
}

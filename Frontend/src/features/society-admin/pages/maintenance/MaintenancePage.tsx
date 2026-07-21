import { useState, useEffect } from "react";
import { maintenanceService } from "../../services/maintenance.service";
import type { Invoice, MaintenanceStats } from "../../services/maintenance.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { Link } from "react-router-dom";
import { 
  IndianRupee, TrendingUp, AlertTriangle, FileText, 
  Download, Search, Filter, Mail, Receipt, ArrowUpDown, MoreVertical
} from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function MaintenancePage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [invoiceData, statsData, chartD] = await Promise.all([
        maintenanceService.getInvoices(),
        maintenanceService.getStats(),
        maintenanceService.getChartData()
      ]);
      setInvoices(invoiceData);
      setStats(statsData);
      setChartData(chartD as any[]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredInvoices = invoices.filter(inv => 
    `${inv.id} ${inv.residentName} ${inv.flat}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PAID": return "success";
      case "PENDING": return "warning";
      case "PARTIAL": return "info";
      case "OVERDUE": return "danger";
      default: return "neutral";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Maintenance Management</h1>
          <p className="text-slate-500 font-medium mt-1">Track invoices, collections and overdue payments.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Mail className="w-4 h-4" />}>Send Reminder</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<FileText className="w-4 h-4" />}>Generate Bills</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Collection (YTD)" value={`₹${stats.monthlyCollection.toLocaleString()}`} icon={<IndianRupee className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} trend={{ value: 12, isPositive: true }} />
          <StatCard title="This Month Paid" value={`₹${stats.paidAmount.toLocaleString()}`} icon={<TrendingUp className="w-5 h-5 text-[#72F1D1]" />} delay={0.2} />
          <StatCard title="Pending Amount" value={`₹${stats.pendingAmount.toLocaleString()}`} icon={<Receipt className="w-5 h-5 text-[#FFD166]" />} delay={0.3} />
          <StatCard title="Overdue Amount" value={`₹${stats.overdueAmount.toLocaleString()}`} icon={<AlertTriangle className="w-5 h-5 text-[#FF7A7A]" />} delay={0.4} trend={{ value: 5, isPositive: false }} />
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] p-6 h-[400px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#8F7CFF]" /> Monthly Collection Trend
          </h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                cursor={{ fill: 'rgba(143, 124, 255, 0.05)' }}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontWeight: 'bold' }} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '20px' }} />
              <Bar dataKey="collected" name="Collected" stackId="a" fill="#72F1D1" radius={[0, 0, 8, 8]} />
              <Bar dataKey="pending" name="Pending" stackId="a" fill="#FFD166" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[32px] p-8 text-white relative overflow-hidden shadow-[0_8px_32px_rgba(143,124,255,0.2)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-lg font-bold text-white/90 mb-8 flex items-center gap-2 relative z-10">
             Collection Rate
          </h3>
          <div className="flex flex-col items-center justify-center relative z-10 h-[200px]">
             {stats && (
               <>
                <div className="text-7xl font-black tracking-tighter drop-shadow-md">
                  {stats.collectionRate}%
                </div>
                <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl font-bold text-sm">
                  Excellent Performance
                </div>
               </>
             )}
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 mt-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by invoice ID, resident, or flat..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Invoices Table */}
      <div className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
        {isLoading ? (
          <div className="p-6 animate-pulse">
            <div className="h-12 bg-slate-100/50 rounded-2xl mb-4" />
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-16 bg-slate-100/30 rounded-2xl mb-2" />)}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-5 whitespace-nowrap">Invoice & Resident</th>
                  <th className="px-6 py-5 whitespace-nowrap">Billing Period</th>
                  <th className="px-6 py-5 cursor-pointer hover:text-slate-700 group">
                    <div className="flex items-center gap-2">
                      Amount
                      <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </th>
                  <th className="px-6 py-5 whitespace-nowrap">Penalty</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 whitespace-nowrap">Due Date</th>
                  <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv, i) => (
                  <motion.tr 
                    key={inv.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group border-b border-slate-50 hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <Link to={`/admin/maintenance/invoices/${inv.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors flex items-center gap-2">
                          <Receipt className="w-4 h-4 text-slate-400" />
                          {inv.id}
                        </Link>
                        <span className="text-sm font-bold text-slate-500 mt-1">{inv.residentName} ({inv.flat})</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                        {inv.month} {inv.year}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-700 text-lg">₹{inv.totalAmount.toLocaleString()}</span>
                        {inv.amountPaid > 0 && inv.status !== 'PAID' && (
                          <span className="text-xs font-bold text-emerald-500">Paid: ₹{inv.amountPaid.toLocaleString()}</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {inv.penalty > 0 ? (
                        <span className="text-xs font-bold text-[#FF7A7A] bg-[#FF7A7A]/10 px-2 py-1 rounded-md">
                          +₹{inv.penalty}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant={getStatusVariant(inv.status) as any}>
                        {inv.status}
                      </StatusBadge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-slate-700">{inv.dueDate}</span>
                        {inv.paymentDate && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Paid: {inv.paymentDate}</span>}
                      </div>
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
        )}
      </div>

    </div>
  );
}

import { motion } from "framer-motion";
import { Wallet, ArrowRight, Download, Receipt } from "lucide-react";
import type { PaymentRecord } from "../../../services/dashboard.service";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  recentPayments: PaymentRecord[];
  outstanding: number;
}

export function PaymentWidgets({ recentPayments, outstanding }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Payments</h3>
        <Link to="/resident/payments" className="text-sm font-bold text-[#8F7CFF] hover:text-[#7b68ee] flex items-center gap-1 group">
          View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-gradient-to-br from-[#FF7A7A]/10 to-[#FF5DA2]/5 border border-[#FF7A7A]/20 rounded-[24px] p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          {/* Circular Progress Placeholder / Decoration */}
          <div className="w-32 h-32 rounded-full border-[8px] border-[#FF7A7A]/20 border-t-[#FF7A7A] flex items-center justify-center mb-4 relative z-10">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Due</span>
              <span className="text-xl font-black text-slate-800">₹{outstanding.toLocaleString()}</span>
            </div>
          </div>
          
          <h4 className="text-lg font-bold text-slate-800 mb-1">Maintenance Due</h4>
          <p className="text-sm font-medium text-slate-500 mb-6">Due Date: 5th Aug 2026</p>
          
          <Link 
            to="/resident/payments"
            className="w-full py-3 bg-[#FF7A7A] hover:bg-[#ff6666] text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 relative z-10"
          >
            <Wallet className="w-4 h-4" /> Pay Now
          </Link>
        </motion.div>

        {/* Recent Payments Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col"
        >
          <div className="p-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
              <Receipt className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-800">Recent Transactions</h4>
          </div>
          
          <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Receipt</th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 text-sm font-bold text-slate-700">{payment.receiptNumber}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-600">{payment.type}</td>
                    <td className="px-5 py-4 text-sm font-black text-slate-800">₹{payment.amount.toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-500">{payment.date}</td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-lg text-xs font-bold",
                        payment.status === "PAID" ? "bg-emerald-100 text-emerald-700" :
                        payment.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      )}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/10 rounded-lg transition-colors inline-flex" title="Download Receipt">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
      </div>
    </div>
  );
}

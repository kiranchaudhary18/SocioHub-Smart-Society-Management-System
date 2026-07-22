import { Eye, ReceiptText, Banknote } from "lucide-react";
import type { PaymentTransaction } from "../../../../services/payment.service";
import { cn } from "@/lib/utils";

interface Props {
  transactions: PaymentTransaction[];
  onViewDetails: (tx: PaymentTransaction) => void;
}

export function PaymentHistoryTable({ transactions, onViewDetails }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Banknote className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Transactions Found</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no payment records matching your current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Transaction ID</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Payment Type</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Amount & Method</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Date</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10">Status</th>
              <th className="px-4 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white/50 backdrop-blur-sm z-10 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx) => (
              <tr key={tx.transactionId} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-700 font-mono tracking-wider">{tx.transactionId}</span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">Inv: {tx.invoiceNumber}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200">
                    {tx.paymentType}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">₹{tx.amount.toLocaleString()}</span>
                    <span className="text-xs font-medium text-slate-500">{tx.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      {new Date(tx.paymentDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs font-medium text-slate-500 mt-0.5">
                      {new Date(tx.paymentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    tx.status === "SUCCESS" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    tx.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewDetails(tx)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      <Eye className="w-4 h-4 mr-2" /> Details
                    </button>
                    {tx.receiptNumber && (
                      <button className="inline-flex items-center justify-center p-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl transition-all" title="Download Receipt">
                        <ReceiptText className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

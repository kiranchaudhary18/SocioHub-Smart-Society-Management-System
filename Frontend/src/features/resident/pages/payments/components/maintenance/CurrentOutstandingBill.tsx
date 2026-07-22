import { Download, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import type { MaintenanceBill } from "../../../../services/payment.service";

interface Props {
  bill: MaintenanceBill | undefined;
}

export function CurrentOutstandingBill({ bill }: Props) {
  if (!bill) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center h-full">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-1">All Clear!</h3>
        <p className="text-sm font-medium text-slate-500">You have no outstanding maintenance bills.</p>
      </div>
    );
  }

  const totalAmount = bill.amount + bill.lateFee + bill.gst;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden h-full flex flex-col justify-between group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#8F7CFF]/30 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3DD9FF]/20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Outstanding</span>
          <h3 className="text-2xl font-heading font-black">{bill.billingMonth}</h3>
          <span className="text-sm font-medium text-slate-400 mt-1">Invoice: {bill.invoiceNo}</span>
        </div>
        
        <div className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
          <AlertCircle className="w-3.5 h-3.5" /> Due Soon
        </div>
      </div>

      <div className="relative z-10 flex flex-col mt-8 mb-8">
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-heading font-black tracking-tighter">₹{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-4 mt-4 text-sm font-medium text-slate-300">
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-500" /> Base: ₹{bill.amount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-500" /> GST: ₹{bill.gst.toLocaleString()}
          </span>
          {bill.lateFee > 0 && (
            <span className="flex items-center gap-1.5 text-red-300">
              <div className="w-2 h-2 rounded-full bg-red-500" /> Late Fee: ₹{bill.lateFee.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Payment Progress</span>
          <span className="text-white">{bill.dueDate}</span>
        </div>
        <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden mb-6 backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] w-1/4 rounded-full" />
        </div>

        <div className="flex items-center gap-4">
          <button className="flex-1 py-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
            <CreditCard className="w-4 h-4" /> Pay Now
          </button>
          <button className="px-6 py-3.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-xl font-bold text-sm shadow-sm transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

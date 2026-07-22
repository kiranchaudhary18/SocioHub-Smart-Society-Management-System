import { ShieldCheck, CreditCard, Landmark, Smartphone } from "lucide-react";

export function PaymentInfoCard() {
  return (
    <div className="bg-[#8F7CFF]/5 border border-[#8F7CFF]/20 rounded-[32px] p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
      
      <div className="flex flex-col gap-2 max-w-xl">
        <div className="flex items-center gap-2 text-[#8F7CFF]">
          <ShieldCheck className="w-5 h-5" />
          <h4 className="text-sm font-bold uppercase tracking-wider">Secure Online Payments</h4>
        </div>
        <p className="text-sm font-medium text-slate-600 leading-relaxed">
          All transactions are encrypted and processed securely. Maintenance dues must be cleared by the 5th of every month to avoid late payment penalties (₹100/day).
        </p>
      </div>

      <div className="flex flex-col gap-3 shrink-0 w-full lg:w-auto">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Accepted Methods</span>
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm cursor-default hover:border-[#8F7CFF] transition-colors">
            <CreditCard className="w-4 h-4 text-slate-400" /> Cards
          </div>
          <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm cursor-default hover:border-[#8F7CFF] transition-colors">
            <Landmark className="w-4 h-4 text-slate-400" /> Net Banking
          </div>
          <div className="px-3 py-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-700 shadow-sm cursor-default hover:border-[#8F7CFF] transition-colors">
            <Smartphone className="w-4 h-4 text-slate-400" /> UPI
          </div>
        </div>
      </div>

    </div>
  );
}

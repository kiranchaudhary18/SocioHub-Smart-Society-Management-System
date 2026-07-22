import { Eye, Download, FileText } from "lucide-react";
import type { MaintenanceBill } from "../../../../services/payment.service";
import { cn } from "@/lib/utils";

interface Props {
  bills: MaintenanceBill[];
  onViewInvoice: (bill: MaintenanceBill) => void;
}

export function MaintenanceBillsTable({ bills, onViewInvoice }: Props) {
  if (bills.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <FileText className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Bills Found</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no maintenance bills available for your property yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <FileText className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Invoice History</h3>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice No</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Billing Month</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Due Date</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bills.map((bill) => (
              <tr key={bill.invoiceNo} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4">
                  <span className="text-sm font-black text-slate-700 tracking-wide bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/50">
                    {bill.invoiceNo}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-bold text-slate-800">{bill.billingMonth}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{bill.dueDate}</span>
                    {bill.paymentDate && (
                      <span className="text-xs font-medium text-slate-500">Paid: {bill.paymentDate}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-800">₹{(bill.amount + bill.lateFee + bill.gst).toLocaleString()}</span>
                    {(bill.lateFee > 0 || bill.gst > 0) && (
                      <span className="text-xs font-medium text-slate-500">Includes taxes/fees</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    bill.status === "PAID" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    bill.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {bill.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => onViewInvoice(bill)}
                      className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                    >
                      <Eye className="w-4 h-4 mr-2" /> View
                    </button>
                    <button className="inline-flex items-center justify-center p-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-700 rounded-xl transition-all">
                      <Download className="w-4 h-4" />
                    </button>
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

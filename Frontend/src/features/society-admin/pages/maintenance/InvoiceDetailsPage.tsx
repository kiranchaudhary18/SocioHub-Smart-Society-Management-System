import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { maintenanceService } from "../../services/maintenance.service";
import type { Invoice } from "../../services/maintenance.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Download, Printer, Mail, Receipt, Calendar, 
  MapPin, AlertTriangle, CheckCircle2, History, CreditCard, Banknote
} from "lucide-react";

export default function InvoiceDetailsPage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (invoiceId) {
      maintenanceService.getInvoice(invoiceId).then(data => {
        if (data) setInvoice(data);
        setIsLoading(false);
      });
    }
  }, [invoiceId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-24 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] xl:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Invoice Not Found</h2>
        <Link to="/admin/maintenance" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Maintenance
        </Link>
      </div>
    );
  }

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
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/maintenance" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Maintenance List
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Mail className="w-4 h-4" />}>Send Reminder</ActionButton>
          <ActionButton variant="primary" leftIcon={<Download className="w-4 h-4" />}>Download PDF</ActionButton>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Invoice Details */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.02)] overflow-hidden relative">
            {/* Header */}
            <div className={`p-8 pb-12 relative overflow-hidden ${invoice.status === 'PAID' ? 'bg-[#72F1D1]/10' : invoice.status === 'OVERDUE' ? 'bg-[#FF7A7A]/10' : 'bg-slate-50'}`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Invoice</span>
                  <h1 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                    {invoice.id}
                  </h1>
                </div>
                <StatusBadge variant={getStatusVariant(invoice.status) as any} className="scale-110 origin-right">
                  {invoice.status}
                </StatusBadge>
              </div>
            </div>

            {/* Resident Info Overlay */}
            <div className="mx-8 -mt-6 bg-white rounded-2xl p-6 shadow-md border border-slate-100 relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#8F7CFF]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-lg">{invoice.residentName}</span>
                  <span className="text-sm font-bold text-slate-500">{invoice.building} - Flat {invoice.flat}</span>
                </div>
              </div>
              
              <div className="w-px h-12 bg-slate-100 hidden sm:block" />
              
              <div className="flex flex-col sm:text-right">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Billing Period</span>
                <span className="font-bold text-slate-700 text-lg bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 mt-1">
                  {invoice.month} {invoice.year}
                </span>
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="p-8 mt-2">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-slate-400" /> Bill Breakdown
              </h3>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="font-bold text-slate-600">Base Maintenance Charges</span>
                  <span className="font-bold text-slate-800">₹{invoice.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="font-bold text-slate-600">Sinking Fund (10%)</span>
                  <span className="font-bold text-slate-800">₹{(invoice.baseAmount * 0.1).toLocaleString()}</span>
                </div>
                
                {invoice.penalty > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-slate-100 bg-[#FF7A7A]/5 -mx-4 px-4 rounded-xl text-[#FF7A7A]">
                    <span className="font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Late Payment Penalty
                    </span>
                    <span className="font-bold">₹{invoice.penalty.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-dashed border-slate-200">
                  <span className="text-lg font-black text-slate-800">Total Amount</span>
                  <span className="text-3xl font-black text-[#8F7CFF]">₹{invoice.totalAmount.toLocaleString()}</span>
                </div>

                {invoice.amountPaid > 0 && (
                  <div className="flex justify-between items-center mt-2 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <span className="font-bold text-emerald-700 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Amount Paid
                    </span>
                    <span className="font-black text-emerald-700">₹{invoice.amountPaid.toLocaleString()}</span>
                  </div>
                )}

                {(invoice.totalAmount - invoice.amountPaid) > 0 && (
                  <div className="flex justify-between items-center mt-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="font-bold text-slate-700">Balance Due</span>
                    <span className="font-black text-slate-800 text-xl">₹{(invoice.totalAmount - invoice.amountPaid).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Stamp decoration */}
            {invoice.status === 'PAID' && (
              <div className="absolute top-1/2 right-12 -translate-y-1/2 rotate-[-15deg] opacity-20 pointer-events-none">
                <div className="border-8 border-emerald-500 text-emerald-500 font-black text-6xl uppercase tracking-widest p-4 rounded-2xl">
                  PAID
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Actions & Timeline */}
        <div className="flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" /> Payment Timeline
            </h3>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2">
                  <span className="font-bold text-slate-700">Invoice Generated</span>
                  <span className="text-xs font-bold text-slate-400">01 {invoice.month} {invoice.year}</span>
                </div>
              </div>

              <div className="relative mb-6">
                <div className={`absolute -left-[30px] w-4 h-4 bg-white border-4 rounded-full z-10 top-1 ${invoice.status === 'OVERDUE' ? 'border-[#FF7A7A]' : 'border-slate-200'}`} />
                <div className="flex flex-col ml-2">
                  <span className={`font-bold ${invoice.status === 'OVERDUE' ? 'text-[#FF7A7A]' : 'text-slate-700'}`}>Due Date</span>
                  <span className={`text-xs font-bold ${invoice.status === 'OVERDUE' ? 'text-[#FF7A7A]' : 'text-slate-400'}`}>{invoice.dueDate}</span>
                </div>
              </div>

              {invoice.paymentDate && (
                <div className="relative">
                  <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#72F1D1] rounded-full z-10 top-1" />
                  <div className="flex flex-col ml-2">
                    <span className="font-bold text-[#72F1D1]">Payment Received</span>
                    <span className="text-xs font-bold text-slate-400">{invoice.paymentDate}</span>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" /> Actions
            </h3>
            <div className="flex flex-col gap-3">
              {invoice.status !== 'PAID' && (
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#8F7CFF]/10 hover:bg-[#8F7CFF] text-[#8F7CFF] hover:text-white font-bold text-sm transition-colors border border-transparent shadow-sm group">
                  <CreditCard className="w-4 h-4" /> Record Manual Payment
                </button>
              )}
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm group">
                <Printer className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" /> Print Invoice
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-transparent hover:border-slate-100 group">
                <span className="flex items-center gap-3 group-hover:text-[#FF7A7A] transition-colors text-slate-600">
                  <Banknote className="w-4 h-4 text-slate-400 group-hover:text-[#FF7A7A]" /> Adjust Penalty
                </span>
              </button>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, CreditCard, Droplets, Zap, Flame, CheckCircle2 } from "lucide-react";
import type { UtilityBill } from "../../../../services/payment.service";

interface Props {
  bill: UtilityBill | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UtilityDetailsDrawer({ bill, isOpen, onClose }: Props) {
  if (!bill) return null;

  const totalAmount = bill.amount + bill.tax;
  const isPaid = bill.status === "PAID";

  const renderIcon = () => {
    switch (bill.utilityType) {
      case "Water": return <Droplets className="w-8 h-8 text-[#3DD9FF]" />;
      case "Electricity": return <Zap className="w-8 h-8 text-amber-500" />;
      case "Gas": return <Flame className="w-8 h-8 text-red-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-lg font-heading font-black text-slate-800 flex items-center gap-2">
                Utility Details
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total Hero */}
            <div className="p-8 flex flex-col items-center bg-slate-50 border-b border-slate-100 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                {renderIcon()}
              </div>
              <span className="px-3 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded-full uppercase tracking-wider mb-2">
                {bill.billNumber}
              </span>
              <span className="text-sm font-bold text-slate-500 mb-2">{bill.utilityType} Bill • {bill.billingMonth}</span>
              <h3 className="text-4xl font-heading font-black text-slate-800 tracking-tighter mb-4">₹{totalAmount.toLocaleString()}</h3>
              
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                isPaid ? "bg-emerald-100 text-emerald-700" :
                bill.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-700"
              }`}>
                {isPaid && <CheckCircle2 className="w-4 h-4" />}
                {bill.status}
              </div>
            </div>

            {/* Breakdown */}
            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meter Readings</h4>
                <div className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Previous Reading</span>
                    <span className="font-bold text-slate-800">{bill.meterReading.previous}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Current Reading</span>
                    <span className="font-bold text-slate-800">{bill.meterReading.current}</span>
                  </div>
                  <hr className="border-slate-100 my-1" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-slate-800">Total Consumption</span>
                    <span className="font-black text-[#8F7CFF]">{bill.consumption}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Charges</h4>
                
                <div className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Base Amount</span>
                    <span className="font-bold text-slate-800">₹{bill.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">Taxes</span>
                    <span className="font-bold text-slate-800">₹{bill.tax.toLocaleString()}</span>
                  </div>
                  
                  <hr className="border-slate-100 my-1" />
                  
                  <div className="flex items-center justify-between text-base mt-2 pt-2 border-t border-slate-200">
                    <span className="font-black text-slate-800">Total Payable</span>
                    <span className="font-black text-slate-800">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-4">
                {!isPaid && (
                  <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                    <CreditCard className="w-4 h-4" /> Pay ₹{totalAmount.toLocaleString()} Now
                  </button>
                )}
                <button className="w-full py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Bill
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

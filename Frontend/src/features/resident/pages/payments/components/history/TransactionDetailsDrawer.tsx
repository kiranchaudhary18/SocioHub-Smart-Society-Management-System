import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldCheck, CheckCircle2, AlertCircle, Hash, Building2, Banknote } from "lucide-react";
import type { PaymentTransaction } from "../../../../services/payment.service";

interface Props {
  transaction: PaymentTransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionDetailsDrawer({ transaction, isOpen, onClose }: Props) {
  if (!transaction) return null;

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
              <h2 className="text-lg font-heading font-black text-slate-800">Transaction Details</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total Hero */}
            <div className="p-8 flex flex-col items-center bg-slate-50 border-b border-slate-100 text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                transaction.status === "SUCCESS" ? "bg-emerald-100 text-emerald-600" :
                transaction.status === "FAILED" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
              }`}>
                {transaction.status === "SUCCESS" ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
              </div>
              
              <h3 className="text-4xl font-heading font-black text-slate-800 tracking-tighter mb-2">₹{transaction.amount.toLocaleString()}</h3>
              <span className="text-sm font-bold text-slate-500 mb-4">{transaction.paymentType} Payment</span>
              
              <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-full font-mono tracking-wider">
                {transaction.transactionId}
              </span>
            </div>

            {/* Breakdown */}
            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Payment Information</h4>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Method</span>
                    <span className="text-sm font-bold text-slate-800">{transaction.paymentMethod} via {transaction.paymentGateway}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Hash className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Reference Number</span>
                    <span className="text-sm font-bold text-slate-800">{transaction.referenceNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Billed Against Invoice</span>
                    <span className="text-sm font-bold text-slate-800">{transaction.invoiceNumber}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex items-center gap-3 p-4 bg-[#8F7CFF]/5 border border-[#8F7CFF]/20 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-[#8F7CFF] shrink-0" />
                <p className="text-xs font-medium text-slate-600">
                  This transaction is securely processed by {transaction.paymentGateway}. Retain the Transaction ID for any disputes.
                </p>
              </div>

              {/* Actions */}
              {transaction.status === "SUCCESS" && transaction.receiptNumber && (
                <div className="flex flex-col gap-3 mt-2">
                  <button className="w-full py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Receipt ({transaction.receiptNumber})
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

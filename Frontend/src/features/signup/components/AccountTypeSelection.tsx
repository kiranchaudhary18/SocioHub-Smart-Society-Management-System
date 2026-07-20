import { motion } from "framer-motion";
import { Building2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AccountTypeSelectionProps {
  onSelect: (type: 'ADMIN' | 'RESIDENT') => void;
}

export function AccountTypeSelection({ onSelect }: AccountTypeSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full flex flex-col items-center xl:items-start"
    >
      <div className="text-center xl:text-left mb-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto xl:mx-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] flex items-center justify-center shadow-lg mb-3"
        >
          <span className="text-xl font-heading font-black text-white">S</span>
        </motion.div>
        <h1 className="text-xl sm:text-[24px] font-heading font-extrabold text-slate-900 tracking-tight mb-1">
          Select Account Type
        </h1>
        <p className="text-slate-500 font-medium text-sm">
          Choose how you want to join the platform
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-[500px]">
        {/* Admin Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="group relative bg-white/60 backdrop-blur-2xl border border-slate-200/60 hover:border-[#8F7CFF]/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.1)] rounded-[20px] p-4 sm:p-5 cursor-pointer transition-all duration-300"
          onClick={() => onSelect('ADMIN')}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#8F7CFF]/10 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-[#8F7CFF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#8F7CFF] transition-colors">
                Society Admin
              </h3>
              <p className="text-xs font-bold text-slate-400 mb-2">Secretary / Chairman</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-3">
                Create your society and manage residents, maintenance, visitors, parking, payments, complaints and security.
              </p>
              <Button 
                variant="outline" 
                className="w-full rounded-xl h-9 font-bold text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors text-xs sm:text-sm"
              >
                Continue as Society Admin
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Resident Card */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className="group relative bg-white/60 backdrop-blur-2xl border border-slate-200/60 hover:border-[#3DD9FF]/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(61,217,255,0.1)] rounded-[20px] p-4 sm:p-5 cursor-pointer transition-all duration-300"
          onClick={() => onSelect('RESIDENT')}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#3DD9FF]/10 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-[#3DD9FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-[#3DD9FF] transition-colors">
                Resident
              </h3>
              <p className="text-xs font-bold text-slate-400 mb-2">Owner / Tenant</p>
              <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed mb-3">
                Join your society, manage visitors, pay maintenance, raise complaints, book amenities and receive notices.
              </p>
              <Button 
                variant="outline" 
                className="w-full rounded-xl h-9 font-bold text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-colors text-xs sm:text-sm"
              >
                Continue as Resident
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

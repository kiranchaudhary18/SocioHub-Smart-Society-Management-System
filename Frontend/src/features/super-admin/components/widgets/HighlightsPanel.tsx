import { motion } from "framer-motion";
import { Sparkles, Calendar as CalendarIcon, ArrowRight } from "lucide-react";

export function HighlightsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_rgba(143,124,255,0.2)] text-white relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16 mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#72F1D1]/30 rounded-full blur-3xl -ml-12 -mb-12 mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-8">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-heading font-black mb-2">Weekly Insights</h3>
          <p className="text-white/80 font-medium text-sm leading-relaxed max-w-[90%]">
            SocioHub has seen a 12% increase in active residents this week. 
            Consider running an engagement campaign.
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-white/70">Upcoming Event</p>
              <p className="text-sm font-bold">Platform Maintenance</p>
            </div>
          </div>
          
          <button className="w-full bg-white text-[#8F7CFF] rounded-2xl py-3.5 font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-lg shadow-black/5 mt-4">
            View Full Report
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

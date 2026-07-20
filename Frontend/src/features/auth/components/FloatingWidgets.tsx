import { motion } from "framer-motion"
import { ShieldCheck, CreditCard, CheckCircle2, AlertTriangle, Users } from "lucide-react"

export function FloatingWidgets() {
  return (
    <div className="relative w-full h-[600px] hidden xl:flex items-center justify-center pointer-events-none z-10">
      
      {/* Central Anchor / Logo Representation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.3 }}
        className="absolute w-32 h-32 rounded-3xl bg-white/40 border border-white/60 shadow-[0_8px_32px_rgba(114,241,209,0.1)] backdrop-blur-md flex items-center justify-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#72F1D1] to-[#3DD9FF] flex items-center justify-center shadow-lg">
          <span className="text-3xl font-heading font-black text-white">S</span>
        </div>
      </motion.div>

      {/* Widget 1: Visitor Approved (Top Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -60, y: -60 }}
        animate={{ opacity: 1, x: -180, y: -120 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.1 }}
        className="absolute bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex items-center gap-4 w-[260px]"
      >
        <div className="w-12 h-12 rounded-full bg-[#8F7CFF]/10 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6 text-[#8F7CFF]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">Visitor Approved</p>
          <p className="text-xs text-slate-500 font-medium truncate">Gate 1 • 2 mins ago</p>
        </div>
      </motion.div>

      {/* Widget 2: Maintenance Paid (Bottom Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 60, y: 60 }}
        animate={{ opacity: 1, x: 180, y: 140 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.2 }}
        className="absolute bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex items-center gap-4 w-[260px]"
      >
        <div className="w-12 h-12 rounded-full bg-[#72F1D1]/20 flex items-center justify-center shrink-0">
          <CreditCard className="w-6 h-6 text-[#10b981]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">Maintenance Paid</p>
          <p className="text-xs text-slate-500 font-medium truncate">Flat 402 • ₹4,500</p>
        </div>
      </motion.div>

      {/* Widget 3: Security Alert (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 60, y: -60 }}
        animate={{ opacity: 1, x: 160, y: -80 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.3 }}
        className="absolute bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex items-center gap-4 w-[220px]"
      >
        <div className="w-10 h-10 rounded-full bg-[#FF5DA2]/10 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-[#FF5DA2]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">Gate Alert</p>
          <p className="text-xs text-slate-500 font-medium truncate">Tailgating detected</p>
        </div>
      </motion.div>

      {/* Widget 4: Residents Online (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -60, y: 60 }}
        animate={{ opacity: 1, x: -160, y: 100 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4, delay: 0.4 }}
        className="absolute bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_16px_40px_rgba(0,0,0,0.04)] rounded-[24px] p-4 flex items-center gap-4 w-[200px]"
      >
        <div className="w-10 h-10 rounded-full bg-[#3DD9FF]/10 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5 text-[#3DD9FF]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold font-heading text-slate-800 leading-none">142</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Residents Active</p>
        </div>
      </motion.div>

      {/* Widget 5: Small Success (Far Left) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, x: -280, y: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5, delay: 0.5 }}
        className="absolute bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg rounded-full px-4 py-2 flex items-center gap-2"
      >
        <CheckCircle2 className="w-4 h-4 text-[#8BF178]" />
        <span className="text-xs font-bold text-slate-700">All Systems Normal</span>
      </motion.div>

      {/* Floating Animations */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
      />

    </div>
  )
}

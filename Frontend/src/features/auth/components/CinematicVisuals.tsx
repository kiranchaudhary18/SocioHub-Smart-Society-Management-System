import { motion } from "framer-motion"
import { Building2, ShieldCheck, CreditCard, Activity, CheckCircle2 } from "lucide-react"

export function CinematicVisuals() {
  return (
    <div className="relative hidden xl:flex flex-col justify-between h-full p-16 overflow-hidden bg-[#0A0A0B]">
      
      {/* Immersive Background Canvas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep background mesh */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Animated Aurora Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-aurora-mint blur-[140px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full bg-aurora-purple blur-[140px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full bg-aurora-aqua blur-[160px]"
        />
      </div>

      {/* Top Section: Branding */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-aurora-mint to-aurora-aqua flex items-center justify-center shadow-[0_0_40px_rgba(114,241,209,0.4)]">
          <Building2 className="w-6 h-6 text-[#0A0A0B]" />
        </div>
        <span className="text-3xl font-bold font-heading tracking-tight text-white">ResiCore</span>
      </div>

      {/* Middle Section: Floating Dashboard Simulation */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-12 pointer-events-none">
        <div className="relative w-full max-w-xl aspect-square">
          
          {/* Main Central Stat */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-strong rounded-[32px] p-8 w-64 border border-white/10 shadow-2xl backdrop-blur-3xl"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-aurora-mint/10 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-2 border-aurora-mint/30 border-t-aurora-mint animate-spin-slow" />
                <Activity className="w-8 h-8 text-aurora-mint" />
              </div>
              <div>
                <p className="text-4xl font-heading font-bold text-white tracking-tight">99.9%</p>
                <p className="text-sm font-medium text-white/50 mt-1">Platform Uptime</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Widget 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -40, y: -40 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 0.2 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute top-[15%] left-[5%] glass-light rounded-2xl p-4 flex items-center gap-4 w-[240px] border border-white/5 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-aurora-purple/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-aurora-purple" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Visitor Approved</p>
              <p className="text-xs text-white/50 truncate">Gate 1 • 2 mins ago</p>
            </div>
          </motion.div>

          {/* Floating Widget 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 0.4 }, y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
            className="absolute bottom-[20%] right-[5%] glass-light rounded-2xl p-4 flex items-center gap-4 w-[240px] border border-white/5 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-aurora-aqua/20 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-aurora-aqua" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Maintenance Paid</p>
              <p className="text-xs text-white/50 truncate">Flat 402 • ₹4,500</p>
            </div>
          </motion.div>

          {/* Floating Widget 3 (Small) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{ opacity: { duration: 0.8, delay: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
            className="absolute top-[30%] right-[10%] glass-light rounded-full pl-2 pr-4 py-2 flex items-center gap-3 border border-white/5 shadow-xl"
          >
            <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
            </div>
            <span className="text-xs font-semibold text-white">System Secure</span>
          </motion.div>

        </div>
      </div>

      {/* Bottom Section: Typography */}
      <div className="relative z-10 max-w-xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[40px] leading-[1.1] font-heading font-bold text-white tracking-tight"
        >
          Manage your society with <span className="bg-gradient-to-r from-aurora-mint to-aurora-aqua bg-clip-text text-transparent">intelligent</span> precision.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/60 mt-6 leading-relaxed max-w-md"
        >
          Join thousands of modern communities automating their maintenance, security, and resident engagement.
        </motion.p>
      </div>

    </div>
  )
}

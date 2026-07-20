import { motion } from "framer-motion"
import { Building2, ShieldCheck, CreditCard } from "lucide-react"

export function AuthBranding() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full p-12 bg-zinc-950 overflow-hidden">
      
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-aurora-mint/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-aurora-purple/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80%] h-[80%] rounded-full bg-aurora-aqua/20 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-mint to-aurora-aqua flex items-center justify-center shadow-glow">
            <Building2 className="w-6 h-6 text-zinc-950" />
          </div>
          <span className="text-2xl font-bold font-heading tracking-tight text-white">SocioHub</span>
        </div>
      </div>

      <div className="relative z-10 max-w-lg mt-auto mb-20 space-y-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-heading font-bold text-white leading-[1.1]"
        >
          Manage your society with <span className="bg-gradient-to-r from-aurora-mint to-aurora-aqua bg-clip-text text-transparent">intelligent</span> precision.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-zinc-400"
        >
          Join thousands of modern communities automating their maintenance, security, and resident engagement.
        </motion.p>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-1/3 right-12 z-10 space-y-4">
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="glass-strong rounded-2xl p-4 flex items-center gap-4 w-[280px] border border-white/10 shadow-2xl"
        >
          <div className="w-12 h-12 rounded-full bg-aurora-purple/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-aurora-purple" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Visitor Approved</p>
            <p className="text-xs text-zinc-400">Tower A • 2 mins ago</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
          className="glass-strong rounded-2xl p-4 flex items-center gap-4 w-[280px] border border-white/10 shadow-2xl -ml-12"
        >
          <div className="w-12 h-12 rounded-full bg-aurora-mint/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-aurora-mint" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Maintenance Paid</p>
            <p className="text-xs text-zinc-400">Flat 402 • ₹4,500</p>
          </div>
        </motion.div>

      </div>

    </div>
  )
}

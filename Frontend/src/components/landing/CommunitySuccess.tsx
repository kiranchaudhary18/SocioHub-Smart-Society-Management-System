import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, ShieldCheck, Zap, HeartHandshake, Activity, CheckCircle2 } from "lucide-react";

export function CommunitySuccess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Floating Badges Data
  const badges = [
    { text: "Fast Visitor Entry", icon: Zap, color: "text-aurora-mint", bg: "bg-aurora-mint/10", border: "border-aurora-mint/30", delay: 0, top: "10%", left: "5%" },
    { text: "100% Digital Records", icon: ShieldCheck, color: "text-aurora-aqua", bg: "bg-aurora-aqua/10", border: "border-aurora-aqua/30", delay: 1, top: "40%", right: "5%" },
    { text: "Real-Time Communication", icon: Activity, color: "text-aurora-pink", bg: "bg-aurora-pink/10", border: "border-aurora-pink/30", delay: 0.5, bottom: "20%", left: "10%" },
    { text: "Emergency Ready", icon: HeartHandshake, color: "text-aurora-coral", bg: "bg-aurora-coral/10", border: "border-aurora-coral/30", delay: 1.5, bottom: "10%", right: "15%" },
  ];

  return (
    <section ref={containerRef} className="py-32 relative bg-background overflow-hidden">
      
      {/* Background Aurora */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-aurora-mint rounded-full blur-[150px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-aurora-lavender rounded-full blur-[150px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute top-[40%] left-[50%] w-[40vw] h-[40vw] bg-aurora-aqua rounded-full blur-[150px] mix-blend-multiply" />
        
        {/* Soft Particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-50" />
      </div>

      {/* Floating Badges */}
      {badges.map((badge, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1, y: [0, -20, 0] } : {}}
          transition={{ opacity: { duration: 0.8, delay: badge.delay }, scale: { duration: 0.8, delay: badge.delay }, y: { duration: 4, repeat: Infinity, delay: badge.delay } }}
          className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${badge.bg} ${badge.border} z-0 shadow-lg`}
          style={{ top: badge.top, left: badge.left, right: badge.right, bottom: badge.bottom }}
        >
          <badge.icon className={`h-4 w-4 ${badge.color}`} />
          <span className="text-sm font-bold text-foreground">{badge.text}</span>
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] md:text-[5rem] leading-[1.05] font-heading font-black tracking-tight text-foreground mb-6"
          >
            Built For People.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-lavender to-aurora-mint">
              Trusted By Communities.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto"
          >
            Experience the heartbeat of thousands of thriving neighborhoods powered by ResiCore.
          </motion.p>
        </div>

        {/* ==========================================
            MODULE 1: LIVE COMMUNITY METRICS
            ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {[
            { label: "Communities", value: "1,200+", color: "text-aurora-mint" },
            { label: "Residents", value: "4.5M", color: "text-aurora-aqua" },
            { label: "Complaints Fixed", value: "99%", color: "text-aurora-pink" },
            { label: "Maintenance Paid", value: "₹2B+", color: "text-aurora-gold" }
          ].map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="text-center p-6 bg-white/20 backdrop-blur-2xl rounded-3xl border border-white/40 shadow-sm hover:scale-105 transition-transform duration-500"
            >
              <h3 className={`text-4xl md:text-5xl font-numbers font-black mb-2 ${metric.color}`}>{metric.value}</h3>
              <p className="text-sm md:text-base font-semibold text-muted-foreground uppercase tracking-widest">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ==========================================
            MODULE 2 & 3: SNAPSHOTS & TRANSFORMATIONS
            ========================================== */}
        <div className="grid lg:grid-cols-12 gap-8 mb-32 perspective-1000">
          
          {/* Snapshots (Left) */}
          <motion.div 
            initial={{ opacity: 0, rotateY: -10, x: -50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 bg-white/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/60 shadow-[0_40px_100px_-20px_rgba(143,124,255,0.15)] relative overflow-hidden group hover:rotate-y-2 transition-transform duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-lavender/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="inline-flex px-4 py-1.5 bg-aurora-lavender/20 text-aurora-lavender border border-aurora-lavender/30 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Live Snapshot
                </div>
                <h3 className="text-4xl font-heading font-black text-foreground mb-2">Skyline Heights</h3>
                <p className="text-muted-foreground font-light mb-8">Premium Residential Complex • 12 Towers</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-2xl p-4 border border-white/60 shadow-sm flex items-center gap-4">
                  <div className="h-12 w-12 bg-success/20 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-numbers font-black">92%</p>
                    <p className="text-xs text-muted-foreground font-semibold">Occupancy</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-aurora-pink/20 to-aurora-gold/20 rounded-2xl p-4 border border-white/60 shadow-sm flex flex-col justify-center overflow-hidden relative">
                  <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-white/20 skew-x-12" />
                  <p className="text-sm font-bold text-foreground">Upcoming Festival</p>
                  <p className="text-xs text-muted-foreground">Diwali Celebration • Tomorrow</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transformation Story (Right) */}
          <motion.div 
            initial={{ opacity: 0, rotateY: 10, x: 50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 bg-white/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/60 shadow-[0_40px_100px_-20px_rgba(61,217,255,0.15)] relative overflow-hidden group hover:-rotate-y-2 transition-transform duration-700"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-aqua/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-black text-foreground mb-8">The Transformation</h3>
              
              <div className="space-y-8">
                {/* Story 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-bold text-foreground">Visitor Queue Time</p>
                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">93% Faster</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-destructive font-bold line-through">5 Mins</span>
                    <div className="flex-1 h-3 bg-border rounded-full overflow-hidden relative">
                       <motion.div 
                         initial={{ width: "100%", backgroundColor: "#ef4444" }}
                         whileInView={{ width: "15%", backgroundColor: "#22c55e" }}
                         transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                         className="absolute top-0 left-0 h-full rounded-full"
                       />
                    </div>
                    <span className="text-xs text-success font-bold">20 Secs</span>
                  </div>
                </div>

                {/* Story 2 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-bold text-foreground">Maintenance Collection</p>
                    <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">40% Increase</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-bold">Old</span>
                    <div className="flex-1 h-3 bg-border rounded-full overflow-hidden relative">
                       <motion.div 
                         initial={{ width: "60%" }}
                         whileInView={{ width: "100%" }}
                         transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                         className="absolute top-0 left-0 h-full rounded-full bg-aurora-gold"
                       />
                    </div>
                    <span className="text-xs text-aurora-gold font-bold">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==========================================
            MODULE 4 & 5: LIVE FEED & MARQUEE
            ========================================== */}
        <div className="relative -mx-6 md:-mx-20 px-6 md:px-20 py-20 bg-white/10 backdrop-blur-xl border-y border-white/20 shadow-inner overflow-hidden mb-32">
          
          <div className="text-center mb-12">
            <h3 className="text-2xl font-heading font-black text-foreground">A Network of Excellence</h3>
            <p className="text-muted-foreground font-light text-sm">Join the fastest growing residential ecosystem.</p>
          </div>

          {/* Marquee 1 */}
          <div className="flex whitespace-nowrap overflow-hidden mb-6 hover:[animation-play-state:paused]">
            <motion.div 
              animate={{ x: [0, -1000] }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 items-center"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  {["Luxury Villas", "Residential Towers", "Smart Housing", "Townships", "Gated Communities", "Co-op Housing"].map((tag, j) => (
                    <div key={j} className="px-6 py-3 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-sm text-foreground font-bold text-sm flex items-center gap-2 cursor-pointer hover:bg-white hover:scale-105 transition-all">
                      <CheckCircle2 className="h-4 w-4 text-aurora-mint" /> {tag}
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Activity Orbit Feed (Marquee 2 - Reverse) */}
          <div className="flex whitespace-nowrap overflow-hidden hover:[animation-play-state:paused]">
            <motion.div 
              animate={{ x: [-1000, 0] }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 items-center"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  {[
                    { text: "Visitor Approved • 2s ago", color: "text-aurora-aqua", bg: "bg-aurora-aqua/10", border: "border-aurora-aqua/30" },
                    { text: "Maintenance Paid • 12s ago", color: "text-aurora-gold", bg: "bg-aurora-gold/10", border: "border-aurora-gold/30" },
                    { text: "Complaint Resolved • 45s ago", color: "text-aurora-pink", bg: "bg-aurora-pink/10", border: "border-aurora-pink/30" },
                    { text: "Drill Scheduled • 1m ago", color: "text-aurora-coral", bg: "bg-aurora-coral/10", border: "border-aurora-coral/30" }
                  ].map((activity, j) => (
                    <div key={j} className={`px-5 py-2 ${activity.bg} backdrop-blur-md rounded-2xl border ${activity.border} shadow-sm flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform`}>
                      <span className={`h-2 w-2 rounded-full ${activity.color.replace('text-', 'bg-')} animate-pulse`} />
                      <span className={`font-semibold text-xs ${activity.color}`}>{activity.text}</span>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

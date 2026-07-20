import { motion } from "framer-motion";
import { Sparkles, Zap, ShieldCheck } from "lucide-react";

export function BentoEcosystem() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-aurora-mint/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl font-heading font-black tracking-tight text-foreground mb-6"
          >
            A Ecosystem Designed <br className="hidden md:block" /> for Fluidity.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground font-light"
          >
            Every module works together seamlessly, eliminating friction for residents, guards, and management.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Main 2x2 Bento Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 p-10 min-h-[400px] flex flex-col justify-end shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-lavender/20 to-aurora-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-10 right-10">
              <Sparkles className="h-10 w-10 text-aurora-lavender" />
            </div>
            
            {/* Abstract visual representation */}
            <div className="absolute top-10 left-10 right-24 bottom-48 border border-border/50 rounded-2xl bg-white/40 shadow-sm overflow-hidden flex flex-col">
               <div className="h-10 border-b border-border/50 bg-white/50 flex items-center px-4 gap-2">
                 <div className="h-2 w-2 rounded-full bg-destructive/50" />
                 <div className="h-2 w-2 rounded-full bg-warning/50" />
                 <div className="h-2 w-2 rounded-full bg-success/50" />
               </div>
               <div className="flex-1 p-4 flex gap-4">
                 <div className="w-1/3 bg-muted/30 rounded-xl" />
                 <div className="w-2/3 flex flex-col gap-4">
                   <div className="h-1/2 bg-aurora-lavender/10 rounded-xl border border-aurora-lavender/20" />
                   <div className="h-1/2 bg-muted/30 rounded-xl" />
                 </div>
               </div>
            </div>

            <div className="relative z-10 mt-auto">
              <h3 className="text-3xl font-heading font-bold text-foreground mb-3 tracking-tight">Intelligent Visitor Engine</h3>
              <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
                Pre-approve guests, track deliveries, and secure your perimeter with zero-wait digital logs.
              </p>
            </div>
          </motion.div>

          {/* 1x1 Bento Card 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 p-8 min-h-[300px] flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-aurora-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-14 w-14 rounded-2xl bg-aurora-gold/10 border border-aurora-gold/20 flex items-center justify-center mb-auto">
              <Zap className="h-6 w-6 text-aurora-gold" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2 tracking-tight">Financial Autopilot</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automated billing, instant receipts, and transparent ledgers for every resident.
              </p>
            </div>
          </motion.div>

          {/* 1x1 Bento Card 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-[2.5rem] bg-white/60 backdrop-blur-2xl border border-white/80 p-8 min-h-[300px] flex flex-col shadow-xl hover:shadow-2xl transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-aurora-aqua/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="h-14 w-14 rounded-2xl bg-aurora-aqua/10 border border-aurora-aqua/20 flex items-center justify-center mb-auto">
              <ShieldCheck className="h-6 w-6 text-aurora-aqua" />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2 tracking-tight">Frictionless Maintenance</h3>
              <p className="text-muted-foreground leading-relaxed">
                Log issues, assign staff, and track resolution times with beautiful precision.
              </p>
            </div>
          </motion.div>

          {/* Bottom 1x3 Wide Bento Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-3 group relative overflow-hidden rounded-[2.5rem] bg-foreground text-background p-10 min-h-[250px] flex flex-col md:flex-row items-center gap-10 shadow-2xl"
          >
            {/* Dark background requires inner glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-mint/10 via-aurora-aqua/5 to-transparent pointer-events-none" />
            
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium mb-6">
                <span className="flex h-2 w-2 rounded-full bg-aurora-lime" />
                Real-time Analytics
              </div>
              <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight">The Pulse of Your Community</h3>
              <p className="text-muted max-w-xl text-lg leading-relaxed">
                See exactly what's happening at any given moment. From staff attendance to water tank levels, data has never looked this beautiful.
              </p>
            </div>
            
            <div className="flex-1 w-full relative z-10 flex justify-end">
              {/* Fake Graph */}
              <div className="w-full max-w-sm h-32 flex items-end gap-3 opacity-80">
                {[30, 45, 60, 40, 80, 55, 95, 70, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 bg-gradient-to-t from-aurora-aqua/80 to-aurora-mint rounded-t-sm"
                  />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

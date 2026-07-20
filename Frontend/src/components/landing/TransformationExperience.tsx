import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { QrCode, Wallet, FileText, CheckCircle2 } from "lucide-react";

export function TransformationExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the clip-path inset from the right (100% means fully clipped/hidden, 0% means fully visible)
  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-slate-50">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* =========================================================================
            LAYER 1: THE PAST (Bottom Layer, always visible but covered by Layer 2)
            ========================================================================= */}
        <div className="absolute inset-0 bg-slate-100 flex flex-col items-center pt-24 px-6 grayscale-[0.8] transition-all">
          
          <div className="text-center z-10 mb-16 opacity-60">
             <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-800 mb-4">
                The Old Way.
             </h2>
             <p className="text-lg text-slate-600 font-medium">
                Chaos. Paperwork. Confusion.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl">
            
            {/* Messy Register */}
            <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="bg-yellow-50 p-6 shadow-md border border-slate-300 rounded-sm relative">
               <div className="absolute top-2 right-2 h-4 w-12 bg-red-200/50 -rotate-6" />
               <h3 className="font-serif font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Visitor Register</h3>
               <div className="space-y-3">
                 <div className="h-6 w-full border-b border-slate-300 border-dashed text-slate-400 font-handwriting">Priya - 10:30 AM</div>
                 <div className="h-6 w-full border-b border-slate-300 border-dashed text-slate-400 font-handwriting">Delivery - 11:15 AM</div>
                 <div className="h-6 w-full border-b border-slate-300 border-dashed text-slate-400 font-handwriting">Plumber - ???</div>
               </div>
            </motion.div>

            {/* Messy Complaints */}
            <motion.div animate={{ rotate: [1, -1, 1], y: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="bg-white p-6 shadow-md border border-slate-300 rounded-sm relative">
               <div className="absolute -top-3 -right-3 px-3 py-1 bg-red-100 text-red-600 text-xs font-bold border border-red-300 rotate-12 shadow-sm">MISSED</div>
               <h3 className="font-serif font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="h-4 w-4" /> Sticky Notes</h3>
               <div className="flex gap-2">
                 <div className="h-24 w-24 bg-yellow-100 shadow-sm p-2 rotate-3 border border-yellow-200"><div className="h-1 w-12 bg-slate-300 mb-1"/><div className="h-1 w-8 bg-slate-300"/></div>
                 <div className="h-24 w-24 bg-pink-100 shadow-sm p-2 -rotate-6 border border-pink-200"><div className="h-1 w-10 bg-slate-300 mb-1"/><div className="h-1 w-14 bg-slate-300"/></div>
               </div>
            </motion.div>

            {/* Messy Payments */}
            <motion.div animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="bg-white p-6 shadow-md border border-slate-300 rounded-sm col-span-1 md:col-span-2 max-w-2xl mx-auto w-full">
               <h3 className="font-serif font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">Maintenance.xlsx</h3>
               <div className="grid grid-cols-4 border border-slate-300">
                 <div className="p-2 border-r border-b border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">Flat</div>
                 <div className="p-2 border-r border-b border-slate-300 bg-slate-100 text-xs font-bold text-slate-600">Amount</div>
                 <div className="p-2 border-b border-slate-300 bg-slate-100 text-xs font-bold text-slate-600 col-span-2">Status</div>
                 
                 <div className="p-2 border-r border-slate-300 text-sm">A-101</div>
                 <div className="p-2 border-r border-slate-300 text-sm">₹4,500</div>
                 <div className="p-2 text-sm text-red-500 font-bold col-span-2 bg-red-50">Late (45 Days)</div>
               </div>
            </motion.div>

          </div>
        </div>

        {/* =========================================================================
            LAYER 2: SOCIOHUB (Top Layer, revealed by wiping clip-path)
            ========================================================================= */}
        <motion.div 
          style={{ clipPath }}
          className="absolute inset-0 bg-background flex flex-col items-center pt-24 px-6 z-20"
        >
          {/* Glowing Aurora Backgrounds */}
          <div className="absolute inset-0 pointer-events-none -z-10">
             <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] bg-aurora-mint rounded-full blur-[150px] mix-blend-multiply opacity-30" />
             <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] bg-aurora-pink rounded-full blur-[150px] mix-blend-multiply opacity-20" />
             <div className="absolute bottom-[20%] left-[30%] w-[60vw] h-[60vw] bg-aurora-aqua rounded-full blur-[150px] mix-blend-multiply opacity-20" />
          </div>

          <div className="text-center z-10 mb-16">
             <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-4">
                The Difference You Can Feel.
             </h2>
             <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
                Leave chaos behind. Step into a seamlessly connected ecosystem.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl perspective-1000">
            
            {/* SocioHub QR Entry */}
            <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(114,241,209,0.3)] border border-white/60 relative group hover:scale-[1.02] transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-aurora-mint/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
               <div className="relative z-10 flex items-center gap-6">
                 <div className="h-20 w-20 bg-aurora-mint/20 rounded-2xl flex items-center justify-center">
                    <QrCode className="h-10 w-10 text-aurora-mint" />
                 </div>
                 <div>
                   <h3 className="font-heading font-black text-xl text-foreground mb-1">Instant Entry</h3>
                   <div className="flex items-center gap-2">
                     <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                     <span className="text-sm font-bold text-success">Priya Approved • 0s wait</span>
                   </div>
                 </div>
               </div>
            </div>

            {/* SocioHub Kanban */}
            <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(255,93,162,0.3)] border border-white/60 relative group hover:scale-[1.02] transition-transform duration-500">
               <div className="absolute inset-0 bg-gradient-to-br from-aurora-pink/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
               <div className="relative z-10 flex items-center justify-between">
                 <div>
                   <h3 className="font-heading font-black text-xl text-foreground mb-1">Live Resolution</h3>
                   <p className="text-sm font-light text-muted-foreground mb-4">Tracked dynamically.</p>
                   <div className="h-2 w-32 bg-border rounded-full overflow-hidden">
                     <div className="h-full w-full bg-aurora-pink rounded-full" />
                   </div>
                 </div>
                 <div className="h-16 w-16 bg-aurora-pink/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-aurora-pink" />
                 </div>
               </div>
            </div>

            {/* SocioHub Payments */}
            <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(255,209,102,0.3)] border border-white/60 relative group hover:scale-[1.02] transition-transform duration-500 col-span-1 md:col-span-2 max-w-2xl mx-auto w-full flex items-center justify-between">
               <div className="absolute inset-0 bg-gradient-to-br from-aurora-gold/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
               <div className="relative z-10">
                 <h3 className="font-heading font-black text-2xl text-foreground mb-2">Automated Ledgers</h3>
                 <p className="text-sm font-light text-muted-foreground mb-4 max-w-sm">UPI integrated. Receipts auto-generated. Reminders sent silently.</p>
                 <div className="inline-flex px-3 py-1 bg-aurora-gold/20 border border-aurora-gold/30 rounded-full text-aurora-gold font-bold text-xs items-center gap-1">
                   <Wallet className="h-3 w-3" /> 100% Collected
                 </div>
               </div>
               
               <div className="relative z-10 h-24 w-24">
                 <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xl">
                    <path className="text-aurora-gold" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="100, 100" />
                 </svg>
               </div>
            </div>

          </div>
        </motion.div>

        {/* =========================================================================
            THE SLIDING DIVIDER LINE (Optional visual cue)
            ========================================================================= */}
        <motion.div 
          style={{ right: clipProgress }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,1)] z-30 pointer-events-none flex items-center justify-center transform translate-x-1/2"
        >
          <div className="h-16 w-8 bg-white rounded-full border border-border shadow-lg flex items-center justify-center">
            <div className="h-8 w-1 bg-border rounded-full" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

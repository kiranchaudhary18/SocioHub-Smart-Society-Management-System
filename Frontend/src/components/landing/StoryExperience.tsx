import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Users, Bell, Car, ClipboardList, Wallet, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

export function StoryExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Stage 1: The Foundation (0.0 - 0.25)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.9]);
  
  // Stage 2: The Migration (0.2 - 0.45)
  const s2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.45], [0, 1, 1, 0]);
  const s2Scale = useTransform(scrollYProgress, [0.15, 0.25, 0.45], [1.1, 1, 0.9]);

  // Stage 3: The Pulse (0.4 - 0.65)
  const s3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const s3Scale = useTransform(scrollYProgress, [0.35, 0.45, 0.65], [1.1, 1, 0.9]);

  // Stage 4: The Engine (0.6 - 0.85)
  const s4Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  const s4Scale = useTransform(scrollYProgress, [0.55, 0.65, 0.85], [1.1, 1, 0.9]);

  // Stage 5: The Harmony (0.8 - 1.0)
  const s5Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const s5Scale = useTransform(scrollYProgress, [0.75, 0.85, 1], [1.1, 1, 1]);

  // Dynamic Background Colors based on scroll progress
  const bgOpacityMint = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.1, 0.4, 0.1]);
  const bgOpacityLavender = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.1, 0.4, 0.1]);
  const bgOpacityAqua = useTransform(scrollYProgress, [0.4, 0.7, 1.0], [0.1, 0.4, 0.2]);
  const bgOpacityCoral = useTransform(scrollYProgress, [0.6, 0.9, 1.0], [0.0, 0.3, 0.5]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-background">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Dynamic Aurora Backgrounds */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <motion.div style={{ opacity: bgOpacityMint }} className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-aurora-mint rounded-full blur-[150px] mix-blend-multiply transition-opacity duration-300" />
          <motion.div style={{ opacity: bgOpacityLavender }} className="absolute top-[20%] right-[10%] w-[60vw] h-[60vw] bg-aurora-lavender rounded-full blur-[150px] mix-blend-multiply transition-opacity duration-300" />
          <motion.div style={{ opacity: bgOpacityAqua }} className="absolute bottom-[10%] left-[20%] w-[55vw] h-[55vw] bg-aurora-aqua rounded-full blur-[150px] mix-blend-multiply transition-opacity duration-300" />
          <motion.div style={{ opacity: bgOpacityCoral }} className="absolute bottom-[20%] right-[20%] w-[45vw] h-[45vw] bg-aurora-coral rounded-full blur-[150px] mix-blend-multiply transition-opacity duration-300" />
        </div>

        {/* Global Headline (Stays visible, changes slightly or just sits at top) */}
        <div className="absolute top-24 md:top-32 left-0 right-0 text-center z-50 px-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground mb-4">
            A Better Community, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-lavender to-aurora-aqua">
              One Moment At A Time.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Watch how SocioHub orchestrates thousands of daily interactions into one seamless, elegant experience.
          </p>
        </div>

        {/* =========================================================================
            STAGE 1: THE FOUNDATION (0.0 - 0.25) 
            ========================================================================= */}
        <motion.div 
          style={{ opacity: s1Opacity, scale: s1Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <div className="relative w-[800px] h-[500px] flex items-center justify-center perspective-1000">
            {/* Main Society Card */}
            <motion.div 
              initial={{ rotateX: 20, y: 50 }}
              animate={{ rotateX: 0, y: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-[400px] h-[250px] bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-[0_40px_100px_-20px_rgba(143,124,255,0.2)] p-8 flex flex-col justify-between relative z-20"
            >
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-2xl bg-aurora-lavender/20 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-aurora-lavender" />
                </div>
                <div className="px-3 py-1 bg-white/50 rounded-full border border-white text-xs font-bold text-aurora-lavender flex items-center gap-1 shadow-sm">
                  <Sparkles className="h-3 w-3" /> Activated
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">Society Created</p>
                <h3 className="text-3xl font-heading font-black text-foreground">Grand Horizon</h3>
              </div>
            </motion.div>

            {/* Glowing Access Code */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-20 bg-foreground text-background px-6 py-3 rounded-2xl shadow-xl z-30 flex items-center gap-3 border border-border/20"
            >
              <span className="text-sm font-light opacity-70">Access Code:</span>
              <span className="font-numbers font-bold text-lg tracking-widest text-aurora-mint">X7B9</span>
            </motion.div>

            {/* Background Blocks (Buildings appearing) */}
            <div className="absolute inset-0 flex items-center justify-center z-10 opacity-50">
               <motion.div animate={{ height: [0, 150] }} transition={{ duration: 1, delay: 0.5 }} className="w-24 bg-gradient-to-t from-white/40 to-transparent border border-white/40 rounded-t-xl absolute -left-10 bottom-[20%]" />
               <motion.div animate={{ height: [0, 250] }} transition={{ duration: 1.2, delay: 0.7 }} className="w-32 bg-gradient-to-t from-white/40 to-transparent border border-white/40 rounded-t-xl absolute -right-16 bottom-[10%]" />
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            STAGE 2: THE MIGRATION (0.2 - 0.45) 
            ========================================================================= */}
        <motion.div 
          style={{ opacity: s2Opacity, scale: s2Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <div className="relative w-[900px] h-[600px] flex items-center justify-center">
            
            {/* Center Hub */}
            <div className="w-64 h-64 bg-white/30 backdrop-blur-2xl rounded-full border border-white/50 flex flex-col items-center justify-center shadow-[0_0_100px_rgba(114,241,209,0.3)] relative z-20">
              <Users className="h-10 w-10 text-aurora-mint mb-2" />
              <motion.span 
                className="text-5xl font-numbers font-black text-foreground"
              >
                450
              </motion.span>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">Residents</p>
            </div>

            {/* Orbiting Avatars */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800 }}
                whileInView={{ opacity: 1, x: Math.sin(i) * 200, y: Math.cos(i) * 200 }}
                transition={{ duration: 2, delay: i * 0.1, type: "spring" }}
                className="absolute z-10 h-16 w-16 bg-white border-2 border-aurora-mint/30 rounded-full shadow-lg overflow-hidden flex items-center justify-center"
              >
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Migrate${i}`} alt="Resident" className="w-full h-full bg-aurora-mint/10" />
              </motion.div>
            ))}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full z-0 opacity-20">
               {[...Array(8)].map((_, i) => (
                  <motion.line 
                    key={i}
                    x1="450" y1="300" 
                    x2={450 + Math.sin(i) * 200} y2={300 + Math.cos(i) * 200} 
                    stroke="#72F1D1" strokeWidth="2" strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                  />
               ))}
            </svg>
          </div>
        </motion.div>

        {/* =========================================================================
            STAGE 3: THE PULSE (0.4 - 0.65) 
            ========================================================================= */}
        <motion.div 
          style={{ opacity: s3Opacity, scale: s3Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <div className="relative w-[1000px] h-[600px] flex items-center justify-center gap-10 perspective-1000">
            
            {/* Left: Visitor Approved */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotateY: 10 }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-72 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="h-10 w-10 bg-aurora-aqua/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-aurora-aqua" />
                </div>
                <span className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded-full">Approved</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Delivery" className="h-12 w-12 rounded-full bg-border" />
                <div>
                  <p className="font-bold text-foreground">Amazon Delivery</p>
                  <p className="text-xs text-muted-foreground">Arriving at Gate 1</p>
                </div>
              </div>
              <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 2 }}
                  className="h-full bg-aurora-aqua rounded-full" 
                />
              </div>
            </motion.div>

            {/* Center: Live Notice */}
            <motion.div 
              animate={{ y: [10, -10, 10], z: 50 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-80 bg-gradient-to-br from-aurora-lavender/20 to-aurora-pink/20 backdrop-blur-3xl border border-white/60 rounded-3xl p-8 shadow-2xl z-20"
            >
              <Bell className="h-8 w-8 text-foreground mb-4" />
              <h3 className="text-2xl font-heading font-black text-foreground mb-2">Water Supply Restored</h3>
              <p className="text-sm text-foreground/80 font-light mb-6">The maintenance on Block A is complete. Thank you for your patience.</p>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=See${i}`} className="h-8 w-8 rounded-full border border-white bg-white/50" />)}
                <div className="h-8 w-8 rounded-full border border-white bg-white/40 flex items-center justify-center text-xs font-bold">+42</div>
              </div>
            </motion.div>

            {/* Right: Parking Update */}
            <motion.div 
              animate={{ y: [-5, 5, -5], rotateY: -10 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-72 bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 bg-[#5CB338]/20 rounded-xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-[#5CB338]" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Guest Parking</p>
                  <p className="text-xs text-muted-foreground">Slot B-42</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`h-8 rounded-md ${i === 3 ? 'bg-[#5CB338] shadow-[0_0_15px_#5CB338]' : 'bg-white/50 border border-white'}`} />
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* =========================================================================
            STAGE 4: THE ENGINE (0.6 - 0.85) 
            ========================================================================= */}
        <motion.div 
          style={{ opacity: s4Opacity, scale: s4Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <div className="relative w-[900px] h-[500px] flex items-center justify-center gap-12">
            
            {/* Kanban Card Flow */}
            <div className="w-80 bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] p-6 shadow-lg relative">
               <h3 className="text-lg font-heading font-black mb-6 flex items-center gap-2"><ClipboardList className="h-5 w-5 text-aurora-pink" /> Resolution Engine</h3>
               
               <div className="space-y-4">
                 <div className="h-20 bg-white/50 rounded-xl border border-white/60 p-4 opacity-50"><div className="h-2 w-1/3 bg-border rounded-full mb-2"/><div className="h-2 w-1/2 bg-border rounded-full"/></div>
                 
                 {/* The Moving Ticket */}
                 <motion.div 
                   initial={{ y: -80, opacity: 0 }}
                   whileInView={{ y: 0, opacity: 1 }}
                   transition={{ duration: 1 }}
                   className="h-24 bg-white rounded-xl border border-aurora-pink/30 shadow-lg p-4 relative z-10"
                 >
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-2 py-1 bg-aurora-pink/10 text-aurora-pink text-[10px] font-bold rounded uppercase">Plumbing</span>
                      <span className="text-success text-xs font-bold flex items-center gap-1">✓ Resolved</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">Pipe leak in A-402</p>
                 </motion.div>

                 <div className="h-20 bg-white/50 rounded-xl border border-white/60 p-4 opacity-50"><div className="h-2 w-1/3 bg-border rounded-full mb-2"/><div className="h-2 w-1/2 bg-border rounded-full"/></div>
               </div>
            </div>

            {/* Financials */}
            <div className="w-80 bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] p-8 shadow-lg flex flex-col items-center justify-center">
               <div className="relative h-48 w-48 mb-6">
                 <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xl">
                    <motion.path 
                      initial={{ strokeDasharray: "0, 100" }}
                      whileInView={{ strokeDasharray: "100, 100" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-aurora-gold" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="6"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Wallet className="h-8 w-8 text-aurora-gold mb-1" />
                    <span className="text-2xl font-numbers font-black">100%</span>
                 </div>
               </div>
               <h3 className="text-xl font-heading font-black text-center">Maintenance Collected</h3>
               <p className="text-sm text-muted-foreground text-center mt-2">Zero friction automated UPI payments.</p>
            </div>

          </div>
        </motion.div>

        {/* =========================================================================
            STAGE 5: THE HARMONY (0.8 - 1.0) 
            ========================================================================= */}
        <motion.div 
          style={{ opacity: s5Opacity, scale: s5Scale }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none mt-20"
        >
          <div className="relative w-[1000px] h-[600px] flex items-center justify-center">
            
            {/* The Master Dashboard Core */}
            <motion.div 
              animate={{ boxShadow: ["0 0 0px rgba(114,241,209,0)", "0 0 150px rgba(114,241,209,0.4)", "0 0 0px rgba(114,241,209,0)"] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-[600px] h-[350px] bg-white/60 backdrop-blur-3xl border border-white/80 rounded-[3rem] p-10 flex flex-col items-center justify-center shadow-2xl relative z-30"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-aurora-mint/10 via-aurora-aqua/10 to-aurora-lavender/10 rounded-[3rem]" />
               
               <div className="relative z-10 flex flex-col items-center">
                 <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-4 w-4 bg-aurora-mint rounded-full" />
                    <div className="h-4 w-4 bg-aurora-aqua rounded-full" />
                    <div className="h-4 w-4 bg-aurora-lavender rounded-full" />
                    <div className="h-4 w-4 bg-aurora-pink rounded-full" />
                    <div className="h-4 w-4 bg-aurora-gold rounded-full" />
                 </div>
                 <h3 className="text-5xl font-heading font-black text-foreground mb-4">Harmony Achieved.</h3>
                 <p className="text-lg text-muted-foreground font-light text-center max-w-md">
                   Every resident, visitor, payment, and operation perfectly synced in one unified platform.
                 </p>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   className="mt-8 px-8 py-4 bg-foreground text-background rounded-full font-bold flex items-center gap-2 pointer-events-auto"
                 >
                   Launch Your Community <ArrowRight className="h-4 w-4" />
                 </motion.button>
               </div>
            </motion.div>

            {/* Connecting Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="w-[700px] h-[700px] rounded-full border border-aurora-mint/20 border-dashed absolute" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-[850px] h-[850px] rounded-full border border-aurora-lavender/20 border-dashed absolute" />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

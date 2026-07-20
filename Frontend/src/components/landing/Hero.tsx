import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Users, DollarSign, CheckCircle2, Car, FileText, Cloud, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Floating Widget Component Helper
const FloatingWidget = ({ children, delay = 0, yOffset = 20, rotateOffset = 5, duration = 6, className = "" }: any) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -yOffset, 0],
        rotate: [0, rotateOffset, 0]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      className={`absolute bg-white/40 backdrop-blur-3xl border border-white/60 shadow-2xl rounded-3xl p-4 overflow-hidden ${className}`}
    >
      {/* Glossy reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export function Hero() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  // Simple counter effect
  const [count, setCount] = useState(1480);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-36 pb-24 overflow-hidden flex flex-col justify-center">
      
      {/* Background Particles & Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft floating dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [Math.random() * 100, Math.random() * -100],
              x: [Math.random() * 50, Math.random() * -50],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute rounded-full bg-foreground/20"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center h-full">
          
          {/* LEFT SIDE - COPY */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start text-left mt-12 lg:mt-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-8 hover:scale-105 transition-transform"
            >
              <span className="text-sm font-semibold text-foreground tracking-wide">✨ Trusted by 100+ Smart Communities</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[4.5rem] lg:text-[5.5rem] leading-[0.95] font-heading font-black tracking-[-0.04em] text-foreground mb-8"
            >
              Invisible Tech.<br />
              Unstoppable<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-lavender via-aurora-pink to-aurora-coral">
                Communities.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl lg:text-2xl text-muted-foreground mb-10 max-w-lg font-light leading-relaxed"
            >
              Experience the first operating system designed exclusively for modern residential living. Fluid, beautiful, and completely effortless.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
            >
              <Link 
                to="/auth/signup"
                className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender px-10 font-bold text-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(114,241,209,0.4)] hover:shadow-[0_0_60px_rgba(143,124,255,0.6)]"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="text-lg">Start Free</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
              
              <Link 
                to="/contact"
                className="group relative inline-flex h-16 w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full bg-white/20 backdrop-blur-2xl border border-white/60 px-10 font-bold text-foreground transition-all hover:scale-105 active:scale-95 hover:bg-white/40 shadow-lg"
              >
                <Play className="h-5 w-5 fill-foreground text-foreground" />
                <span className="text-lg">Book Demo</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - LIVE PRODUCT EXPERIENCE */}
          <motion.div 
            style={{ y: yParallax }}
            className="lg:col-span-7 h-[600px] lg:h-[800px] relative perspective-1000 w-full mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 transform-style-3d">
              
              {/* 1. Resident Count */}
              <FloatingWidget delay={0.2} duration={7} yOffset={25} className="top-[5%] left-[5%] z-30 w-56">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 bg-aurora-pink/20 rounded-xl">
                    <Users className="h-5 w-5 text-aurora-pink" />
                  </div>
                  <span className="text-xs font-bold text-success flex items-center bg-success/10 px-2 py-1 rounded-full">+4 Today</span>
                </div>
                <motion.p 
                  key={count}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-numbers font-black text-foreground tracking-tight"
                >
                  {count.toLocaleString()}
                </motion.p>
                <p className="text-sm font-semibold text-muted-foreground mt-1">Total Residents</p>
              </FloatingWidget>

              {/* 2. Live Visitor Notification */}
              <FloatingWidget delay={1.5} duration={8} yOffset={15} rotateOffset={-3} className="top-[25%] left-[45%] z-40 w-72">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-aurora-mint flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Visitor" className="w-full h-full" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-success border-2 border-white" />
                  </div>
                  <div className="flex-1">
                     <p className="font-heading font-black text-foreground leading-none mb-1">Rajesh Sharma</p>
                     <p className="text-xs font-semibold text-muted-foreground mb-2">Swiggy Delivery • Gate 1</p>
                     <div className="flex gap-2">
                       <button className="flex-1 py-1.5 bg-success/20 text-success text-xs font-bold rounded-lg">Approve</button>
                       <button className="flex-1 py-1.5 bg-destructive/10 text-destructive text-xs font-bold rounded-lg">Deny</button>
                     </div>
                  </div>
                </div>
              </FloatingWidget>

              {/* 3. Today's Collection */}
              <FloatingWidget delay={0.8} duration={6.5} yOffset={20} rotateOffset={4} className="bottom-[15%] left-[10%] z-20 w-48">
                 <div className="flex items-center gap-3 mb-3">
                   <div className="p-2 bg-aurora-gold/20 rounded-xl">
                     <DollarSign className="h-5 w-5 text-aurora-gold" />
                   </div>
                   <p className="font-heading font-bold text-sm text-foreground">Collection</p>
                 </div>
                 <p className="text-2xl font-numbers font-black text-foreground mb-3">₹45,200</p>
                 <div className="h-12 flex items-end gap-1 opacity-70">
                    {[30, 45, 20, 80, 50, 90, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 2 + i * 0.1 }}
                        className="flex-1 bg-aurora-gold rounded-t-md"
                      />
                    ))}
                 </div>
              </FloatingWidget>

              {/* 4. Complaint Resolved */}
              <FloatingWidget delay={2.2} duration={5.5} yOffset={30} rotateOffset={-2} className="top-[10%] right-[5%] z-50 w-64 shadow-[0_20px_50px_rgba(114,241,209,0.2)]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-aurora-mint flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-black text-sm text-foreground uppercase tracking-wider text-aurora-mint">Resolved</p>
                    <p className="text-sm font-semibold text-foreground">Plumbing Issue #402</p>
                    <p className="text-xs text-muted-foreground">Closed 2m ago by Amit</p>
                  </div>
                </div>
              </FloatingWidget>

              {/* 5. Parking Usage */}
              <FloatingWidget delay={1.1} duration={7.5} yOffset={18} rotateOffset={3} className="bottom-[35%] right-[2%] z-30 w-52">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-aurora-aqua/20 rounded-xl">
                     <Car className="h-5 w-5 text-aurora-aqua" />
                   </div>
                   <p className="font-heading font-bold text-sm text-foreground">Parking</p>
                 </div>
                 <div className="relative w-full h-3 bg-white/40 rounded-full overflow-hidden shadow-inner mb-2">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "88%" }}
                     transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                     className="absolute top-0 left-0 h-full bg-gradient-to-r from-aurora-aqua to-aurora-lavender rounded-full" 
                   />
                 </div>
                 <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
                   <span>Occupied</span>
                   <span className="text-foreground">440/500</span>
                 </div>
              </FloatingWidget>

              {/* 6. Weather & Alerts */}
              <FloatingWidget delay={0.5} duration={6} yOffset={22} rotateOffset={-4} className="top-[55%] left-[0%] z-40 w-48 bg-white/20">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Cloud className="h-8 w-8 text-foreground/70" />
                    <span className="text-2xl font-numbers font-black">28°</span>
                  </div>
                  <div className="h-px w-full bg-border/40" />
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-warning" />
                    <span className="text-xs font-bold text-warning">Lift 2 Maint. Today</span>
                  </div>
                </div>
              </FloatingWidget>

              {/* 7. Live Notice */}
              <FloatingWidget delay={1.8} duration={8} yOffset={20} rotateOffset={2} className="bottom-[5%] right-[25%] z-20 w-64">
                <div className="flex items-start gap-3">
                   <div className="p-2 bg-aurora-lavender/20 rounded-xl shrink-0">
                     <FileText className="h-5 w-5 text-aurora-lavender" />
                   </div>
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="h-2 w-2 rounded-full bg-aurora-pink animate-pulse" />
                       <p className="font-heading font-bold text-xs text-aurora-pink uppercase tracking-widest">New Notice</p>
                     </div>
                     <p className="text-sm font-semibold text-foreground mb-1">Annual General Meeting</p>
                     <p className="text-xs font-medium text-muted-foreground line-clamp-2">The AGM is scheduled for this Sunday at the clubhouse. All owners must attend.</p>
                   </div>
                 </div>
              </FloatingWidget>

              {/* 8. Mini Calendar */}
              <FloatingWidget delay={2.5} duration={7} yOffset={15} rotateOffset={-5} className="top-[45%] right-[30%] z-10 w-40">
                <div className="text-center">
                  <div className="bg-aurora-coral/90 text-white font-bold text-xs py-1 uppercase tracking-widest rounded-t-xl mx-[-1rem] mt-[-1rem] mb-3">
                    Aug 2026
                  </div>
                  <p className="text-4xl font-numbers font-black text-foreground mb-1">24</p>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Monday</p>
                </div>
              </FloatingWidget>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Scroll Indicator Orb */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border-2 border-foreground/20 flex justify-center p-1"
        >
          <motion.div 
            animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-2 w-2 rounded-full bg-gradient-to-b from-aurora-lavender to-aurora-pink shadow-[0_0_10px_#FF5DA2]"
          />
        </motion.div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Discover</span>
      </div>
      
    </section>
  );
}

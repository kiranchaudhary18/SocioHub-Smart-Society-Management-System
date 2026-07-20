import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Users, Bell, Wrench, Car, ShieldAlert, DollarSign, Activity, CheckCircle2 } from "lucide-react";

export function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!leftRef.current) return;
    const rect = leftRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (-1 to 1)
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Smooth springs for 3D rotation
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 100, damping: 30 });

  // Scroll tracking for right side
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animated numbers
  const [revenue, setRevenue] = useState(145020);
  useEffect(() => {
    const int = setInterval(() => setRevenue(prev => prev + Math.floor(Math.random() * 500)), 3000);
    return () => clearInterval(int);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-background overflow-visible pb-32"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.4, 0.1]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
          }}
          className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-aurora-mint rounded-full blur-[150px] mix-blend-multiply" 
        />
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])
          }}
          className="absolute bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-aurora-lavender rounded-full blur-[200px] mix-blend-multiply" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Headline */}
        <div className="text-left pt-32 pb-24 max-w-4xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] lg:text-[6rem] leading-[1] font-heading font-black tracking-[-0.04em] text-foreground"
          >
            Experience Society<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender">
              Management in Motion.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl text-muted-foreground mt-8 font-light max-w-2xl"
          >
            Every interaction. Designed beautifully. An ecosystem that anticipates your needs before you even realize them.
          </motion.p>
        </div>

        {/* Asymmetric Split Layout */}
        <div className="grid lg:grid-cols-12 gap-16 relative items-start">
          
          {/* LEFT: 3D Live Dashboard (Sticky) */}
          <div 
            className="lg:col-span-7 sticky top-32 h-[800px] hidden lg:block perspective-1000"
            ref={leftRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              style={{ rotateX, rotateY }}
              className="w-full h-full transform-style-3d transition-transform duration-200 ease-out flex items-center justify-center relative"
            >
              {/* Main Dashboard Panel */}
              <div className="absolute w-[95%] h-[90%] bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col translate-z-[50px]">
                {/* Navbar area */}
                <div className="h-16 border-b border-white/40 bg-white/20 flex items-center px-8 justify-between shrink-0">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-warning/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="h-6 w-32 bg-white/40 rounded-full" />
                </div>
                
                {/* Dashboard Grid */}
                <div className="flex-1 p-8 grid grid-cols-3 grid-rows-3 gap-6 relative">
                  
                  {/* Revenue Chart Widget */}
                  <div className="col-span-2 row-span-2 bg-white/50 border border-white/40 rounded-3xl p-6 flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-transform shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-1">Monthly Collection</p>
                        <p className="text-3xl font-numbers font-black text-foreground">₹{revenue.toLocaleString()}</p>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-aurora-gold/20 flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-aurora-gold" />
                      </div>
                    </div>
                    <div className="flex-1 flex items-end gap-3 w-full">
                      {[30, 45, 60, 40, 80, 55, 95].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: [`${Math.max(10, h - 20)}%`, `${h}%`, `${Math.max(10, h - 20)}%`] }}
                          transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                          className="flex-1 bg-gradient-to-t from-aurora-gold/80 to-aurora-coral rounded-t-xl"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quick Action Widget */}
                  <div className="col-span-1 row-span-1 bg-gradient-to-br from-aurora-mint/20 to-aurora-aqua/20 border border-white/60 rounded-3xl p-6 flex items-center justify-center hover:scale-[1.02] transition-transform shadow-sm cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                    <div className="text-center">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <Users className="h-6 w-6 text-aurora-mint" />
                      </div>
                      <p className="font-heading font-bold text-foreground">Add Resident</p>
                    </div>
                  </div>

                  {/* Complaint Status */}
                  <div className="col-span-1 row-span-1 bg-white/50 border border-white/40 rounded-3xl p-5 hover:scale-[1.02] transition-transform shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-aurora-pink/20 rounded-xl">
                        <Activity className="h-5 w-5 text-aurora-pink" />
                      </div>
                      <p className="font-heading font-bold text-sm text-foreground">Complaints</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-14 rounded-full bg-border flex items-center justify-center">
                        <motion.div 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 0.8 }}
                          transition={{ duration: 2, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full border-[4px] border-aurora-pink"
                          style={{ clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 80%)" }}
                        />
                        <span className="text-sm font-numbers font-bold">80%</span>
                      </div>
                      <div>
                        <p className="text-xl font-numbers font-black">24</p>
                        <p className="text-xs text-muted-foreground font-semibold">Resolved</p>
                      </div>
                    </div>
                  </div>

                  {/* Parking */}
                  <div className="col-span-2 row-span-1 bg-white/50 border border-white/40 rounded-3xl p-6 flex items-center justify-between hover:scale-[1.02] transition-transform shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="h-14 w-14 rounded-2xl bg-aurora-lime/20 flex items-center justify-center">
                         <Car className="h-7 w-7 text-[#5CB338]" />
                       </div>
                       <div>
                         <p className="font-heading font-bold text-lg text-foreground mb-1">Parking Overview</p>
                         <p className="text-sm text-muted-foreground font-medium">South Wing Garage is 92% full</p>
                       </div>
                    </div>
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="px-4 py-2 bg-[#5CB338]/10 rounded-full border border-[#5CB338]/30"
                    >
                      <span className="text-[#5CB338] font-bold text-sm">48 Spots Left</span>
                    </motion.div>
                  </div>

                  {/* Alerts */}
                  <div className="col-span-1 row-span-1 bg-aurora-coral/10 border border-aurora-coral/30 rounded-3xl p-5 hover:scale-[1.02] transition-transform shadow-sm">
                     <div className="flex items-center justify-between mb-4">
                       <ShieldAlert className="h-6 w-6 text-aurora-coral" />
                       <span className="flex h-2 w-2 rounded-full bg-aurora-coral animate-pulse" />
                     </div>
                     <p className="font-heading font-bold text-lg text-foreground mb-1">Security Alert</p>
                     <p className="text-xs text-muted-foreground font-medium line-clamp-2">Unauthorized vehicle detected at Gate 3.</p>
                  </div>

                </div>
              </div>

              {/* Floating Panels outside dashboard (Extreme 3D depth) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[10%] -right-[5%] bg-white/60 backdrop-blur-2xl border border-white/80 p-4 rounded-2xl shadow-[0_20px_50px_rgba(61,217,255,0.2)] flex items-center gap-4 z-20 translate-z-[120px] w-64 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-aurora-aqua flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Annie" alt="Visitor" className="w-full h-full" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-success border border-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">Visitor Approved</p>
                  <p className="text-xs font-semibold text-muted-foreground">Priya • 2 mins ago</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[20%] -left-[10%] bg-white/60 backdrop-blur-2xl border border-white/80 p-4 rounded-2xl shadow-[0_20px_50px_rgba(255,122,122,0.2)] flex items-center gap-4 z-20 translate-z-[150px] w-56 hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-aurora-coral/20 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-aurora-coral" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm text-foreground">New Notice</p>
                  <p className="text-xs font-semibold text-muted-foreground">Water Supply Interru...</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* RIGHT: Scrolling Explanation Cards */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:py-[20vh] relative z-20">
            
            {/* Card 1: Residents */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%", once: false }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(114,241,209,0.15)] group hover:bg-white/60 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-aurora-mint to-aurora-aqua flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Users className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-3xl font-heading font-black text-foreground mb-4 tracking-tight">Resident Ecosystem</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-6">
                Manage owner details, tenant records, and family members effortlessly. The system automatically syncs access controls and billing profiles.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Profiles</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Directory</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Tenants</span>
              </div>
            </motion.div>

            {/* Card 2: Visitors */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%", once: false }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(61,217,255,0.15)] group hover:bg-white/60 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-aurora-aqua to-aurora-lavender flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <CheckCircle2 className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-3xl font-heading font-black text-foreground mb-4 tracking-tight">Frictionless Entry</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-6">
                Pre-approve guests with QR codes, track daily staff attendance, and monitor deliveries in real-time. Zero wait at the gate.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">QR Access</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Deliveries</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Staff Logs</span>
              </div>
            </motion.div>

            {/* Card 3: Payments */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%", once: false }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(255,209,102,0.15)] group hover:bg-white/60 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-aurora-gold to-aurora-coral flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <DollarSign className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-3xl font-heading font-black text-foreground mb-4 tracking-tight">Financial Autopilot</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-6">
                Automated maintenance billing, instant UPI receipts, and transparent ledgers. The platform handles the accounting so you don't have to.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Invoicing</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">UPI Integration</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Ledgers</span>
              </div>
            </motion.div>

            {/* Card 4: Maintenance */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20%", once: false }}
              className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-10 shadow-[0_20px_60px_-15px_rgba(143,124,255,0.15)] group hover:bg-white/60 transition-all duration-500"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-aurora-lavender to-aurora-pink flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Wrench className="h-8 w-8 text-background" />
              </div>
              <h3 className="text-3xl font-heading font-black text-foreground mb-4 tracking-tight">Facility Pulse</h3>
              <p className="text-lg text-muted-foreground leading-relaxed font-light mb-6">
                Residents log issues in seconds. Managers assign staff instantly. Track resolution times with beautiful precision analytics.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Ticketing</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Analytics</span>
                <span className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-foreground">Staff Assigment</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

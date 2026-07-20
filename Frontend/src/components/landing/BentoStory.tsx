import { motion } from "framer-motion";
import { Users, QrCode, ClipboardList, Wallet, ShieldAlert, FileText, PhoneCall } from "lucide-react";

export function BentoStory() {
  return (
    <section className="py-32 relative bg-background overflow-hidden">
      {/* Aurora Background Gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-aurora-mint rounded-full blur-[200px] mix-blend-multiply" />
        <div className="absolute top-[40%] right-[-10%] w-[60vw] h-[60vw] bg-aurora-pink rounded-full blur-[200px] mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-aurora-lavender rounded-full blur-[200px] mix-blend-multiply" />
        <div className="absolute bottom-[30%] right-[10%] w-[50vw] h-[50vw] bg-aurora-gold rounded-full blur-[200px] mix-blend-multiply opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] md:text-[5rem] leading-[1.05] font-heading font-black tracking-[-0.04em] text-foreground mb-6"
          >
            Designed Around<br />
            Real Communities.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted-foreground font-light"
          >
            Every Detail. Built With Purpose.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* Card 1: Resident Management (col-span-2, row-span-2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(114,241,209,0.3)] transition-all duration-700 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-mint/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
              {/* Abstract Resident UI */}
              <div className="relative w-full max-w-sm h-64 border border-white/40 rounded-2xl bg-white/20 shadow-inner overflow-hidden flex flex-col items-center justify-center gap-6">
                <div className="absolute top-4 left-4 h-3 w-20 bg-white/50 rounded-full" />
                <div className="absolute top-4 right-4 h-3 w-12 bg-aurora-mint/50 rounded-full" />
                
                {/* Floating Avatars */}
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                      className="h-16 w-16 rounded-full border-2 border-white shadow-lg overflow-hidden bg-aurora-mint/20"
                    >
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Res${i}`} alt="Avatar" className="w-full h-full" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Growth Graph */}
                <div className="w-[80%] h-12 flex items-end gap-2 px-4 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  {[40, 60, 45, 80, 55, 90, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-aurora-mint rounded-t-sm group-hover:bg-aurora-aqua transition-colors duration-700"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-heading font-black text-foreground mb-1">Resident Hub</h3>
                <p className="text-muted-foreground text-sm font-light">Profiles, families, and tenants.</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-aurora-mint/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <Users className="h-6 w-6 text-aurora-mint" />
              </div>
            </div>
          </motion.div>

          {/* Card 2: Visitor Timeline (col-span-1, row-span-2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(61,217,255,0.3)] transition-all duration-700 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aurora-aqua/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex-1 flex flex-col justify-center">
              {/* Timeline UI */}
              <div className="space-y-6">
                {[
                  { step: "QR Scan", active: true },
                  { step: "Gate Entry", active: true },
                  { step: "Security Verified", active: true },
                  { step: "Exit Complete", active: false }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i !== 3 && <div className={`absolute left-3.5 top-8 w-px h-10 ${item.active ? 'bg-aurora-aqua' : 'bg-border'}`} />}
                    <div className={`h-7 w-7 rounded-full border-2 flex items-center justify-center relative z-10 ${item.active ? 'border-aurora-aqua bg-aurora-aqua/20' : 'border-border bg-white'}`}>
                      {item.active && <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-2 rounded-full bg-aurora-aqua" />}
                    </div>
                    <p className={`font-semibold text-sm pt-1 ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>{item.step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-heading font-black text-foreground mb-1">Visitors</h3>
                <p className="text-muted-foreground text-sm font-light">End-to-end tracking.</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-aurora-aqua/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <QrCode className="h-5 w-5 text-aurora-aqua" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Complaint Kanban (col-span-1, row-span-2) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-2 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(255,93,162,0.3)] transition-all duration-700 flex flex-col perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-aurora-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex-1 flex flex-col group-hover:rotate-y-12 transition-transform duration-700">
              {/* Kanban UI */}
              <div className="flex gap-2 h-full py-4">
                <div className="flex-1 bg-white/30 rounded-xl p-2 flex flex-col gap-2 border border-white/50">
                  <div className="h-2 w-8 bg-aurora-pink/50 rounded-full mb-2" />
                  <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="h-12 bg-white rounded-lg shadow-sm" />
                  <div className="h-12 bg-white/50 rounded-lg shadow-sm" />
                </div>
                <div className="flex-1 bg-white/30 rounded-xl p-2 flex flex-col gap-2 border border-white/50 mt-4">
                  <div className="h-2 w-8 bg-aurora-lavender/50 rounded-full mb-2" />
                  <div className="h-12 bg-white rounded-lg shadow-sm border border-aurora-lavender/30" />
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-xl font-heading font-black text-foreground mb-1">Complaints</h3>
                <p className="text-muted-foreground text-sm font-light">Visual resolution.</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-aurora-pink/20 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500">
                <ClipboardList className="h-5 w-5 text-aurora-pink" />
              </div>
            </div>
          </motion.div>

          {/* Card 4: Payments (col-span-1, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(255,209,102,0.3)] transition-all duration-700 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex justify-between items-start">
              {/* Donut Chart */}
              <div className="relative h-16 w-16 group-hover:scale-110 transition-transform duration-500">
                <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-md">
                  <path className="text-border" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }}
                    whileInView={{ strokeDasharray: "75, 100" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-aurora-gold" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full bg-aurora-gold/20 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-aurora-gold" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-heading font-black text-foreground">Payments</h3>
              <p className="text-muted-foreground text-xs font-light">Automated billing.</p>
            </div>
          </motion.div>

          {/* Card 5: Parking (col-span-2, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(139,241,120,0.3)] transition-all duration-700 flex flex-col justify-between perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-aurora-lime/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex gap-6 items-center h-full">
               <div className="flex-1">
                 <h3 className="text-xl font-heading font-black text-foreground mb-1">Smart Parking</h3>
                 <p className="text-muted-foreground text-sm font-light mb-4 max-w-xs">Live 3D maps and occupancy tracking for residents and guests.</p>
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-aurora-lime/20 rounded-full border border-aurora-lime/40">
                   <span className="h-2 w-2 rounded-full bg-[#5CB338] animate-pulse" />
                   <span className="text-xs font-bold text-[#5CB338]">12 Spots Left</span>
                 </div>
               </div>
               
               {/* 3D Parking Grid */}
               <div className="w-48 h-32 bg-white/30 border border-white/50 rounded-xl p-3 grid grid-cols-3 grid-rows-2 gap-2 group-hover:rotate-x-12 group-hover:-rotate-y-12 transition-transform duration-700 shadow-inner">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="border border-border/50 rounded-md relative flex items-center justify-center">
                      {i % 2 !== 0 && (
                        <motion.div 
                          animate={i === 1 ? { x: [20, 0], opacity: [0, 1] } : {}}
                          transition={{ duration: 1.5, repeat: i===1 ? Infinity : 0, repeatDelay: 3 }}
                          className="w-[80%] h-[60%] bg-[#5CB338] rounded shadow-sm"
                        />
                      )}
                    </div>
                  ))}
               </div>
            </div>
          </motion.div>

          {/* Card 6: Security Center (col-span-1, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(255,122,122,0.3)] transition-all duration-700 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-aurora-coral/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border border-aurora-coral/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <ShieldAlert className="h-8 w-8 text-aurora-coral" />
                </div>
                {/* Radar Pulse */}
                <motion.div 
                  animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border border-aurora-coral"
                />
              </div>
            </div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-lg font-heading font-black text-foreground">Security Center</h3>
              <p className="text-muted-foreground text-xs font-light">Motion & SOS alerts.</p>
            </div>
          </motion.div>

          {/* Card 7: Analytics (col-span-2, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(143,124,255,0.3)] transition-all duration-700 flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-lavender/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex justify-between items-center h-full">
              <div>
                <h3 className="text-xl font-heading font-black text-foreground mb-1">Deep Analytics</h3>
                <p className="text-muted-foreground text-sm font-light">Understand community trends.</p>
              </div>
              
              <div className="h-24 w-48 relative flex items-end opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-lg">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    d="M0 80 Q 25 60, 50 70 T 100 40 T 150 50 T 200 20" 
                    fill="none" 
                    stroke="#8F7CFF" 
                    strokeWidth="4"
                  />
                  <motion.path 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    d="M0 80 Q 25 60, 50 70 T 100 40 T 150 50 T 200 20 L 200 100 L 0 100 Z" 
                    fill="#8F7CFF"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 8: Notice Board (col-span-1, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-white/40 backdrop-blur-3xl border border-white/60 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(255,255,255,1)] transition-all duration-700 flex flex-col justify-between"
          >
            <div className="relative z-10 flex-1 flex items-center justify-center">
              <div className="relative w-full h-20 perspective-1000">
                <motion.div className="absolute inset-x-2 top-0 h-12 bg-white/80 border border-white rounded-xl shadow-sm z-30 flex items-center px-3 group-hover:-translate-y-2 group-hover:-rotate-3 transition-transform duration-500">
                  <div className="h-2 w-12 bg-border rounded-full" />
                </motion.div>
                <motion.div className="absolute inset-x-4 top-3 h-12 bg-white/60 border border-white/50 rounded-xl shadow-sm z-20 group-hover:translate-y-2 group-hover:rotate-3 transition-transform duration-500" />
                <motion.div className="absolute inset-x-6 top-6 h-12 bg-white/40 border border-white/30 rounded-xl shadow-sm z-10 group-hover:translate-y-6 group-hover:rotate-6 transition-transform duration-500" />
              </div>
            </div>
            
            <div className="relative z-10 flex justify-between items-end mt-4">
              <div>
                <h3 className="text-lg font-heading font-black text-foreground">Notice Board</h3>
              </div>
              <FileText className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </motion.div>

          {/* Card 9: Emergency (col-span-1, row-span-1) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1 lg:row-span-1 relative group overflow-hidden rounded-[2rem] bg-foreground text-background p-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_-20px_rgba(255,122,122,0.5)] transition-all duration-700 flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-aurora-coral/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10 flex justify-center mt-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="h-16 w-16 rounded-2xl bg-aurora-coral flex items-center justify-center cursor-pointer shadow-[0_0_20px_#FF7A7A]"
              >
                <PhoneCall className="h-8 w-8 text-white fill-white" />
              </motion.div>
            </div>
            
            <div className="relative z-10 text-center mt-6">
              <h3 className="text-lg font-heading font-black text-background">One-Tap SOS</h3>
              <p className="text-muted/70 text-xs font-light">Instant emergency dispatch.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

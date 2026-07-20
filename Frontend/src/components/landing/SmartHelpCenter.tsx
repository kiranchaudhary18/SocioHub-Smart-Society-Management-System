import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, MessageCircle, Mail, Calendar, BookOpen, Users, Bug, ArrowRight, Zap, Shield, CreditCard } from "lucide-react";

export function SmartHelpCenter() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholder = "Search anything about SocioHub...";

  // Typing effect for the search placeholder
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullPlaceholder.length) {
        setPlaceholderText(fullPlaceholder.slice(0, currentIndex));
        currentIndex++;
      } else {
        currentIndex = 0; // Loop the typing animation
      }
    }, 150);
    return () => clearInterval(intervalId);
  }, []);

  const topics = ["Getting Started", "Residents", "Visitors", "Security", "Maintenance", "Payments", "Parking", "Emergency", "Settings", "Analytics"];

  const faqs = [
    {
      q: "How does the QR visitor pass system work?",
      a: "Residents can generate a one-time or multi-use QR code from the SocioHub app and share it via WhatsApp. When the visitor arrives, the guard scans it using their device. Entry is approved instantly, and the resident receives a real-time push notification.",
      icon: Zap,
      color: "text-aurora-mint"
    },
    {
      q: "Are the maintenance payments secure?",
      a: "Absolutely. We use bank-grade 256-bit encryption and partner directly with Tier-1 UPI gateways. All transactions are settled directly into the society's registered bank account within 24 hours.",
      icon: Shield,
      color: "text-aurora-aqua"
    },
    {
      q: "Can I pay using Credit Cards?",
      a: "Yes! SocioHub supports UPI, Net Banking, Credit Cards, and Debit Cards. We even offer auto-pay mandates so you never miss a maintenance deadline again.",
      icon: CreditCard,
      color: "text-aurora-gold"
    },
    {
      q: "What happens during an emergency alert?",
      a: "When a resident triggers the SOS button, a massive alarm sounds on the security guard's device, overriding silent mode. An automated call is placed to the committee members, and nearby neighbors receive an instant priority push notification.",
      icon: Bug, // Used as a placeholder for alert/emergency
      color: "text-aurora-coral"
    }
  ];

  const quickActions = [
    { title: "Contact Support", icon: MessageCircle, color: "text-aurora-mint", bg: "from-aurora-mint/10 to-transparent" },
    { title: "Book Demo", icon: Calendar, color: "text-aurora-pink", bg: "from-aurora-pink/10 to-transparent" },
    { title: "View Docs", icon: BookOpen, color: "text-aurora-aqua", bg: "from-aurora-aqua/10 to-transparent" },
    { title: "Community", icon: Users, color: "text-aurora-lavender", bg: "from-aurora-lavender/10 to-transparent" }
  ];

  return (
    <section className="py-32 relative bg-background overflow-hidden">
      
      {/* Background Aurora */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] right-[20%] w-[50vw] h-[50vw] bg-aurora-pink rounded-full blur-[150px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[10%] left-[10%] w-[60vw] h-[60vw] bg-aurora-aqua rounded-full blur-[150px] mix-blend-multiply" />
        {/* Soft Particles Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-heading font-black tracking-tight text-foreground mb-6"
          >
            Answers, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-pink to-aurora-gold">
              Before You Even Ask.
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground font-light"
          >
            An intelligent knowledge base designed to give you exactly what you need, exactly when you need it.
          </motion.p>
        </div>

        {/* ==========================================
            MODULE 1: AI SEARCH EXPERIENCE
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-pink rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative bg-white/40 backdrop-blur-3xl border border-white/60 rounded-full flex items-center p-2 shadow-2xl">
             <div className="h-14 w-14 flex items-center justify-center rounded-full bg-foreground/5">
                <Search className="h-6 w-6 text-foreground/50 group-hover:text-aurora-aqua transition-colors duration-300" />
             </div>
             <input 
               type="text" 
               className="flex-1 bg-transparent border-none outline-none px-4 text-xl font-medium text-foreground placeholder:text-foreground/30 h-14"
               placeholder={`${placeholderText}|`}
             />
             <button className="px-8 h-12 bg-foreground text-background rounded-full font-bold text-sm hover:scale-105 transition-transform">
               Search
             </button>
          </div>
        </motion.div>

        {/* ==========================================
            MODULE 2: POPULAR TOPIC CHIPS
            ========================================== */}
        <div className="flex flex-wrap justify-center gap-3 mb-24 max-w-4xl mx-auto">
          {topics.map((topic, i) => (
            <motion.button 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="px-5 py-2.5 bg-white/30 backdrop-blur-md border border-white/50 rounded-full text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-white/60 hover:shadow-[0_10px_20px_-10px_rgba(143,124,255,0.4)] hover:-translate-y-1 transition-all duration-300"
            >
              {topic}
            </motion.button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-24">
          
          {/* ==========================================
              MODULE 3: SMART KNOWLEDGE CARDS
              ========================================== */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl font-heading font-black mb-6">Frequently Asked</h3>
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full bg-white/50 flex items-center justify-center border border-white shadow-sm`}>
                      <faq.icon className={`h-5 w-5 ${faq.color}`} />
                    </div>
                    <span className="text-lg font-bold text-foreground">{faq.q}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${activeAccordion === i ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-8 pt-2">
                        <p className="text-muted-foreground leading-relaxed pl-14 mb-4">{faq.a}</p>
                        <div className="pl-14">
                           <button className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all text-foreground">
                             Learn More <ArrowRight className={`h-4 w-4 ${faq.color}`} />
                           </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* ==========================================
              MODULE 4 & 5: QUICK ACTIONS & METRICS
              ========================================== */}
          <div className="lg:col-span-4 space-y-8">
            <div>
               <h3 className="text-2xl font-heading font-black mb-6">Quick Actions</h3>
               <div className="grid grid-cols-2 gap-4">
                 {quickActions.map((action, i) => (
                   <motion.button 
                     key={i}
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="bg-white/40 backdrop-blur-xl border border-white/60 p-5 rounded-2xl flex flex-col items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                   >
                     <div className={`absolute inset-0 bg-gradient-to-br ${action.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                     <div className="relative z-10 h-10 w-10 bg-white rounded-xl shadow-sm border border-white flex items-center justify-center">
                       <action.icon className={`h-5 w-5 ${action.color}`} />
                     </div>
                     <span className="relative z-10 font-bold text-sm text-foreground text-left">{action.title}</span>
                   </motion.button>
                 ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-foreground to-foreground/90 p-8 rounded-3xl text-background relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-aurora-mint rounded-full blur-[80px] opacity-20" />
               <div className="relative z-10 space-y-6">
                 <div>
                   <p className="text-background/60 text-sm font-semibold uppercase tracking-widest mb-1">Avg Response Time</p>
                   <p className="text-3xl font-numbers font-black text-aurora-mint">&lt; 2 Mins</p>
                 </div>
                 <div>
                   <p className="text-background/60 text-sm font-semibold uppercase tracking-widest mb-1">Support Satisfaction</p>
                   <p className="text-3xl font-numbers font-black text-aurora-pink">99.8%</p>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* ==========================================
            MODULE 6: CONTACT PANEL
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full bg-white/50 backdrop-blur-3xl rounded-[3rem] p-10 md:p-16 border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center justify-between gap-10"
        >
           <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-aurora-lavender rounded-full blur-xl opacity-50 animate-pulse" />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SupportHero" alt="Support" className="h-24 w-24 rounded-full border-4 border-white relative z-10 bg-white" />
                <div className="absolute bottom-0 right-0 h-6 w-6 bg-success rounded-full border-4 border-white z-20" />
              </div>
              <div>
                <h3 className="text-3xl font-heading font-black text-foreground mb-2">Still need help?</h3>
                <p className="text-muted-foreground font-light text-lg">Our community experts are online and ready.</p>
              </div>
           </div>

           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
             <button className="px-8 py-4 bg-foreground text-background rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-xl">
               <MessageCircle className="h-5 w-5" /> Chat With Us
             </button>
             <button className="px-8 py-4 bg-white text-foreground border border-border rounded-full font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
               <Mail className="h-5 w-5" /> Email Support
             </button>
           </div>
        </motion.div>

      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Cloud, Smartphone, Code, Briefcase, MessageSquare, Camera, Video, CheckCircle2, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export function CinematicEnding() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-10 overflow-hidden bg-background">
      
      {/* Massive 7-Color Aurora Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] left-[10%] w-[60vw] h-[60vw] bg-aurora-mint rounded-full blur-[180px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[30%] right-[10%] w-[50vw] h-[50vw] bg-aurora-lavender rounded-full blur-[180px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-[20%] left-[30%] w-[70vw] h-[70vw] bg-aurora-aqua rounded-full blur-[180px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.05, 0.15, 0.05] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[50%] right-[30%] w-[40vw] h-[40vw] bg-aurora-pink rounded-full blur-[150px] mix-blend-multiply" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.2, 0.05] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 5 }} className="absolute bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-aurora-gold rounded-full blur-[150px] mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col items-center">
        
        {/* ==========================================
            TOP HALF: THE CTA EXPERIENCE
            ========================================== */}
        <div className="text-center w-full max-w-4xl mb-24 mt-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[4rem] md:text-[5.5rem] leading-[1.05] font-heading font-black tracking-tight text-foreground mb-8"
          >
            Where Modern <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-aqua via-aurora-lavender to-aurora-pink">
              Communities Belong.
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto"
          >
            Simple. Secure. Built for the future of residential living.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
             <Link 
                to="/auth/signup"
                className="relative group px-10 py-5 rounded-full font-bold text-lg text-white w-full sm:w-auto shadow-xl hover:shadow-[0_0_40px_rgba(143,124,255,0.4)] transition-all duration-300 hover:scale-105 flex items-center justify-center text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-lavender via-aurora-pink to-aurora-coral rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-mint via-aurora-aqua to-aurora-lavender rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
             </Link>
             
             <button className="px-10 py-5 rounded-full font-bold text-lg text-foreground bg-white/40 backdrop-blur-md border border-white/60 hover:bg-white hover:scale-105 transition-all w-full sm:w-auto shadow-sm">
                Book a Live Demo
             </button>
          </motion.div>

          {/* Trust Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8"
          >
            {[
              { icon: ShieldCheck, text: "Secure Auth" },
              { icon: Zap, text: "Real-Time" },
              { icon: Cloud, text: "Cloud Ready" },
              { icon: Smartphone, text: "Mobile Friendly" }
            ].map((trust, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-muted-foreground px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/50">
                <trust.icon className="h-4 w-4" /> {trust.text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* ==========================================
            MIDDLE HALF: NEWSLETTER
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-12 border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] mb-40 relative z-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-black text-foreground mb-2">Stay Updated.</h3>
            <p className="text-muted-foreground font-light">Get the latest platform updates and community management tips.</p>
          </div>

          <AnimatePresence mode="wait">
            {!subscribed ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubscribe} 
                className="flex flex-col sm:flex-row gap-3 relative"
              >
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@society.com" 
                  required
                  className="flex-1 px-6 py-4 rounded-full bg-white/50 border border-white/80 outline-none focus:ring-2 focus:ring-aurora-lavender focus:bg-white transition-all text-foreground font-medium"
                />
                <button type="submit" className="px-8 py-4 rounded-full bg-foreground text-background font-bold hover:scale-105 transition-transform shadow-md">
                  Subscribe
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 px-6 py-4 bg-success/10 border border-success/20 rounded-full text-success font-bold"
              >
                <CheckCircle2 className="h-5 w-5" /> Subscribed successfully.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ==========================================
            BOTTOM HALF: LUXURY FOOTER
            ========================================== */}
        <div className="w-full border-t border-border/50 pt-20 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 mb-20">
             
             {/* Brand Column */}
             <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                    <span className="text-background font-heading font-black text-sm">SH</span>
                  </div>
                  <span className="font-heading font-black text-xl tracking-tight text-foreground">SocioHub</span>
                </div>
                <p className="text-muted-foreground font-light text-sm mb-8 max-w-xs leading-relaxed">
                  The unified operating system for modern residential communities. Beautifully designed, infinitely scalable.
                </p>
                <div className="flex items-center gap-4">
                 {[Code, Briefcase, MessageSquare, Camera, Video].map((Icon, i) => (
                    <a key={i} href="#" className="h-10 w-10 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-foreground hover:bg-foreground hover:text-background hover:scale-110 transition-all shadow-sm">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
             </div>

             {/* Nav Columns */}
             <div>
               <h4 className="font-bold text-foreground mb-6">Product</h4>
               <ul className="space-y-4">
                 {["Platform", "Security", "Analytics", "Integrations", "Pricing"].map(link => (
                   <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 decoration-border">{link}</a></li>
                 ))}
               </ul>
             </div>
             
             <div>
               <h4 className="font-bold text-foreground mb-6">Resources</h4>
               <ul className="space-y-4">
                 {["Help Center", "Community Forum", "Developer API", "System Status", "Blog"].map(link => (
                   <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 decoration-border">{link}</a></li>
                 ))}
               </ul>
             </div>

             <div>
               <h4 className="font-bold text-foreground mb-6">Company</h4>
               <ul className="space-y-4">
                 {["About Us", "Careers", "Contact", "Privacy Policy", "Terms of Service"].map(link => (
                   <li key={link}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4 decoration-border">{link}</a></li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
             <p className="text-xs text-muted-foreground font-medium">
               &copy; 2026 SocioHub. Made with ❤️ for Modern Communities.
             </p>
             <div className="flex items-center gap-6">
                <span className="text-xs text-muted-foreground font-mono">v1.0.0</span>
                <button 
                  onClick={scrollToTop}
                  className="h-10 w-10 rounded-full bg-foreground text-background flex items-center justify-center hover:scale-110 transition-transform shadow-lg group"
                >
                  <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}

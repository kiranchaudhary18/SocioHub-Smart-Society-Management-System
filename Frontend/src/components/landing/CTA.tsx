import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-foreground">
      {/* Cinematic Aurora Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] bg-gradient-to-tr from-aurora-lavender via-aurora-pink to-aurora-gold rounded-full blur-[150px] opacity-40 pointer-events-none mix-blend-screen" />
      
      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-black text-background mb-8 tracking-tighter">
            Initialize Your <br className="hidden sm:block" /> Ecosystem.
          </h2>
          <p className="text-xl text-muted/70 mb-12 font-light">
            Deploy Aurora Glass OS for your community today and experience invisible, frictionless management.
          </p>
          
          <Link 
            to="/auth/login"
            className="group relative inline-flex h-16 items-center justify-center gap-2 overflow-hidden rounded-full bg-background px-10 font-medium text-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
          >
            <span className="text-lg">Deploy Now</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

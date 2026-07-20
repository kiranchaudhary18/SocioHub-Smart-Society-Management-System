import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function LivingMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale the massive text as user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
  
  // Bloom the aurora based on scroll
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "100px", "0px"]);

  return (
    <section 
      ref={containerRef}
      className="py-32 relative overflow-hidden bg-background min-h-[80vh] flex items-center justify-center"
    >
      <motion.div 
        style={{ filter: `blur(${blur.get()})` }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vw] bg-gradient-to-r from-aurora-gold via-aurora-coral to-aurora-pink rounded-full opacity-30 mix-blend-multiply pointer-events-none"
      />

      <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
        <p className="text-sm font-heading font-bold text-muted-foreground uppercase tracking-[0.3em] mb-8">
          Trusted Scale
        </p>
        
        <motion.div 
          style={{ scale, opacity }}
          className="flex flex-col items-center justify-center w-full"
        >
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
            <div className="text-center">
              <h3 className="text-7xl md:text-9xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                100<span className="text-aurora-coral">+</span>
              </h3>
              <p className="text-xl md:text-2xl font-light text-muted-foreground mt-2">Active Societies</p>
            </div>
            
            <div className="text-center">
              <h3 className="text-7xl md:text-9xl font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
                25<span className="text-aurora-gold">k</span>
              </h3>
              <p className="text-xl md:text-2xl font-light text-muted-foreground mt-2">Daily Users</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-[12vw] leading-none font-heading font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-aurora-gold via-aurora-coral to-aurora-pink">
              1,000,000+
            </h3>
            <p className="text-2xl md:text-3xl font-light text-foreground/80 mt-4">Visitors Processed Securely</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

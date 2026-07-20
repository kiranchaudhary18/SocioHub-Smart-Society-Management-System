import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-aurora-lavender/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 text-center mb-24">
        <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tight text-background mb-6">
          Uncompromising <br className="hidden md:block" /> Fluidity & Speed.
        </h2>
        <p className="text-xl text-muted/60 max-w-2xl mx-auto font-light">
          No loading spinners. No janky transitions. Every interaction is rendered at 60fps to make community management feel like magic.
        </p>
      </div>

      <div className="relative h-[600px] max-w-6xl mx-auto perspective-1000">
        <motion.div 
          style={{ rotateX, scale, opacity }}
          className="w-full h-full relative transform-style-3d flex items-center justify-center"
        >
          {/* Base Layer */}
          <div className="absolute inset-0 bg-background/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl p-8 translate-z-[-100px]">
            <div className="w-full h-full border border-white/5 rounded-2xl bg-white/5" />
          </div>
          
          {/* Middle Layer */}
          <div className="absolute w-[90%] h-[90%] bg-background/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl p-6 translate-z-[0px]">
            <div className="w-full h-12 bg-white/10 rounded-xl mb-4" />
            <div className="w-full h-32 bg-white/5 rounded-xl mb-4" />
            <div className="grid grid-cols-2 gap-4">
               <div className="h-24 bg-white/5 rounded-xl" />
               <div className="h-24 bg-white/5 rounded-xl" />
            </div>
          </div>
          
          {/* Top Floating Layer */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[70%] h-[70%] bg-background/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-[0_0_100px_rgba(180,118,251,0.2)] p-6 translate-z-[100px] flex flex-col"
          >
             <div className="flex justify-between items-center mb-8">
               <div className="h-10 w-40 bg-white/20 rounded-lg" />
               <div className="h-10 w-10 bg-white/20 rounded-full" />
             </div>
             
             <div className="flex-1 bg-gradient-to-br from-white/10 to-transparent rounded-2xl border border-white/10 p-6 flex flex-col justify-end relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-lavender/30 to-aurora-aqua/30 mix-blend-overlay" />
                <div className="h-4 w-1/3 bg-white/40 rounded-full mb-2" />
                <div className="h-8 w-2/3 bg-white/60 rounded-lg" />
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

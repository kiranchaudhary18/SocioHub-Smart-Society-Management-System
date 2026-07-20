import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Society Secretary",
    content: "SocioHub completely transformed how we manage our 500+ apartment complex. Collection of dues is now 100% automated and transparent. It's like having an invisible, highly efficient staff member.",
    gradient: "from-aurora-mint/20 to-aurora-aqua/20",
  },
  {
    name: "Priya Sharma",
    role: "Resident",
    content: "The visitor management system is incredible. I get instant notifications on my phone when a guest arrives, and can pre-approve them easily. The interface is just so satisfying to use.",
    gradient: "from-aurora-pink/20 to-aurora-lavender/20",
  },
  {
    name: "Amit Patel",
    role: "Facility Manager",
    content: "Tracking maintenance complaints used to be a nightmare of WhatsApp messages. Now everything is organized, assigned, and resolved quickly. Truly an OS for our building.",
    gradient: "from-aurora-gold/20 to-aurora-coral/20",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-6"
          >
            Loved by Communities.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10 flex-1">
                <p className="text-foreground text-lg mb-8 leading-relaxed font-light">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="relative z-10 flex items-center gap-4 mt-auto pt-6 border-t border-border/30">
                <div className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center">
                  <span className="font-heading font-bold text-background">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

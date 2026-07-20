import * as React from "react"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export function SuccessStep() {
  React.useEffect(() => {
    // Fire confetti on mount
    const end = Date.now() + 1.5 * 1000
    const colors = ['#72f1d1', '#9b88ed', '#ffffff']

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }())
  }, [])

  return (
    <div className="w-full max-w-[400px] mx-auto text-center space-y-8 py-8">
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
        className="relative w-24 h-24 mx-auto"
      >
        <div className="absolute inset-0 rounded-full bg-aurora-mint/20 animate-pulse blur-xl" />
        <div className="relative w-full h-full rounded-full bg-aurora-mint/20 flex items-center justify-center border border-aurora-mint/50 shadow-[0_0_40px_rgba(114,241,209,0.4)]">
          <CheckCircle2 className="w-12 h-12 text-aurora-mint" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-aurora-mint/10 text-aurora-mint text-xs font-semibold uppercase tracking-wider mb-2">
          Verified Badge Earned
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Account Activated!
        </h1>
        <p className="text-muted-foreground text-base">
          Your email has been successfully verified. Welcome to the SocioHub community.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <Button asChild className="w-full h-11 text-base font-medium group">
          <Link to="/auth/login">
            Continue to Login
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
      
    </div>
  )
}

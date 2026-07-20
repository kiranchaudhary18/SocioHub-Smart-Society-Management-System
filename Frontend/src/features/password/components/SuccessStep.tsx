import { CheckCircle2, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function SuccessStep() {
  return (
    <div className="w-full max-w-[400px] mx-auto text-center space-y-8 py-8">
      
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6, bounce: 0.5 }}
        className="w-24 h-24 rounded-full bg-aurora-mint/20 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(114,241,209,0.3)]"
      >
        <CheckCircle2 className="w-12 h-12 text-aurora-mint" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-heading font-bold text-foreground">
          All done!
        </h1>
        <p className="text-muted-foreground text-base">
          Your password has been reset successfully. You can now use your new password to log in to your account.
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
            Return to Login
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
      
    </div>
  )
}

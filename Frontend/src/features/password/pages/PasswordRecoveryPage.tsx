import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ForgotPasswordStep } from "../components/ForgotPasswordStep"
import { OtpVerificationStep } from "../components/OtpVerificationStep"
import { ResetPasswordStep } from "../components/ResetPasswordStep"
import { SuccessStep } from "../components/SuccessStep"

type RecoveryStep = "EMAIL" | "OTP" | "RESET" | "SUCCESS"

export default function PasswordRecoveryPage() {
  const [currentStep, setCurrentStep] = React.useState<RecoveryStep>("EMAIL")
  const [email, setEmail] = React.useState("")
  const [otp, setOtp] = React.useState("")

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-aurora-mint/20 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-aurora-purple/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 glass rounded-3xl p-8 sm:p-12 shadow-2xl border border-border/50">
        <AnimatePresence mode="wait">
          
          {currentStep === "EMAIL" && (
            <motion.div key="email" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <ForgotPasswordStep 
                onSuccess={(emailSubmitted) => {
                  setEmail(emailSubmitted)
                  setCurrentStep("OTP")
                }} 
              />
            </motion.div>
          )}

          {currentStep === "OTP" && (
            <motion.div key="otp" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <OtpVerificationStep 
                email={email}
                onBack={() => setCurrentStep("EMAIL")}
                onSuccess={(otpSubmitted) => {
                  setOtp(otpSubmitted)
                  setCurrentStep("RESET")
                }} 
              />
            </motion.div>
          )}

          {currentStep === "RESET" && (
            <motion.div key="reset" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <ResetPasswordStep 
                email={email}
                otp={otp}
                onSuccess={() => setCurrentStep("SUCCESS")} 
              />
            </motion.div>
          )}

          {currentStep === "SUCCESS" && (
            <motion.div key="success" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <SuccessStep />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

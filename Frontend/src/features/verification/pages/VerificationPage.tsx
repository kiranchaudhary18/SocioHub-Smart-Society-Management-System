import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import { VerificationRequiredStep } from "../components/VerificationRequiredStep"
import { OtpVerificationStep } from "../components/OtpVerificationStep"
import { VerifyingStep } from "../components/VerifyingStep"
import { SuccessStep } from "../components/SuccessStep"
import { FailedStep } from "../components/FailedStep"
import { useVerifyEmail } from "../hooks/useVerification"

type VerificationWizardStep = "REQUIRED" | "OTP" | "VERIFYING" | "SUCCESS" | "FAILED"

export default function VerificationPage() {
  const [searchParams] = useSearchParams()
  const initialEmail = searchParams.get("email") || "newuser@resicore.com"
  
  const [currentStep, setCurrentStep] = React.useState<VerificationWizardStep>("REQUIRED")
  const [email] = React.useState(initialEmail)
  const [errorType, setErrorType] = React.useState("FAILED")

  const { mutate: verifyOtp } = useVerifyEmail()

  const handleVerifyOtp = (otp: string) => {
    setCurrentStep("VERIFYING")
    verifyOtp(
      { email, otp },
      {
        onSuccess: () => {
          setCurrentStep("SUCCESS")
        },
        onError: (error) => {
          setErrorType(error.message)
          setCurrentStep("FAILED")
        }
      }
    )
  }

  const variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-aurora-mint/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="w-full max-w-lg relative z-10 glass rounded-3xl p-8 sm:p-12 shadow-2xl border border-border/50 min-h-[500px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {currentStep === "REQUIRED" && (
            <motion.div key="required" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <VerificationRequiredStep 
                email={email}
                onSent={() => setCurrentStep("OTP")}
              />
            </motion.div>
          )}

          {currentStep === "OTP" && (
            <motion.div key="otp" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <OtpVerificationStep 
                email={email}
                onBack={() => setCurrentStep("REQUIRED")}
                onSubmitCode={handleVerifyOtp}
              />
            </motion.div>
          )}

          {currentStep === "VERIFYING" && (
            <motion.div key="verifying" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <VerifyingStep />
            </motion.div>
          )}

          {currentStep === "SUCCESS" && (
            <motion.div key="success" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <SuccessStep />
            </motion.div>
          )}

          {currentStep === "FAILED" && (
            <motion.div key="failed" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
              <FailedStep 
                errorType={errorType}
                onRetry={() => setCurrentStep("OTP")}
                onRequestNew={() => setCurrentStep("REQUIRED")}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, KeySquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { otpVerificationSchema, type OtpVerificationData } from "../validators"
import { useResendVerification } from "../hooks/useVerification"

interface Props {
  email: string
  onBack: () => void
  onSubmitCode: (otp: string) => void
}

export function OtpVerificationStep({ email, onBack, onSubmitCode }: Props) {
  const { mutate: resendOtp, isPending: isResending } = useResendVerification()
  
  const [countdown, setCountdown] = React.useState(30)

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const form = useForm<OtpVerificationData>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: { otp: "" },
  })

  // Watch for full 6 digits to optionally auto-submit
  const otpValue = form.watch("otp")
  React.useEffect(() => {
    if (otpValue && otpValue.length === 6) {
      // Auto submit
      form.handleSubmit((data) => onSubmitCode(data.otp))()
    }
  }, [otpValue, form, onSubmitCode])

  function onSubmit(data: OtpVerificationData) {
    onSubmitCode(data.otp)
  }

  function handleResend() {
    resendOtp({ email }, {
      onSuccess: () => {
        setCountdown(30)
      }
    })
  }

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8 animate-in slide-in-from-right-4 duration-300">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-aurora-mint/10 flex items-center justify-center mx-auto mb-6 shadow-glow">
          <KeySquare className="w-8 h-8 text-aurora-mint" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Enter code
        </h1>
        <p className="text-muted-foreground text-sm">
          We sent a 6-digit verification code to <br/>
          <span className="font-semibold text-foreground">{email}</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormControl>
                  <InputOTP maxLength={6} {...field} autoFocus>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={1} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={2} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={3} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={4} className="w-12 h-14 text-lg" />
                      <InputOTPSlot index={5} className="w-12 h-14 text-lg" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={otpValue?.length !== 6}>
            Verify Account
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <div className="text-sm text-muted-foreground">
          Didn't receive the email?{" "}
          <button 
            type="button" 
            disabled={countdown > 0 || isResending}
            onClick={handleResend}
            className="font-semibold text-primary hover:underline underline-offset-4 disabled:text-muted disabled:hover:no-underline disabled:cursor-not-allowed"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Click to resend"}
          </button>
        </div>
        <button 
          onClick={onBack}
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Change email address
        </button>
      </div>
      
      {/* Mock Hint */}
      <div className="p-4 rounded-xl border border-border/50 bg-muted/30 text-xs text-muted-foreground mt-4 text-center space-y-1">
        <p className="font-medium text-foreground">Mock Verification Codes:</p>
        <p>123456 (Success) | 000000 (Expired)</p>
        <p>999999 (Already Verified) | Any other (Failed)</p>
      </div>
    </div>
  )
}

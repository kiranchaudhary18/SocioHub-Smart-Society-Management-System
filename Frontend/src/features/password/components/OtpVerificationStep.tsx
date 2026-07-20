import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ArrowLeft, KeyRound } from "lucide-react"

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

import { otpSchema, type OtpData } from "../validators"
import { useVerifyOtp, useForgotPassword } from "../hooks/usePasswordRecovery"
import { toast } from "sonner"

interface Props {
  email: string
  onBack: () => void
  onSuccess: (otp: string) => void
}

export function OtpVerificationStep({ email, onBack, onSuccess }: Props) {
  const { mutate: verifyOtp, isPending } = useVerifyOtp()
  const { mutate: resendOtp, isPending: isResending } = useForgotPassword()
  
  const [countdown, setCountdown] = React.useState(30)

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const form = useForm<OtpData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  function onSubmit(data: OtpData) {
    verifyOtp(
      { email, otp: data.otp },
      {
        onSuccess: () => {
          onSuccess(data.otp)
        }
      }
    )
  }

  function handleResend() {
    resendOtp({ email }, {
      onSuccess: () => {
        setCountdown(30)
        toast.success("New OTP sent to your email")
      }
    })
  }

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-aurora-mint/10 flex items-center justify-center mx-auto mb-6 shadow-glow">
          <KeyRound className="w-8 h-8 text-aurora-mint" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Check your email
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
                  <InputOTP maxLength={6} {...field} disabled={isPending}>
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

          <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
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
          Back to Login
        </button>
      </div>
    </div>
  )
}

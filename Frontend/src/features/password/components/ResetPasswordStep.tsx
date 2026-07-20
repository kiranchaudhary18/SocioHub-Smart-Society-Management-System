import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, ShieldAlert, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { resetPasswordSchema, type ResetPasswordData } from "../validators"
import { useResetPassword } from "../hooks/usePasswordRecovery"

interface Props {
  email: string
  otp: string
  onSuccess: () => void
}

export function ResetPasswordStep({ email, otp, onSuccess }: Props) {
  const { mutate: resetPassword, isPending } = useResetPassword()

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
    mode: "onChange"
  })

  const passwordValue = form.watch("newPassword")

  // Password Requirements Checklist
  const requirements = [
    { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
    { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
    { label: "One number", test: (v: string) => /[0-9]/.test(v) },
    { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
  ]

  function onSubmit(data: ResetPasswordData) {
    resetPassword(
      { email, otp, newPassword: data.newPassword },
      { onSuccess: () => onSuccess() }
    )
  }

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8">
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 rounded-full bg-aurora-purple/10 flex items-center justify-center mx-auto mb-6 shadow-glow">
          <ShieldAlert className="w-8 h-8 text-aurora-purple" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Create new password
        </h1>
        <p className="text-muted-foreground text-sm">
          Please enter a strong password that you haven't used before.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput 
                    placeholder="Enter new password"
                    disabled={isPending}
                    {...field} 
                  />
                </FormControl>
                {/* Visual Checklist */}
                <div className="mt-3 grid grid-cols-1 gap-2 pt-2">
                  {requirements.map((req, i) => {
                    const met = req.test(passwordValue || "")
                    return (
                      <div key={i} className="flex items-center text-xs">
                        {met ? (
                          <Check className="w-3.5 h-3.5 text-aurora-mint mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-muted-foreground mr-2 flex-shrink-0" />
                        )}
                        <span className={met ? "text-foreground" : "text-muted-foreground"}>
                          {req.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput 
                    placeholder="Confirm new password"
                    disabled={isPending}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-11 text-base font-medium mt-4" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

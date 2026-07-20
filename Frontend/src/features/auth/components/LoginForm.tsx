import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { loginSchema, type LoginFormData } from "../validators"
import { useLogin } from "../hooks/useLogin"
import { CustomCheckbox } from "./CustomCheckbox"
import { cn } from "@/lib/utils"

export function LoginForm() {
  const { mutate: login, isPending } = useLogin()
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(data: LoginFormData) {
    login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    })
  }

  return (
    <div className="w-full max-w-[440px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 relative z-20">
      
      {/* Header */}
      <div className="text-center mb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#72F1D1] to-[#3DD9FF] flex items-center justify-center shadow-lg mb-6"
        >
          <span className="text-3xl font-heading font-black text-white">S</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[32px] font-heading font-extrabold text-slate-900 tracking-tight mb-2"
        >
          Welcome Back
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-500 font-medium text-sm"
        >
          Sign in to your intelligent workspace
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className={cn(
                    "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300",
                    focusedField === 'email' ? 'text-[#3DD9FF]' : 'text-slate-400'
                  )}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <FormControl>
                    <input 
                      placeholder="Email address" 
                      type="email"
                      autoComplete="email"
                      disabled={isPending}
                      onFocus={() => setFocusedField('email')}
                      className="w-full pl-12 h-14 bg-white/50 border border-slate-200/60 hover:border-slate-300 focus:outline-none focus:border-[#3DD9FF] focus:ring-4 focus:ring-[#3DD9FF]/10 rounded-2xl transition-all text-base text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      {...field} 
                      onBlur={() => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#FF5DA2]" />
                </FormItem>
              )}
            />

            {/* Password Input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <div className={cn(
                    "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300",
                    focusedField === 'password' ? 'text-[#3DD9FF]' : 'text-slate-400'
                  )}>
                    <Lock className="w-5 h-5" />
                  </div>
                  <FormControl>
                    <input 
                      placeholder="Password" 
                      type="password"
                      autoComplete="current-password"
                      disabled={isPending}
                      onFocus={() => setFocusedField('password')}
                      className="w-full pl-12 h-14 bg-white/50 border border-slate-200/60 hover:border-slate-300 focus:outline-none focus:border-[#3DD9FF] focus:ring-4 focus:ring-[#3DD9FF]/10 rounded-2xl transition-all text-base text-slate-800 pr-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      {...field} 
                      onBlur={() => {
                        setFocusedField(null)
                        field.onBlur()
                      }}
                    />
                  </FormControl>
                  <Link 
                    to="/auth/recovery" 
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-bold text-[#8F7CFF] hover:text-[#8F7CFF]/80 transition-colors"
                  >
                    Forgot?
                  </Link>
                  <FormMessage className="text-xs text-[#FF5DA2]" />
                </FormItem>
              )}
            />

            {/* Remember Me */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="pt-2 pb-2">
                  <FormControl>
                    <CustomCheckbox
                      checked={field.value ?? false}
                      onChange={field.onChange}
                      label="Remember me for 30 days"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-base font-bold group relative overflow-hidden bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-300" 
              disabled={isPending}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#72F1D1] via-[#3DD9FF] to-[#8F7CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">Sign In</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </Button>
          </form>
        </Form>
      </motion.div>

    </div>
  )
}

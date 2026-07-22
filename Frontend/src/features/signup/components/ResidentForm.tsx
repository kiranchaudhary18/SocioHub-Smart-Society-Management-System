import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, Home, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { residentSchema, type ResidentFormData } from "../validators";
import { useResidentSignup, useValidateSocietyCode } from "../hooks/useSignup";
import { CustomCheckbox } from "@/features/auth/components/CustomCheckbox";
import { cn } from "@/lib/utils";

import { useNavigate } from "react-router-dom";
import { useSession } from "@/hooks/useSession";
import { toast } from "sonner";

interface ResidentFormProps {
  onBack: () => void;
}

export function ResidentForm({ onBack }: ResidentFormProps) {
  const navigate = useNavigate();
  const { login } = useSession();
  
  const { mutate: signup, isPending: isSigningUp } = useResidentSignup();
  const { mutate: validateCode, isPending: isValidating, data: validationResult } = useValidateSocietyCode();

  const form = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      societyCode: "",
      flatNumber: "",
      residentType: "OWNER",
      agreedToTerms: undefined,
    },
  });

  const societyCodeValue = form.watch("societyCode");
  
  // Custom simple debounce for the code validation
  useEffect(() => {
    if (societyCodeValue && societyCodeValue.length >= 4) {
      const handler = setTimeout(() => {
        validateCode(societyCodeValue);
      }, 500);
      return () => clearTimeout(handler);
    }
  }, [societyCodeValue, validateCode]);

  function onSubmit(data: ResidentFormData) {
    if (validationResult && !validationResult.isValid) {
      form.setError("societyCode", { message: "Cannot proceed with invalid code" });
      return;
    }
    
    signup(data, {
      onSuccess: (response) => {
        login(response.user, { accessToken: response.token, refreshToken: response.token });
        toast.success("Welcome to ResiCore!");
        navigate("/resident");
      },
    });
  }

  const inputClass = "w-full px-4 h-11 bg-white/50 border border-slate-200/60 hover:border-slate-300 focus:outline-none focus:border-[#3DD9FF] focus:ring-4 focus:ring-[#3DD9FF]/10 rounded-xl transition-all text-sm text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-[540px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] rounded-[32px] p-6 sm:p-8 relative z-20"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          type="button"
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Home className="w-5 h-5 text-[#3DD9FF]" />
            Resident Setup
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Join your community</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Full Name" type="text" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Email Address" type="email" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Phone Number" type="tel" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            <FormField control={form.control} name="flatNumber" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Flat Number (e.g. A-402)" type="text" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          {/* Society Code with Inline Validation */}
          <FormField control={form.control} name="societyCode" render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <input 
                    placeholder="Society Code (e.g. RH4821)" 
                    type="text" 
                    disabled={isSigningUp} 
                    className={cn(inputClass, "uppercase pr-12", validationResult?.isValid === false && "border-red-300")} 
                    {...field} 
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValidating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#3DD9FF]" />
                    ) : validationResult?.isValid === true ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : validationResult?.isValid === false ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                </div>
              </FormControl>
              <AnimatePresence>
                {validationResult?.isValid && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <p className="text-xs font-bold text-green-600 mt-1 pl-1">✅ {validationResult.societyName}, {validationResult.city}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <FormMessage className="text-[10px] text-[#FF5DA2]" />
            </FormItem>
          )} />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Password" type="password" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input placeholder="Confirm Password" type="password" disabled={isSigningUp} className={inputClass} {...field} />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.setValue("residentType", "OWNER")}
              className={cn("h-11 rounded-xl transition-all border-slate-200 font-bold", form.watch("residentType") === "OWNER" ? "bg-[#3DD9FF]/10 border-[#3DD9FF] text-[#00a3cc]" : "text-slate-500 hover:bg-slate-50")}
            >
              Owner
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => form.setValue("residentType", "TENANT")}
              className={cn("h-11 rounded-xl transition-all border-slate-200 font-bold", form.watch("residentType") === "TENANT" ? "bg-[#3DD9FF]/10 border-[#3DD9FF] text-[#00a3cc]" : "text-slate-500 hover:bg-slate-50")}
            >
              Tenant
            </Button>
          </div>

          <FormField control={form.control} name="agreedToTerms" render={({ field }) => (
            <FormItem className="pt-2">
              <FormControl>
                <CustomCheckbox checked={field.value ?? false} onChange={field.onChange} label="I agree to the Terms of Service" disabled={isSigningUp} />
              </FormControl>
              <FormMessage className="text-[10px] text-[#FF5DA2]" />
            </FormItem>
          )} />

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-sm font-bold group relative overflow-hidden bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-300 mt-2" 
            disabled={isSigningUp || (validationResult !== undefined && !validationResult.isValid)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3DD9FF] to-[#72F1D1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isSigningUp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <span>Join Society</span>
              )}
            </div>
          </Button>

        </form>
      </Form>
    </motion.div>
  );
}

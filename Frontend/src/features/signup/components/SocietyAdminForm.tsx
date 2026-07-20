import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { societyAdminSchema, type SocietyAdminFormData } from "../validators";
import { useSocietyAdminSignup } from "../hooks/useSignup";
import { CustomCheckbox } from "@/features/auth/components/CustomCheckbox";

interface SocietyAdminFormProps {
  onBack: () => void;
}

export function SocietyAdminForm({ onBack }: SocietyAdminFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: signup, isPending } = useSocietyAdminSignup();

  const form = useForm<SocietyAdminFormData>({
    resolver: zodResolver(societyAdminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      societyName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      agreedToTerms: undefined, // Let it be undefined so it throws error if false
    },
  });

  function onSubmit(data: SocietyAdminFormData) {
    signup(data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
    });
  }

  // Define input classes to reuse
  const inputClass = "w-full px-4 h-11 bg-white/50 border border-slate-200/60 hover:border-slate-300 focus:outline-none focus:border-[#8F7CFF] focus:ring-4 focus:ring-[#8F7CFF]/10 rounded-xl transition-all text-sm text-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.02)]";

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[500px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] rounded-[32px] p-8 sm:p-10 relative z-20 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Request Submitted Successfully</h2>
        <p className="text-slate-500 font-medium mb-8 leading-relaxed text-sm">
          Your society creation request is waiting for Super Admin approval. Once approved, your Society Code will be generated and you will receive an email notification.
        </p>
        
        <Button 
          onClick={() => window.location.href = '/'}
          className="w-full h-12 rounded-xl text-sm font-bold bg-slate-900 text-white hover:-translate-y-0.5 transition-all"
        >
          Return to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-[540px] bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_24px_60px_rgba(0,0,0,0.05)] rounded-[32px] p-6 sm:p-8 relative z-20"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#8F7CFF]" />
            Society Admin Setup
          </h2>
          <p className="text-xs font-medium text-slate-500 mt-1">Create your society profile</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            {/* Full Name */}
            <FormField control={form.control} name="fullName" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Full Name" 
                    type="text"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            {/* Email */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Email Address" 
                    type="email"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Phone Number */}
            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Phone Number" 
                    type="tel"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            {/* Society Name */}
            <FormField control={form.control} name="societyName" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Society Name" 
                    type="text"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          {/* Address */}
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormControl>
                <input 
                  placeholder="Complete Address" 
                  type="text"
                  disabled={isPending}
                  className={inputClass}
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-[10px] text-[#FF5DA2]" />
            </FormItem>
          )} />

          <div className="grid grid-cols-3 gap-3">
            {/* City */}
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input 
                    placeholder="City" 
                    type="text"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            {/* State */}
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input 
                    placeholder="State" 
                    type="text"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            {/* Pincode */}
            <FormField control={form.control} name="pincode" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input 
                    placeholder="Pincode" 
                    type="text"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Password */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Password" 
                    type="password"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />

            {/* Confirm Password */}
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormControl>
                  <input 
                    placeholder="Confirm Password" 
                    type="password"
                    disabled={isPending}
                    className={inputClass}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-[10px] text-[#FF5DA2]" />
              </FormItem>
            )} />
          </div>

          {/* Terms Checkbox */}
          <FormField control={form.control} name="agreedToTerms" render={({ field }) => (
            <FormItem className="pt-2">
              <FormControl>
                <CustomCheckbox
                  checked={field.value ?? false}
                  onChange={field.onChange}
                  label="I agree to the Terms of Service and Privacy Policy"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="text-[10px] text-[#FF5DA2]" />
            </FormItem>
          )} />

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl text-sm font-bold group relative overflow-hidden bg-slate-900 text-white shadow-[0_8px_20px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_24px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 transition-all duration-300 mt-2" 
            disabled={isPending}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Profile...</span>
                </>
              ) : (
                <span>Create Society</span>
              )}
            </div>
          </Button>

        </form>
      </Form>
    </motion.div>
  );
}

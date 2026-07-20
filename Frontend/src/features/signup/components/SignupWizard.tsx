import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AccountTypeSelection } from "./AccountTypeSelection";
import { SocietyAdminForm } from "./SocietyAdminForm";
import { ResidentForm } from "./ResidentForm";
import { Link } from "react-router-dom";

export function SignupWizard() {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<'ADMIN' | 'RESIDENT' | null>(null);

  const handleSelectType = (type: 'ADMIN' | 'RESIDENT') => {
    setAccountType(type);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    // Optional: wait for animation before clearing accountType
    setTimeout(() => setAccountType(null), 300);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center xl:items-start max-w-[540px] relative">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <AccountTypeSelection key="selection" onSelect={handleSelectType} />
        )}

        {step === 2 && accountType === 'ADMIN' && (
          <motion.div key="admin-form" className="w-full">
            <SocietyAdminForm onBack={handleBack} />
          </motion.div>
        )}

        {step === 2 && accountType === 'RESIDENT' && (
          <motion.div key="resident-form" className="w-full">
            <ResidentForm onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center xl:text-left w-full mt-6 xl:mt-8">
        <p className="text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#8F7CFF] hover:text-[#8F7CFF]/80 transition-colors hover:underline underline-offset-4 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

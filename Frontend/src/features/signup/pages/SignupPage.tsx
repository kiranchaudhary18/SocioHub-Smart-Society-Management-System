import { SignupVisuals } from "../components/SignupVisuals";
import { SignupWizard } from "../components/SignupWizard";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#FCFCFD] relative overflow-hidden font-body">
      
      {/* 
        Aurora Background Effects 
        Subtle light theme blobs that emulate the Aurora Glass OS
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#8F7CFF] rounded-full blur-[140px] mix-blend-multiply opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[5%] w-[60vw] h-[60vw] bg-[#3DD9FF] rounded-full blur-[150px] mix-blend-multiply opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] bg-[#72F1D1] rounded-full blur-[130px] mix-blend-multiply opacity-20" 
        />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 xl:px-24 h-full flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-24 relative z-10">
        
        {/* Left Side: Floating Visuals (Hidden on small screens) */}
        <div className="hidden xl:flex flex-1 items-center justify-center w-full max-w-[600px]">
          <SignupVisuals />
        </div>

        {/* Right Side: Signup Wizard */}
        <div className="flex-1 flex flex-col justify-center items-center xl:items-start w-full max-w-[540px]">
          <SignupWizard />
        </div>
        
      </div>
    </div>
  );
}

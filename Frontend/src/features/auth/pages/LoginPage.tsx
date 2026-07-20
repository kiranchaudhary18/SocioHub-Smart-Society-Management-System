import { FloatingWidgets } from "../components/FloatingWidgets"
import { LoginForm } from "../components/LoginForm"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FCFCFD] relative overflow-y-auto overflow-x-hidden font-body">
      
      {/* 
        Aurora Background Effects 
        Subtle light theme blobs that emulate the Aurora Glass OS
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#72F1D1] rounded-full blur-[140px] mix-blend-multiply opacity-40" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[10%] w-[60vw] h-[60vw] bg-[#3DD9FF] rounded-full blur-[150px] mix-blend-multiply opacity-30" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] bg-[#8F7CFF] rounded-full blur-[130px] mix-blend-multiply opacity-20" 
        />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-12 xl:px-24 min-h-screen py-8 lg:py-12 flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-24 relative z-10">
        
        {/* Left Side: Floating Visuals (Hidden on small screens) */}
        <div className="hidden xl:flex flex-1 items-center justify-center w-full max-w-[600px]">
          <FloatingWidgets />
        </div>

        {/* Right Side: Login Form Hero */}
        <div className="flex-1 flex flex-col justify-center items-center xl:items-start w-full max-w-[500px] mt-12 xl:mt-24">
          <LoginForm />
          
          <div className="mt-8 text-center xl:text-left w-full max-w-[440px] px-4">
            <p className="text-sm font-medium text-slate-500">
              Is your society not registered?{" "}
              <Link to="/auth/signup" className="text-[#3DD9FF] hover:text-[#3DD9FF]/80 transition-colors hover:underline underline-offset-4 font-bold">
                Register Now
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  )
}

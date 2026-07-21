import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-screen w-full flex bg-[#FCFCFD] relative overflow-hidden font-body text-slate-900">
      
      {/* 
        Aurora Background Effects 
        Subtle light theme blobs that emulate the Aurora Glass OS
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-[#8F7CFF] rounded-full blur-[140px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[5%] w-[60vw] h-[60vw] bg-[#3DD9FF] rounded-full blur-[150px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[20%] right-[30%] w-[40vw] h-[40vw] bg-[#72F1D1] rounded-full blur-[130px] mix-blend-multiply" 
        />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        <Topbar />
        
        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar px-6 lg:px-8 pb-8 pt-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
          >
            {children || <Outlet />}
          </motion.div>
        </main>
      </div>
      
    </div>
  );
}

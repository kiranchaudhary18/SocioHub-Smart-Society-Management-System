import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { motion } from "framer-motion";

export default function ResidentLayout() {
  return (
    <div className="flex h-screen w-full bg-[#FCFCFD] overflow-hidden font-body relative">
      
      {/* Background Aurora Effects (Subtle version for layout) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-[#8F7CFF] rounded-full blur-[120px] mix-blend-multiply" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-[#3DD9FF] rounded-full blur-[140px] mix-blend-multiply" 
        />
      </div>

      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <Topbar />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full max-w-[1440px] mx-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

    </div>
  );
}

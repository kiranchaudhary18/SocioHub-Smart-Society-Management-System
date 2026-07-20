import * as React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { Toaster } from "@/components/ui/feedback/toaster"

export default function AppLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary-200">
      
      {/* Global Toast Provider */}
      <Toaster />

      {/* Sidebar Area */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Placeholder for Topbar (to be built in Package 2) */}
        <header className="h-16 w-full glass-light border-b border-border/50 shrink-0 flex items-center px-6 z-30 sticky top-0">
          <div className="flex-1">
            <span className="text-sm text-muted-foreground font-medium">Dashboard / Overview</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative z-10">
          {/* Subtle background glow effect for the main content area */}
          <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
          
          <Outlet />
        </div>
      </main>

    </div>
  )
}

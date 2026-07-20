import { Outlet } from "react-router-dom"
import { AuthenticatedSidebar } from "../components/layout/AuthenticatedSidebar"
import { Topbar } from "../components/layout/Topbar"
import { CommandPalette } from "../components/layout/CommandPalette"

export default function AuthenticatedLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AuthenticatedSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette />
    </div>
  )
}

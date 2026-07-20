import { Outlet } from "react-router-dom"

export default function BlankLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Outlet />
    </main>
  )
}

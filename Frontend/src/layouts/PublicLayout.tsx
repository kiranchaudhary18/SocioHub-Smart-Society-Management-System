import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Navbar Placeholder */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="font-heading font-bold text-xl text-gradient-primary">SocioHub</span>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-6 md:px-8 md:py-0 border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 SocioHub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

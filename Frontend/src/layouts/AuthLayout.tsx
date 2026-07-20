import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 relative overflow-hidden">
      {/* Decorative background blobs for a premium soft aesthetic */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-3xl" />
      
      <main className="w-full max-w-md p-6 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-heading font-bold text-gradient-primary">SocioHub</h1>
          <p className="text-muted-foreground mt-2">One Platform. One Society. Infinite Simplicity.</p>
        </div>
        
        {/* Soft shadow card */}
        <div className="bg-card rounded-[24px] p-8 shadow-floating border border-border/50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

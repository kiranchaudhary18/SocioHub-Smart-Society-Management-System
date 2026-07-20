import { Loader2 } from "lucide-react"

export function VerifyingStep() {
  return (
    <div className="w-full max-w-[400px] mx-auto text-center space-y-8 py-12">
      
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-primary/20" />
        
        {/* Animated progress ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-primary border-t-transparent animate-spin" />
        
        {/* Inner icon */}
        <Loader2 className="w-8 h-8 text-primary animate-pulse" />
      </div>

      <div className="space-y-2 animate-pulse">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Verifying...
        </h2>
        <p className="text-muted-foreground text-sm">
          Please wait while we verify your account securely.
        </p>
      </div>
      
    </div>
  )
}

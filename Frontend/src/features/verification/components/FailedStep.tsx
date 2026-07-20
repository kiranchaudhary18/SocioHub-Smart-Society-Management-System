import { XOctagon, Clock, RefreshCcw, ArrowLeft, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Props {
  errorType: string // "FAILED" | "EXPIRED" | "ALREADY_VERIFIED" | "NETWORK_ERROR"
  onRetry: () => void
  onRequestNew: () => void
}

export function FailedStep({ errorType, onRetry, onRequestNew }: Props) {
  let Icon = XOctagon
  let title = "Verification Failed"
  let description = "We couldn't verify your account. The code might be incorrect."
  let actionBtn = (
    <Button onClick={onRetry} className="w-full h-11 text-base font-medium">
      <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
    </Button>
  )

  if (errorType === "EXPIRED") {
    Icon = Clock
    title = "Link Expired"
    description = "For your security, verification codes expire after 10 minutes."
    actionBtn = (
      <Button onClick={onRequestNew} className="w-full h-11 text-base font-medium">
        <RefreshCcw className="w-4 h-4 mr-2" /> Request New Code
      </Button>
    )
  } else if (errorType === "ALREADY_VERIFIED") {
    Icon = ShieldAlert
    title = "Already Verified"
    description = "This account has already been verified. You can proceed to log in."
    actionBtn = (
      <Button asChild className="w-full h-11 text-base font-medium">
        <Link to="/auth/login">Continue to Login</Link>
      </Button>
    )
  }

  return (
    <div className="w-full max-w-[400px] mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-8 shadow-glow-destructive">
        <Icon className="w-10 h-10 text-destructive" />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4 pt-4">
        {actionBtn}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <Link 
          to="/auth/login" 
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>
      </div>
    </div>
  )
}

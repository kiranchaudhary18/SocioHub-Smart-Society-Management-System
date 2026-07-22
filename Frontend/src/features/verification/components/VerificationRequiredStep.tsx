import { Loader2, Mailbox, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useSendVerification } from "../hooks/useVerification"
import { toast } from "sonner"

interface Props {
  email: string
  onSent: () => void
}

export function VerificationRequiredStep({ email, onSent }: Props) {
  const { mutate: sendEmail, isPending } = useSendVerification()

  function handleSend() {
    sendEmail(
      { email },
      {
        onSuccess: () => {
          toast.success("Verification email sent")
          onSent()
        }
      }
    )
  }

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8 text-center animate-in fade-in zoom-in-95 duration-500">
      
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 shadow-glow">
        <Mailbox className="w-10 h-10 text-primary" />
      </div>
      
      <div className="space-y-3">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          Verify your ResiCore account
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          To keep ResiCore secure, we need to verify your email address. We will send a 6-digit code to: <br/>
          <span className="font-semibold text-foreground mt-2 inline-block">{email}</span>
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <Button 
          onClick={handleSend} 
          className="w-full h-11 text-base font-medium" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending code...
            </>
          ) : (
            "Send Verification Code"
          )}
        </Button>
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

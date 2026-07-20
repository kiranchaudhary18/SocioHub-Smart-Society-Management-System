import { Toaster as Sonner, toast } from "sonner"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:glass-strong group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg overflow-hidden relative font-sans",
          description: "group-[.toast]:text-muted-foreground text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium rounded-md",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium rounded-md",
          success: "group-[.toaster]:!border-success/30 group-[.toaster]:!bg-success/5 dark:group-[.toaster]:!bg-success/10",
          error: "group-[.toaster]:!border-destructive/30 group-[.toaster]:!bg-destructive/5 dark:group-[.toaster]:!bg-destructive/10",
          warning: "group-[.toaster]:!border-warning/30 group-[.toaster]:!bg-warning/5 dark:group-[.toaster]:!bg-warning/10",
          info: "group-[.toaster]:!border-info/30 group-[.toaster]:!bg-info/5 dark:group-[.toaster]:!bg-info/10",
        },
      }}
      icons={{
        success: <CheckCircle className="h-5 w-5 text-success-600" />,
        error: <XCircle className="h-5 w-5 text-destructive-600" />,
        warning: <AlertTriangle className="h-5 w-5 text-warning-600" />,
        info: <Info className="h-5 w-5 text-info-600" />,
      }}
      position="bottom-right"
      {...props}
    />
  )
}

export { Toaster, toast }

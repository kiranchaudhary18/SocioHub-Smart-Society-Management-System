import { motion } from "framer-motion"
import { toast } from "@/components/ui/feedback/toaster"
import { Alert } from "@/components/ui/feedback/alert"
import { Button } from "@/components/ui/button"

export default function FeedbackShowcase() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display-m font-heading bg-gradient-to-r from-aurora-lavender to-aurora-mint bg-clip-text text-transparent"
        >
          Feedback System
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Explore the Aurora Glass OS notification and alert components.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-h4 font-heading border-b pb-2">Toast Notifications</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Powered by Sonner. These notifications queue intelligently and feature swipe-to-dismiss gestures.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            onClick={() => toast("Profile updated", { description: "Your changes have been saved successfully." })}
          >
            Default Toast
          </Button>
          <Button 
            variant="success" 
            onClick={() => toast.success("Payment Received", { description: "$145.00 has been credited to your account." })}
          >
            Success Toast
          </Button>
          <Button 
            variant="danger" 
            onClick={() => toast.error("Connection Lost", { description: "Unable to reach the server. Please try again." })}
          >
            Error Toast
          </Button>
          <Button 
            variant="warning" 
            onClick={() => toast.warning("High CPU Usage", { description: "System resources are currently constrained." })}
          >
            Warning Toast
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => toast.info("New Update Available", { 
              description: "Version 2.4.0 is ready to install.",
              action: { label: "Update", onClick: () => console.log("Update clicked") }
            })}
          >
            Action Toast
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-h4 font-heading border-b pb-2">Page Alerts</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          Inline banners for providing context within a page.
        </p>
        
        <div className="grid gap-4">
          <Alert variant="info" title="Scheduled Maintenance">
            The SocioHub platform will undergo maintenance on Sunday at 2:00 AM UTC. Expect up to 30 minutes of downtime.
          </Alert>

          <Alert variant="success" title="Migration Complete">
            All resident records have been successfully migrated to the new database format.
          </Alert>

          <Alert variant="warning" title="Storage Almost Full" onClose={() => {}}>
            Your society is using 95% of its allocated document storage. Please upgrade your plan or remove old notices.
          </Alert>

          <Alert variant="danger" title="Security Breach Attempt Detected">
            Multiple failed login attempts were detected from an unknown IP address on the Super Admin account.
          </Alert>

          <Alert variant="glass" title="Premium Glass Alert" icon={false}>
            This alert uses the strong glassmorphic background, ideal for displaying subtle information over complex backgrounds.
          </Alert>
        </div>
      </section>

    </div>
  )
}

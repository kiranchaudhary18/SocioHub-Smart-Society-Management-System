import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Mail, Lock, CheckCircle2, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

export default function FormShowcase() {
  const [loading, setLoading] = useState(false)

  const handleSimulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background p-8 md:p-16 lg:p-24 selection:bg-primary-200">
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-l font-heading bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Aurora Form System
          </motion.h1>
          <p className="text-body-lg text-muted-foreground">
            The premium component library powering ResiCore.
          </p>
        </div>

        {/* Buttons Showcase */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Button System</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center p-8 bg-neutral-900 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-mint/20 to-aurora-lavender/20 blur-3xl pointer-events-none" />
            <Button variant="gradient" size="lg">Gradient Premium</Button>
            <Button variant="glass" size="lg">Glass Button</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small Button</Button>
            <Button size="default">Default Size</Button>
            <Button size="lg">Large Button</Button>
            <Button size="xl">Extra Large</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button isLoading>Processing</Button>
            <Button 
              leftIcon={<Search className="w-4 h-4" />}
              variant="outline"
            >
              Search
            </Button>
            <Button 
              rightIcon={<CheckCircle2 className="w-4 h-4" />}
              variant="success"
              onClick={handleSimulateLoading}
              isLoading={loading}
            >
              Simulate Action
            </Button>
          </div>
        </section>

        {/* Inputs Showcase */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Input System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <h3 className="text-h5">Standard Inputs</h3>
              <Input label="Full Name" placeholder="e.g. John Doe" />
              
              <Input 
                label="Email Address" 
                type="email" 
                placeholder="name@company.com" 
                leftIcon={<Mail className="w-5 h-5" />}
                clearable
              />

              <Input 
                label="Search Users" 
                placeholder="Type to search..." 
                leftIcon={<Search className="w-5 h-5" />}
                loading={true}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-h5">Validation States</h3>
              <Input 
                label="Username" 
                defaultValue="resicore_admin"
                success
                helperText="This username is available"
                rightIcon={<CheckCircle2 className="w-5 h-5 text-success" />}
              />

              <Input 
                label="Society ID" 
                defaultValue="INVALID_123"
                error="Society ID must be 6 alphanumeric characters"
                rightIcon={<XCircle className="w-5 h-5 text-destructive" />}
              />

              <Input 
                label="Biography" 
                defaultValue="Building the future of societies."
                maxLength={100}
              />
            </div>
          </div>
        </section>

        {/* Password Inputs */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Password System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-h5">Simple Password</h3>
              <PasswordInput 
                label="Enter Password" 
                leftIcon={<Lock className="w-5 h-5" />}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-h5">With Strength Meter</h3>
              <PasswordInput 
                label="Create New Password" 
                leftIcon={<Lock className="w-5 h-5" />}
                showStrengthMeter
                helperText="Must contain 8 characters, 1 uppercase, 1 number, and 1 symbol."
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

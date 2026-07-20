import { motion } from "framer-motion"
import { Users, AlertTriangle, ShieldCheck, CreditCard, Mail } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Sample chart data
const chartDataUp = [
  { value: 400 }, { value: 300 }, { value: 550 }, { value: 450 }, { value: 700 }
]
const chartDataDown = [
  { value: 700 }, { value: 600 }, { value: 650 }, { value: 400 }, { value: 300 }
]

export default function DataShowcase() {
  return (
    <div className="min-h-screen bg-background p-8 md:p-16 lg:p-24 selection:bg-primary-200">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Header */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display-l font-heading bg-gradient-to-r from-aurora-mint to-aurora-aqua bg-clip-text text-transparent"
          >
            Aurora Data System
          </motion.h1>
          <p className="text-body-lg text-muted-foreground">
            The premium data visualization library for SocioHub.
          </p>
        </div>

        {/* Indicators: Badges & Avatars */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Indicators</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card glass className="p-6">
              <h3 className="text-h5 mb-4">Badges</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="error" dot>Failed</Badge>
                <Badge variant="info">New</Badge>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-6 p-6 bg-neutral-900 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aurora-mint/20 to-aurora-lavender/20 blur-xl pointer-events-none" />
                <Badge variant="gradient" size="lg" animated>Premium Gradient</Badge>
                <Badge variant="glass" size="lg" animated>Glass Badge</Badge>
              </div>
            </Card>

            <Card glass className="p-6">
              <h3 className="text-h5 mb-4">Avatars</h3>
              <div className="flex flex-wrap gap-6 items-end">
                <Avatar size="xs" fallback="JD" />
                <Avatar size="sm" fallback="JD" status="online" />
                <Avatar size="default" fallback="A" status="away" />
                <Avatar size="lg" fallback="S" variant="primary" status="busy" />
                <Avatar 
                  size="xl" 
                  fallback="SH" 
                  variant="gradient" 
                  status="online"
                  animated
                />
              </div>
            </Card>
          </div>
        </section>

        {/* KPI Cards Showcase */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Stat Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <KpiCard
              title="Total Residents"
              value="2,405"
              trend="up"
              trendValue="12.5%"
              trendLabel="vs last month"
              icon={<Users className="h-5 w-5" />}
              theme="primary"
              chartData={chartDataUp}
              glass
            />

            <KpiCard
              title="Active Complaints"
              value="34"
              trend="up"
              trendValue="4.2%"
              trendLabel="vs last week"
              icon={<AlertTriangle className="h-5 w-5" />}
              theme="danger"
              chartData={chartDataUp}
              glass
            />

            <KpiCard
              title="Security Alerts"
              value="3"
              trend="down"
              trendValue="-15%"
              trendLabel="vs last month"
              icon={<ShieldCheck className="h-5 w-5" />}
              theme="success"
              chartData={chartDataDown}
              glass
            />

            <KpiCard
              title="Monthly Revenue"
              value="$145,200"
              trend="up"
              trendValue="8.1%"
              trendLabel="vs last month"
              icon={<CreditCard className="h-5 w-5" />}
              theme="warning"
              chartData={chartDataUp}
              glass
            />

          </div>
        </section>

        {/* Info Cards */}
        <section className="space-y-8">
          <h2 className="text-h3 font-heading border-b pb-2">Info Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card animated glass className="p-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Avatar size="lg" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" status="online" />
                  <Badge variant="success" dot>Resident</Badge>
                </div>
                <CardTitle className="mt-4">Sarah Jenkins</CardTitle>
                <CardDescription>Tower A, Flat 402</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" /> sarah.j@example.com
                </div>
              </CardContent>
            </Card>

            <Card animated glass className="p-1">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="p-3 rounded-full bg-danger/10 text-danger-600">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <Badge variant="error">High Priority</Badge>
                </div>
                <CardTitle className="mt-4">Plumbing Leak</CardTitle>
                <CardDescription>Reported 2 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Water is leaking from the ceiling in the master bedroom. Needs immediate attention.
                </p>
              </CardContent>
            </Card>

          </div>
        </section>

      </div>
    </div>
  )
}

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { AuroraAreaChart } from "@/components/ui/analytics/area-chart"
import { AuroraBarChart } from "@/components/ui/analytics/bar-chart"

const revenueData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
  { month: "Jul", revenue: 3490, expenses: 4300 },
]

const visitorData = [
  { day: "Mon", visitors: 40, deliveries: 24 },
  { day: "Tue", visitors: 30, deliveries: 13 },
  { day: "Wed", visitors: 20, deliveries: 98 },
  { day: "Thu", visitors: 27, deliveries: 39 },
  { day: "Fri", visitors: 18, deliveries: 48 },
  { day: "Sat", visitors: 23, deliveries: 38 },
  { day: "Sun", visitors: 34, deliveries: 43 },
]

export default function AnalyticsShowcase() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-display-m font-heading bg-gradient-to-r from-aurora-mint to-aurora-aqua bg-clip-text text-transparent"
        >
          Analytics & Visualizations
        </motion.h1>
        <p className="text-muted-foreground text-lg">
          Enterprise-grade charts powered by Recharts and styled for Aurora Glass OS.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Area Chart */}
        <Card glass animated>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Monthly revenue vs expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <AuroraAreaChart 
              data={revenueData}
              index="month"
              valueFormatter={(val) => `$${val}`}
              categories={[
                { key: "revenue", name: "Revenue", color: "var(--primary)" },
                { key: "expenses", name: "Expenses", color: "var(--destructive)" }
              ]}
            />
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card glass animated>
          <CardHeader>
            <CardTitle>Visitor Traffic</CardTitle>
            <CardDescription>Daily visitors and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <AuroraBarChart 
              data={visitorData}
              index="day"
              categories={[
                { key: "visitors", name: "Visitors", color: "var(--info)" },
                { key: "deliveries", name: "Deliveries", color: "var(--warning)" }
              ]}
            />
          </CardContent>
        </Card>

      </div>

    </div>
  )
}

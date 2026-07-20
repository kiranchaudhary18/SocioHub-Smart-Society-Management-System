import * as React from "react"

import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

export interface KpiCardProps {
  title: string
  value: string | number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  trendLabel?: string
  icon?: React.ReactNode
  chartData?: Array<{ value: number }>
  theme?: "primary" | "success" | "warning" | "danger" | "info" | "neutral"
  glass?: boolean
  className?: string
}

const themeColors = {
  primary: "hsl(var(--primary-500))",
  success: "hsl(var(--success-500))",
  warning: "hsl(var(--warning-500))",
  danger: "hsl(var(--danger-500))",
  info: "hsl(var(--info-500))",
  neutral: "hsl(var(--neutral-500))",
}

export function KpiCard({
  title,
  value,
  trend,
  trendValue,
  trendLabel,
  icon,
  chartData,
  theme = "primary",
  glass = false,
  className,
}: KpiCardProps) {
  const isPositive = trend === "up"
  const isNegative = trend === "down"
  const color = themeColors[theme]

  return (
    <Card 
      animated 
      glass={glass}
      className={cn(
        "relative overflow-hidden group",
        glass && "hover:shadow-glow",
        className
      )}
    >
      {/* Top right gradient glow effect on hover */}
      <div 
        className={cn(
          "absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none",
          theme === "primary" && "bg-primary-500",
          theme === "success" && "bg-success-500",
          theme === "warning" && "bg-warning-500",
          theme === "danger" && "bg-danger-500",
          theme === "info" && "bg-info-500",
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-xl bg-background shadow-sm border",
            theme === "primary" && "text-primary-600",
            theme === "success" && "text-success-600",
            theme === "warning" && "text-warning-600",
            theme === "danger" && "text-danger-600",
            theme === "info" && "text-info-600",
          )}>
            {icon}
          </div>
        )}
        {!icon && (
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-h3 font-heading font-bold tracking-tight">
            {value}
          </div>
          
          <div className="flex items-center gap-2">
            {trend && trendValue && (
              <span className={cn(
                "flex items-center text-sm font-medium",
                isPositive && "text-success-600",
                isNegative && "text-danger-600",
                !isPositive && !isNegative && "text-muted-foreground"
              )}>
                {isPositive && <ArrowUpRight className="mr-1 h-4 w-4" />}
                {isNegative && <ArrowDownRight className="mr-1 h-4 w-4" />}
                {trendValue}
              </span>
            )}
            {trendLabel && (
              <span className="text-sm text-muted-foreground">
                {trendLabel}
              </span>
            )}
          </div>
        </div>

        {/* Mini Sparkline Chart */}
        {chartData && chartData.length > 0 && (
          <div className="mt-4 h-[60px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`color-${theme}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${theme})`}
                  isAnimationActive={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

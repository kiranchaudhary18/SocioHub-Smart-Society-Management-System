
import { 
  Bar, 
  BarChart as RechartsBarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from "recharts"
import { ChartTooltip } from "./chart-tooltip"

export interface AuroraBarChartProps {
  data: any[]
  index: string
  categories: {
    key: string
    name: string
    color: string
  }[]
  height?: number
  valueFormatter?: (value: number) => string
  stacked?: boolean
}

export function AuroraBarChart({ 
  data, 
  index, 
  categories, 
  height = 350,
  valueFormatter,
  stacked = false
}: AuroraBarChartProps) {
  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
          
          <XAxis 
            dataKey={index} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
            tickFormatter={valueFormatter}
          />
          
          <Tooltip 
            content={<ChartTooltip valueFormatter={valueFormatter} />} 
            cursor={{ fill: 'var(--muted)', opacity: 0.2 }} 
          />

          {categories.map((category) => (
            <Bar
              key={category.key}
              dataKey={category.key}
              name={category.name}
              fill={category.color}
              radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
              stackId={stacked ? "a" : undefined}
              animationDuration={1500}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}


import { 
  Area, 
  AreaChart as RechartsAreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from "recharts"
import { ChartTooltip } from "./chart-tooltip"

export interface AuroraAreaChartProps {
  data: any[]
  index: string
  categories: {
    key: string
    name: string
    color: string
  }[]
  height?: number
  valueFormatter?: (value: number) => string
}

export function AuroraAreaChart({ 
  data, 
  index, 
  categories, 
  height = 350,
  valueFormatter 
}: AuroraAreaChartProps) {
  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          
          <defs>
            {categories.map((category) => (
              <linearGradient 
                key={`color-${category.key}`} 
                id={`color-${category.key}`} 
                x1="0" y1="0" x2="0" y2="1"
              >
                <stop offset="5%" stopColor={category.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={category.color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

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
          
          <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }} />

          {categories.map((category) => (
            <Area
              key={category.key}
              type="monotone"
              dataKey={category.key}
              name={category.name}
              stroke={category.color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color-${category.key})`}
              activeDot={{ r: 6, strokeWidth: 0, fill: category.color }}
              animationDuration={1500}
              animationEasing="ease-in-out"
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

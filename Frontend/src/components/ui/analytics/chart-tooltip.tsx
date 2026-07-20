

export interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  valueFormatter?: (value: number) => string
}

export function ChartTooltip({ active, payload, label, valueFormatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  return (
    <div className="glass-strong rounded-xl border border-border/50 p-3 shadow-glow min-w-[150px] animate-in fade-in zoom-in-95 duration-200">
      {label && (
        <div className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: entry.color || entry.payload.fill }} 
              />
              <span className="text-sm font-medium text-foreground">
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {valueFormatter ? valueFormatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

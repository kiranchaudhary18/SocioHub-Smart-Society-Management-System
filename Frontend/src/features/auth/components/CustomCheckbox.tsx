import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface CustomCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  disabled?: boolean
}

export function CustomCheckbox({ checked, onChange, label, disabled }: CustomCheckboxProps) {
  return (
    <div 
      className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer group'}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
        <motion.div
          className={`absolute inset-0 rounded-[6px] border transition-colors duration-300 ${
            checked 
              ? 'border-transparent bg-gradient-to-br from-[#72F1D1] to-[#3DD9FF]' 
              : 'border-slate-300 bg-white group-hover:border-[#72F1D1]'
          }`}
          layout
        />
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative z-10 text-white"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </motion.div>
        
        {checked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full bg-[#72F1D1] blur-sm pointer-events-none"
          />
        )}
      </div>
      <span className="text-sm font-medium text-slate-500 group-hover:text-slate-800 transition-colors select-none">
        {label}
      </span>
    </div>
  )
}

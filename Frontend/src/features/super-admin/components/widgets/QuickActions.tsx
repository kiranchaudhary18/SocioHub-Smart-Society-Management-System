import { motion } from "framer-motion";
import { Building2, UserPlus, Megaphone, FileBarChart2 } from "lucide-react";

const actions = [
  {
    title: "Approve Society",
    description: "Review 12 pending requests",
    icon: Building2,
    color: "from-[#72F1D1] to-[#3DD9FF]",
    iconColor: "text-[#3DD9FF]",
  },
  {
    title: "Manage Users",
    description: "45,290 active users",
    icon: UserPlus,
    color: "from-[#8F7CFF] to-[#FF5DA2]",
    iconColor: "text-[#8F7CFF]",
  },
  {
    title: "Send Announcement",
    description: "Broadcast to all societies",
    icon: Megaphone,
    color: "from-[#FFD166] to-[#FF7A7A]",
    iconColor: "text-[#FF7A7A]",
  },
  {
    title: "View Reports",
    description: "Monthly revenue & growth",
    icon: FileBarChart2,
    color: "from-[#3DD9FF] to-[#8F7CFF]",
    iconColor: "text-[#3DD9FF]",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => (
        <motion.button
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="group relative text-left bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300 overflow-hidden"
        >
          {/* Subtle hover gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          <div className="flex items-start gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
              <action.icon className={`w-6 h-6 ${action.iconColor}`} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-0.5">{action.title}</h3>
              <p className="text-xs font-medium text-slate-500">{action.description}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}

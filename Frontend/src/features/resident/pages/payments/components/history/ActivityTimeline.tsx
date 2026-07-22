import { CheckCircle2, FileText, AlertCircle, Clock } from "lucide-react";

export function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      title: "Invoice Paid",
      desc: "Maintenance Bill for June cleared",
      time: "2 days ago",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      id: 2,
      title: "Receipt Downloaded",
      desc: "Receipt #RCT-99120 downloaded",
      time: "2 days ago",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 3,
      title: "Upcoming Due",
      desc: "July Maintenance Due in 14 days",
      time: "4 days ago",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      border: "border-amber-100"
    },
    {
      id: 4,
      title: "Payment Failed",
      desc: "Gas bill payment declined by bank",
      time: "1 week ago",
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100"
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-6">
      <h3 className="text-lg font-heading font-black text-slate-800">Recent Activity</h3>
      
      <div className="flex flex-col gap-6 relative">
        <div className="absolute top-2 bottom-2 left-6 w-px bg-slate-100" />
        
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 relative z-10 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${activity.bg} ${activity.color} ${activity.border} group-hover:scale-110 transition-transform`}>
              <activity.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-slate-800">{activity.title}</span>
              <span className="text-xs font-medium text-slate-500 mt-0.5">{activity.desc}</span>
              <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

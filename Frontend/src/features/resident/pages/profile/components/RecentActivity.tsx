import { Activity, LogIn, KeyRound, UserCircle, QrCode, CreditCard, MessageSquare, Download } from "lucide-react";
import type { AccountActivity } from "../../../services/profile.service";

interface Props {
  activities: AccountActivity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "LOGIN": return <LogIn className="w-5 h-5 text-blue-500" />;
    case "PASSWORD": return <KeyRound className="w-5 h-5 text-amber-500" />;
    case "PROFILE": return <UserCircle className="w-5 h-5 text-indigo-500" />;
    case "VISITOR": return <QrCode className="w-5 h-5 text-purple-500" />;
    case "PAYMENT": return <CreditCard className="w-5 h-5 text-emerald-500" />;
    case "COMPLAINT": return <MessageSquare className="w-5 h-5 text-rose-500" />;
    case "DOWNLOAD": return <Download className="w-5 h-5 text-cyan-500" />;
    default: return <Activity className="w-5 h-5 text-slate-500" />;
  }
};

export function RecentActivity({ activities }: Props) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center gap-3 bg-white/40">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-black text-slate-800">Recent Account Activity</h2>
          <p className="text-sm font-medium text-slate-500 mt-0.5">Timeline of recent events on your account.</p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activities.length === 0 ? (
          <div className="text-center py-8">
             <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-300" />
             </div>
             <h3 className="text-sm font-bold text-slate-800">No Activity Found</h3>
             <p className="text-xs font-medium text-slate-500 mt-1">Your recent account activity will appear here.</p>
          </div>
        ) : (
          <div className="relative pl-6 border-l-2 border-slate-100 flex flex-col gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="relative">
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-sm">
                  {getActivityIcon(activity.type)}
                </div>
                
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{activity.title}</span>
                    <span className="text-sm font-medium text-slate-500 mt-0.5">{activity.description}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 shrink-0 bg-slate-50 px-3 py-1 rounded-lg">
                    {new Date(activity.date).toLocaleDateString()} at {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

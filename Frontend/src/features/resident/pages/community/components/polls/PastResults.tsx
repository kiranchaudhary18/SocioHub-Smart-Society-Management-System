import { CheckCircle2, BarChart3 } from "lucide-react";
import type { Poll } from "../../../../services/community.service";

interface Props {
  polls: Poll[];
}

export function PastResults({ polls }: Props) {
  const completed = polls.filter(p => p.status === "COMPLETED" || p.status === "CLOSED");

  if (completed.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-heading font-black text-slate-800">Past Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completed.map((poll: Poll) => {
          const winningOption = poll.options.find((o: any) => o.id === poll.winningOptionId) || poll.options.reduce((prev: any, current: any) => (prev.votes > current.votes) ? prev : current);

          return (
            <div key={poll.id} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Closed {new Date(poll.endDate).toLocaleDateString()}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                  {poll.status}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-800 leading-snug">{poll.title}</h4>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex flex-col gap-1 mt-2">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Winning Option
                </span>
                <span className="text-sm font-bold text-slate-800">{winningOption.text}</span>
              </div>

              <div className="flex items-center gap-2 mt-auto text-xs font-bold text-slate-500 pt-2 border-t border-slate-50">
                <BarChart3 className="w-4 h-4" />
                {poll.totalVotes} Residents Participated
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

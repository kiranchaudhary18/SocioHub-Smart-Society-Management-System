import { BarChart3, CheckCircle2 } from "lucide-react";
import type { Poll } from "../../../../services/community.service";

interface Props {
  polls: Poll[];
  onVote: (pollId: string, optionId: string) => void;
}

export function ActivePolls({ polls, onVote }: Props) {
  const active = polls.filter(p => p.status === "ACTIVE");

  if (active.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Active Polls</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no decisions pending your vote right now.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-heading font-black text-slate-800">Active Polls</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {active.map(poll => (
          <div key={poll.id} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col relative overflow-hidden">
            
            {poll.isVoted && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Voted</span>
              </div>
            )}

            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Ends {new Date(poll.endDate).toLocaleDateString()}</span>
            <h4 className="text-lg font-heading font-black text-slate-800 mb-2 pr-24">{poll.title}</h4>
            <p className="text-sm font-medium text-slate-500 mb-6">{poll.description}</p>

            <div className="flex flex-col gap-3 mt-auto">
              {poll.options.map((option: any) => {
                const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                const isSelected = poll.userSelectionId === option.id;

                if (poll.isVoted) {
                  return (
                    <div key={option.id} className="relative w-full overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-3 z-0">
                      <div 
                        className={`absolute inset-0 z-0 opacity-20 ${isSelected ? 'bg-emerald-400' : 'bg-slate-300'}`}
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative z-10 flex justify-between items-center text-sm font-bold">
                        <span className="text-slate-700 flex items-center gap-2">
                          {option.text}
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </span>
                        <span className="text-slate-500">{percentage}%</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <button 
                    key={option.id}
                    onClick={() => onVote(poll.id, option.id)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 bg-white hover:border-[#8F7CFF] hover:bg-[#8F7CFF]/5 transition-all text-sm font-bold text-slate-700 shadow-sm"
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-400">
              <BarChart3 className="w-4 h-4" />
              {poll.totalVotes} Total Votes
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

import { ClipboardList, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import type { Survey } from "../../../../services/community.service";

interface Props {
  surveys: Survey[];
}

export function SurveyCards({ surveys }: Props) {
  if (surveys.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-heading font-black text-slate-800">Surveys & Feedback</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {surveys.map(survey => (
          <div key={survey.id} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col group hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden">
            
            {survey.isCompleted && (
              <div className="absolute top-6 right-6 flex items-center gap-1.5 text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-wider">Completed</span>
              </div>
            )}

            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4 shrink-0">
              <ClipboardList className="w-6 h-6" />
            </div>

            <h4 className="text-lg font-heading font-black text-slate-800 mb-2 group-hover:text-blue-500 transition-colors pr-24">{survey.title}</h4>
            <p className="text-sm font-medium text-slate-500 mb-6">{survey.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500 mt-auto">
              <div className="flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4" />
                {survey.questionCount} Questions
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                ~{survey.estimatedTime}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ends {new Date(survey.closingDate).toLocaleDateString()}</span>
              
              {!survey.isCompleted ? (
                <span className="text-sm font-black text-blue-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Start Survey <ArrowRight className="w-4 h-4" />
                </span>
              ) : (
                <span className="text-sm font-bold text-slate-400">
                  Thank you for participating
                </span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

import { AlertCircle, Paperclip, CheckCircle2, Circle } from "lucide-react";
import type { Notice } from "../../../../services/community.service";

interface Props {
  notices: Notice[];
  onView: (n: Notice) => void;
}

export function NoticeFeed({ notices, onView }: Props) {
  if (notices.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">You're all caught up!</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">There are no notices matching your current filters.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notices.map(notice => (
        <div 
          key={notice.id}
          onClick={() => onView(notice)}
          className={`
            bg-white/60 backdrop-blur-xl border rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] 
            cursor-pointer group hover:-translate-y-1 transition-all flex flex-col md:flex-row gap-6 relative
            ${!notice.isRead ? 'border-[#8F7CFF]/50 shadow-md' : 'border-white/80'}
          `}
        >
          {/* Unread Indicator */}
          {!notice.isRead && (
            <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-[#8F7CFF]/10 text-[#8F7CFF] rounded-lg text-[10px] font-black uppercase tracking-wider">
              <Circle className="w-2 h-2 fill-[#8F7CFF]" /> New
            </div>
          )}
          
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200/50">
            {notice.priority === 'HIGH' ? (
              <AlertCircle className="w-6 h-6 text-amber-500" />
            ) : (
              <span className="text-lg font-black text-slate-400 font-heading">{notice.publisher.charAt(0)}</span>
            )}
          </div>
          
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2 pr-20">
              <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600">
                {notice.category}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {new Date(notice.publishedDate).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-lg font-heading font-black text-slate-800 mb-2 group-hover:text-[#8F7CFF] transition-colors pr-20">
              {notice.title}
            </h3>
            
            <p className="text-sm font-medium text-slate-500 line-clamp-2 leading-relaxed mb-4">
              {notice.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-auto">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                <span className="text-slate-400">By</span> {notice.publisher}
              </div>
              
              {notice.attachments.length > 0 && (
                <>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500">
                    <Paperclip className="w-3.5 h-3.5" />
                    {notice.attachments.length} file{notice.attachments.length > 1 ? 's' : ''} attached
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

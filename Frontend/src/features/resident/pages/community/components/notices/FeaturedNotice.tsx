import { AlertCircle, Calendar, Paperclip, ChevronRight } from "lucide-react";
import type { Notice } from "../../../../services/community.service";

interface Props {
  notice: Notice;
  onView: (n: Notice) => void;
}

export function FeaturedNotice({ notice, onView }: Props) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden group flex flex-col md:flex-row gap-8 items-center">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="flex-1 flex flex-col relative z-10 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-500/30">
            <AlertCircle className="w-3 h-3" /> Featured {notice.priority === 'HIGH' && '• High Priority'}
          </div>
          <span className="px-3 py-1 bg-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-300">
            {notice.category}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-heading font-black text-white mb-3 tracking-tight">
          {notice.title}
        </h2>
        
        <p className="text-sm font-medium text-slate-300 line-clamp-2 mb-6 max-w-2xl leading-relaxed">
          {notice.description}
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-auto text-xs font-bold text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white">
              {notice.publisher.charAt(0)}
            </div>
            <span>{notice.publisher}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{new Date(notice.publishedDate).toLocaleDateString()}</span>
          </div>
          {notice.attachments.length > 0 && (
            <div className="flex items-center gap-1.5 text-amber-200">
              <Paperclip className="w-4 h-4" />
              <span>{notice.attachments.length} Attachments</span>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 relative z-10 w-full md:w-auto">
        <button 
          onClick={() => onView(notice)}
          className="w-full md:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg group-hover:scale-105 duration-300"
        >
          Read Full Notice <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Download, Bookmark, Paperclip, AlertCircle } from "lucide-react";
import type { Notice } from "../../../../services/community.service";
import { communityService } from "../../../../services/community.service";

interface Props {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
  onNoticeRead: () => void;
}

export function NoticeDetailsDrawer({ notice, isOpen, onClose, onNoticeRead }: Props) {
  useEffect(() => {
    if (isOpen && notice && !notice.isRead) {
      communityService.markNoticeRead(notice.id).then(() => {
        onNoticeRead();
      });
    }
  }, [isOpen, notice, onNoticeRead]);

  if (!notice) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-y-auto"
          >
            {/* Header Toolbar */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    {notice.id}
                  </span>
                  <span className="text-sm font-bold text-slate-800">Notice Details</span>
                </div>
              </div>
              
              <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/10 transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 flex flex-col gap-8">
              
              {/* Notice Header info */}
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  {notice.priority === 'HIGH' && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-wider border border-amber-100">
                      <AlertCircle className="w-3 h-3" /> High Priority
                    </div>
                  )}
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {notice.category}
                  </span>
                </div>

                <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight leading-tight">
                  {notice.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm font-bold mt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                      {notice.publisher.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">Published By</span>
                      <span className="text-slate-700">{notice.publisher}</span>
                    </div>
                  </div>
                  
                  <div className="h-8 w-px bg-slate-200" />
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">Date</span>
                      <span className="text-slate-700">{new Date(notice.publishedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice Body */}
              <div className="prose prose-slate max-w-none">
                {notice.description.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className="text-slate-600 leading-relaxed font-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Attachments */}
              {notice.attachments.length > 0 && (
                <div className="mt-4 flex flex-col gap-4">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    Attachments ({notice.attachments.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notice.attachments.map((file: any, idx: number) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:border-[#8F7CFF] hover:shadow-md transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#8F7CFF] group-hover:bg-[#8F7CFF]/10 transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-bold text-slate-800 truncate">{file.name}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{file.size}</span>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/10 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

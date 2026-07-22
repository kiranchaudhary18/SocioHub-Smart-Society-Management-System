import { motion, AnimatePresence } from "framer-motion";
import { X, FileIcon, FileText, Image, Download, Bookmark, Share2, Tag, Calendar, User, Hash, Clock, Link as LinkIcon, BookmarkCheck } from "lucide-react";
import type { SocietyDocument } from "../../../services/documents.service";

interface Props {
  document: SocietyDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (id: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "PDF": return <FileText className="w-16 h-16 text-red-500" />;
    case "DOCX": return <FileText className="w-16 h-16 text-blue-500" />;
    case "XLSX": return <FileIcon className="w-16 h-16 text-emerald-500" />;
    case "PNG": return <Image className="w-16 h-16 text-purple-500" />;
    default: return <FileIcon className="w-16 h-16 text-slate-500" />;
  }
};

export function DocumentPreviewDrawer({ document, isOpen, onClose, onBookmark }: Props) {
  if (!document) return null;

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
            className="fixed top-0 right-0 h-full w-full max-w-xl bg-slate-50 shadow-2xl z-50 flex flex-col border-l border-slate-200 overflow-y-auto"
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
                <span className="text-sm font-bold text-slate-800">Document Details</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:text-blue-500 hover:bg-blue-50 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onBookmark(document.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${document.isBookmarked ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-500'}`}
                >
                  {document.isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2 ml-2">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-8">
              
              {/* Document Header info */}
              <div className="flex flex-col items-center text-center gap-4 border-b border-slate-200 pb-8">
                <div className="w-32 h-32 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-2">
                   {getFileIcon(document.fileType)}
                </div>

                <div className="flex flex-col gap-2 items-center">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {document.category}
                  </span>
                  <h1 className="text-2xl font-heading font-black text-slate-800 tracking-tight leading-tight">
                    {document.name}
                  </h1>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold mt-2 text-slate-500">
                  <span>{document.fileSize}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{document.fileType} Format</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <span>{document.downloads} Downloads</span>
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-bold text-slate-800">Description</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  {document.description}
                </p>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <User className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Uploaded By</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{document.uploadedBy}</span>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <Hash className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Version</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{document.version}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upload Date</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{new Date(document.uploadedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Updated</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5">{new Date(document.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {document.tags.length > 0 && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 cursor-pointer transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Documents (Mocked for UI) */}
              <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-400" /> Related Documents
                </h3>
                <div className="flex flex-col gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:border-[#8F7CFF] transition-colors cursor-pointer group shadow-sm">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#8F7CFF]" />
                        <span className="text-sm font-bold text-slate-700">Related Document {i}.pdf</span>
                      </div>
                      <Download className="w-4 h-4 text-slate-300 group-hover:text-[#8F7CFF]" />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

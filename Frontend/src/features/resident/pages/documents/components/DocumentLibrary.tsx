import { FileIcon, FileText, Image, Download, Bookmark, Eye, BookmarkCheck, SearchX } from "lucide-react";
import type { SocietyDocument } from "../../../services/documents.service";

interface Props {
  documents: SocietyDocument[];
  onPreview: (doc: SocietyDocument) => void;
  onBookmark: (id: string) => void;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "PDF": return <FileText className="w-8 h-8 text-red-500" />;
    case "DOCX": return <FileText className="w-8 h-8 text-blue-500" />;
    case "XLSX": return <FileIcon className="w-8 h-8 text-emerald-500" />;
    case "PNG": return <Image className="w-8 h-8 text-purple-500" />;
    default: return <FileIcon className="w-8 h-8 text-slate-500" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "NEW": return <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[9px] font-black uppercase tracking-wider">New</span>;
    case "UPDATED": return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 rounded text-[9px] font-black uppercase tracking-wider">Updated</span>;
    case "IMPORTANT": return <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase tracking-wider">Important</span>;
    case "FEATURED": return <span className="px-2 py-0.5 bg-amber-100 text-amber-600 rounded text-[9px] font-black uppercase tracking-wider">Featured</span>;
    case "ARCHIVED": return <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[9px] font-black uppercase tracking-wider">Archived</span>;
    default: return null;
  }
};

export function DocumentLibrary({ documents, onPreview, onBookmark }: Props) {
  if (documents.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-24 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 flex items-center justify-center mb-6">
          <SearchX className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Documents Available</h3>
        <p className="text-sm font-medium text-slate-500 max-w-md">Documents published by your society matching your criteria will appear here.</p>
        <button onClick={() => window.location.reload()} className="mt-8 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all hover:bg-slate-800">
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-black text-slate-800">Library</h3>
        <span className="text-sm font-bold text-slate-400">{documents.length} files found</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col group hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{doc.category}</span>
                    {getStatusBadge(doc.status)}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-[#8F7CFF] transition-colors">{doc.name}</h4>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6 min-h-[40px]">
              {doc.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 mb-6">
              <span>{doc.fileSize}</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{new Date(doc.uploadedDate).toLocaleDateString()}</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{doc.downloads} Downloads</span>
            </div>

            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100">
              <button 
                onClick={() => onPreview(doc)}
                className="flex-1 py-2.5 bg-slate-50 hover:bg-[#8F7CFF]/10 hover:text-[#8F7CFF] text-slate-600 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> Preview
              </button>
              
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onBookmark(doc.id); }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${doc.isBookmarked ? 'bg-amber-50 text-amber-500 border border-amber-100' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}
                >
                  {doc.isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

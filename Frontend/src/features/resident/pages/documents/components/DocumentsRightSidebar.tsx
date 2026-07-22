import { FileText, TrendingUp, AlertTriangle, ExternalLink, Clock } from "lucide-react";
import type { SocietyDocument } from "../../../services/documents.service";

interface Props {
  documents: SocietyDocument[];
  onPreview: (doc: SocietyDocument) => void;
}

export function DocumentsRightSidebar({ documents, onPreview }: Props) {
  const recentDocs = [...documents].sort((a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime()).slice(0, 3);
  const popularDocs = [...documents].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
  const emergencyDocs = documents.filter(d => d.tags.includes('emergency') || d.category === 'Emergency Contacts').slice(0, 2);

  return (
    <div className="flex flex-col gap-6">
      
      {/* Emergency Documents */}
      {emergencyDocs.length > 0 && (
        <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-[32px] p-6 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-2 relative z-10 mb-4">
            <AlertTriangle className="w-5 h-5 text-white/90" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Emergency Docs</h4>
          </div>
          
          <div className="relative z-10 flex flex-col gap-3">
            {emergencyDocs.map(doc => (
              <button 
                key={doc.id}
                onClick={() => onPreview(doc)}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-xl transition-colors text-left"
              >
                <FileText className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm font-bold text-white line-clamp-1">{doc.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popular Downloads */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <TrendingUp className="w-4 h-4 text-[#8F7CFF]" />
          <h4 className="text-sm font-bold text-slate-800">Popular Downloads</h4>
        </div>
        <div className="flex flex-col gap-2">
          {popularDocs.map(doc => (
            <button 
              key={doc.id}
              onClick={() => onPreview(doc)}
              className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#8F7CFF] group-hover:bg-[#8F7CFF]/10 shrink-0 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-700 line-clamp-1">{doc.name}</span>
                <span className="text-[10px] font-bold text-slate-400">{doc.downloads} downloads</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Clock className="w-4 h-4 text-[#3DD9FF]" />
          <h4 className="text-sm font-bold text-slate-800">Recently Added</h4>
        </div>
        <div className="flex flex-col gap-2">
          {recentDocs.map(doc => (
            <button 
              key={doc.id}
              onClick={() => onPreview(doc)}
              className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#3DD9FF] group-hover:bg-[#3DD9FF]/10 shrink-0 transition-colors">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-bold text-slate-700 line-clamp-1">{doc.name}</span>
                <span className="text-[10px] font-bold text-slate-400">{new Date(doc.uploadedDate).toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ExternalLink className="w-4 h-4 text-slate-400" />
          <h4 className="text-sm font-bold text-slate-800">Quick Links</h4>
        </div>
        <ul className="flex flex-col gap-3">
          <li className="flex justify-between items-center group cursor-pointer">
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#8F7CFF] transition-colors">Society Support Portal</span>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#8F7CFF]" />
          </li>
          <li className="flex justify-between items-center group cursor-pointer">
            <span className="text-sm font-bold text-slate-600 group-hover:text-[#8F7CFF] transition-colors">Maintenance Payment Guide</span>
            <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-[#8F7CFF]" />
          </li>
        </ul>
      </div>

    </div>
  );
}

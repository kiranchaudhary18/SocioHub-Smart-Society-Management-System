import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { noticeService } from "../../services/notice.service";
import type { Notice } from "../../services/notice.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Edit3, Pin, Trash2, CalendarClock, Users, 
  Eye, FileText, Download, MessageSquare, History, Activity, AlertTriangle
} from "lucide-react";

export default function NoticeDetailsPage() {
  const { noticeId } = useParams<{ noticeId: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (noticeId) {
      noticeService.getNotice(noticeId).then(data => {
        if (data) setNotice(data);
        setIsLoading(false);
      });
    }
  }, [noticeId]);

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-6 animate-pulse">
        <div className="h-48 bg-slate-100 rounded-[32px] w-full" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="h-96 bg-slate-100 rounded-[32px] xl:col-span-2" />
          <div className="h-96 bg-slate-100 rounded-[32px]" />
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Notice Not Found</h2>
        <Link to="/admin/notices" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Notice Board
        </Link>
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PUBLISHED": return "success";
      case "DRAFT": return "neutral";
      case "SCHEDULED": return "warning";
      case "EXPIRED": return "danger";
      default: return "neutral";
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/notices" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Notice Board
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<Edit3 className="w-4 h-4" />}>Edit</ActionButton>
          <ActionButton variant="outline" leftIcon={<Pin className="w-4 h-4" />}>{notice.isPinned ? 'Unpin' : 'Pin'}</ActionButton>
          <ActionButton variant="outline" leftIcon={<Trash2 className="w-4 h-4 text-red-500" />} className="text-red-500 border-red-200 hover:bg-red-50">Delete</ActionButton>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Content */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {notice.isPinned && (
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#8F7CFF] text-white px-4 py-2 rounded-b-2xl shadow-lg flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                <Pin className="w-3.5 h-3.5 fill-white" /> Pinned
              </div>
            )}
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge variant={getStatusVariant(notice.status) as any}>{notice.status}</StatusBadge>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-widest">{notice.category}</span>
                {notice.priority === 'HIGH' && (
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#FF7A7A] bg-[#FF7A7A]/10 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                    <AlertTriangle className="w-3.5 h-3.5" /> High Priority
                  </span>
                )}
              </div>
              <span className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <CalendarClock className="w-4 h-4" /> {notice.publishDate}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight mb-6">
              {notice.title}
            </h1>

            <div className="prose prose-slate max-w-none prose-p:font-medium prose-p:text-slate-600 prose-headings:font-bold prose-a:text-[#8F7CFF]">
              <p className="whitespace-pre-wrap">{notice.content}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={`https://ui-avatars.com/api/?name=${notice.author}&background=f8fafc&color=94a3b8`} alt={notice.author} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Published By</span>
                  <span className="text-sm font-bold text-slate-700">{notice.author}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          {notice.attachments && notice.attachments.length > 0 && (
            <SectionCard>
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8F7CFF]" /> Attachments ({notice.attachments.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notice.attachments.map((file, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-[#8F7CFF]/30 transition-all group cursor-pointer shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#8F7CFF] transition-colors" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-bold text-sm text-slate-700 truncate group-hover:text-[#8F7CFF] transition-colors">{file.name}</span>
                      <span className="text-xs font-medium text-slate-400">{file.size} • {file.type.toUpperCase()}</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-[#8F7CFF] group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {/* Comments Section */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#3DD9FF]" /> Comments (2)
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <img src="https://ui-avatars.com/api/?name=R&background=f1f5f9&color=64748b" className="w-10 h-10 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5 flex-1 bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-700">Rahul Sharma (A-204)</span>
                    <span className="text-xs font-bold text-slate-400">2 hours ago</span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Will there be physical copies of the financial report available during the AGM?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <img src={`https://ui-avatars.com/api/?name=${notice.author}&background=e2e8f0&color=64748b`} className="w-10 h-10 rounded-full shrink-0 ring-2 ring-white" />
                <div className="flex flex-col gap-1.5 flex-1 bg-[#8F7CFF]/5 p-4 rounded-2xl rounded-tl-none border border-[#8F7CFF]/20">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#8F7CFF] flex items-center gap-2">
                      {notice.author} <StatusBadge variant="neutral" className="!text-[9px] !px-1.5 !py-0.5">AUTHOR</StatusBadge>
                    </span>
                    <span className="text-xs font-bold text-[#8F7CFF]/60">1 hour ago</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">Yes Rahul, we will have printed copies available at the reception desk.</p>
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-4 mt-2">
                <div className="w-10 h-10 rounded-full bg-[#72F1D1]/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-700">SA</span>
                </div>
                <div className="flex-1 relative">
                  <textarea 
                    placeholder="Write a comment..." 
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-24 outline-none resize-none focus:border-[#8F7CFF] transition-colors text-sm font-medium"
                    rows={2}
                  />
                  <button className="absolute bottom-3 right-3 bg-[#8F7CFF] text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-[#7b68ee] transition-colors">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>

        {/* Right Column - Stats & Settings */}
        <div className="flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#FFD166]" /> Reach & Engagement
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <Eye className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Views</span>
                    <span className="font-bold text-slate-700">{notice.viewCount}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-[#72F1D1]">{Math.round((notice.viewCount / notice.totalResidents) * 100)}%</span>
                  <span className="block text-[10px] font-bold text-slate-400">of audience</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                    <Users className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Target Audience</span>
                    <span className="font-bold text-slate-700">{notice.audience}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-700">{notice.totalResidents}</span>
                  <span className="block text-[10px] font-bold text-slate-400">residents</span>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 p-3 rounded-xl bg-white hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-slate-200 shadow-sm">
              <Download className="w-4 h-4" /> Download Read Receipts
            </button>
          </SectionCard>

          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" /> Activity Timeline
            </h3>
            
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative mb-6">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#72F1D1] rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2">
                  <span className="font-bold text-slate-700 text-sm">Notice Published</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">{notice.publishDate}</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1" />
                <div className="flex flex-col ml-2">
                  <span className="font-bold text-slate-700 text-sm">Draft Created</span>
                  <span className="text-xs font-bold text-slate-400 mt-1">19 Jul 2026, 14:30 PM</span>
                </div>
              </div>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { complaintService } from "../../services/complaint.service";
import type { Complaint } from "../../services/complaint.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { SectionCard } from "../../components/ui/SectionCard";
import { 
  ArrowLeft, Clock, MapPin, Wrench, Droplets, Zap, Shield, 
  Sparkles, MessageSquare, Paperclip, CheckCircle2, UserPlus,
  Send, History
} from "lucide-react";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "PLUMBING": return <Droplets className="w-5 h-5 text-[#3DD9FF]" />;
    case "ELECTRICAL": return <Zap className="w-5 h-5 text-[#FFD166]" />;
    case "CARPENTRY": return <Wrench className="w-5 h-5 text-[#8F7CFF]" />;
    case "CLEANING": return <Sparkles className="w-5 h-5 text-[#72F1D1]" />;
    case "SECURITY": return <Shield className="w-5 h-5 text-[#FF7A7A]" />;
    default: return <Wrench className="w-5 h-5 text-slate-400" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "URGENT": return "text-[#FF7A7A] bg-[#FF7A7A]/10 border-[#FF7A7A]/20";
    case "HIGH": return "text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/20";
    case "MEDIUM": return "text-[#3DD9FF] bg-[#3DD9FF]/10 border-[#3DD9FF]/20";
    case "LOW": return "text-slate-500 bg-slate-100 border-slate-200";
    default: return "text-slate-500 bg-slate-100 border-slate-200";
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "NEW": return "danger";
    case "ASSIGNED": return "warning";
    case "IN_PROGRESS": return "info";
    case "WAITING": return "neutral";
    case "RESOLVED": return "success";
    case "CLOSED": return "neutral";
    default: return "neutral";
  }
};

export default function ComplaintDetailsPage() {
  const { complaintId } = useParams<{ complaintId: string }>();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (complaintId) {
      complaintService.getComplaint(complaintId).then(data => {
        if (data) setComplaint(data);
        setIsLoading(false);
      });
    }
  }, [complaintId]);

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

  if (!complaint) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800">Complaint Not Found</h2>
        <Link to="/admin/complaints" className="mt-4 text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Complaints
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link to="/admin/complaints" className="flex items-center gap-2 text-slate-500 hover:text-[#8F7CFF] transition-colors font-bold text-sm bg-white/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white">
          <ArrowLeft className="w-4 h-4" /> Back to Complaint Board
        </Link>
        <div className="flex items-center gap-3">
          <ActionButton variant="outline" leftIcon={<UserPlus className="w-4 h-4" />}>Assign Staff</ActionButton>
          {complaint.status !== 'RESOLVED' && complaint.status !== 'CLOSED' && (
            <ActionButton variant="primary" leftIcon={<CheckCircle2 className="w-4 h-4" />}>Mark as Resolved</ActionButton>
          )}
        </div>
      </div>

      {/* Overview Hero */}
      <SectionCard className="relative overflow-hidden bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between relative z-10">
          
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-black text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-lg tracking-wider">
                {complaint.id}
              </span>
              <StatusBadge variant={getStatusVariant(complaint.status) as any}>{complaint.status.replace('_', ' ')}</StatusBadge>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${getPriorityColor(complaint.priority)}`}>
                {complaint.priority} Priority
              </span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-heading font-black text-slate-800 tracking-tight leading-tight mb-2">
              {complaint.title}
            </h1>
            <p className="text-slate-600 font-medium text-lg max-w-3xl">
              {complaint.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-200/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  {getCategoryIcon(complaint.category)}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</span>
                  <span className="font-bold text-slate-700">{complaint.category}</span>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</span>
                  <span className="font-bold text-slate-700">{complaint.residentName} ({complaint.building} - {complaint.flat})</span>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Created</span>
                  <span className="font-bold text-slate-700">{complaint.createdAt}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </SectionCard>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Comments & History */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#8F7CFF]" /> Activity & Comments
            </h3>

            {/* Comment Input */}
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Admin&background=8F7CFF&color=fff" alt="Admin" />
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden focus-within:border-[#8F7CFF] transition-colors shadow-inner">
                <textarea 
                  className="w-full bg-transparent p-4 outline-none resize-none text-slate-700 placeholder:text-slate-400 min-h-[100px]"
                  placeholder="Write an internal note or reply to the resident..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="flex items-center justify-between p-3 border-t border-slate-200 bg-white">
                  <button className="p-2 text-slate-400 hover:text-[#8F7CFF] transition-colors rounded-lg hover:bg-slate-50">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#8F7CFF] hover:bg-[#7b68ee] text-white rounded-xl font-bold text-sm transition-colors shadow-sm">
                    <Send className="w-4 h-4" /> Send
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[23px] before:top-4 before:bottom-0 before:w-0.5 before:bg-slate-100">
              
              <div className="relative mb-8">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-[#3DD9FF] rounded-full z-10 top-1.5" />
                <div className="flex flex-col bg-white p-4 rounded-2xl border border-slate-100 shadow-sm ml-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">Status changed to In Progress</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600">Admin changed the status and assigned it to Mahesh.</p>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1.5" />
                <div className="flex flex-col bg-white p-4 rounded-2xl border border-slate-100 shadow-sm ml-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{complaint.residentName}</span>
                      <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-bold">Resident</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Yesterday, 14:30</span>
                  </div>
                  <p className="text-sm text-slate-600">Please send someone quickly, the noise is very disturbing.</p>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[30px] w-4 h-4 bg-white border-4 border-slate-200 rounded-full z-10 top-1.5" />
                <div className="flex flex-col bg-slate-50 p-4 rounded-2xl border border-slate-100 ml-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-500">Complaint Created</span>
                    <span className="text-xs font-bold text-slate-400">{complaint.createdAt}</span>
                  </div>
                </div>
              </div>

            </div>

          </SectionCard>

        </div>

        {/* Right Column - Details & Actions */}
        <div className="flex flex-col gap-6">
          
          {/* Assigned Staff */}
          <SectionCard className={complaint.assignedTo ? 'bg-gradient-to-br from-[#72F1D1]/10 to-transparent border-[#72F1D1]/30' : ''}>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-slate-400" /> Assigned Staff
            </h3>
            {complaint.assignedTo ? (
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#72F1D1]/20 shadow-sm">
                <img 
                  src={complaint.assignedStaffAvatar || `https://ui-avatars.com/api/?name=${complaint.assignedTo}&background=f1f5f9&color=64748b`} 
                  alt={complaint.assignedTo} 
                  className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{complaint.assignedTo.split(' ')[0]}</span>
                  <span className="text-xs font-medium text-slate-500">{complaint.assignedTo.split(' ')[1]?.replace(/[\(\)]/g, '') || 'Staff'}</span>
                </div>
                <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:text-[#8F7CFF] transition-colors">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center gap-3">
                <span className="text-sm font-bold text-slate-400">No staff assigned yet</span>
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:text-[#8F7CFF] hover:border-[#8F7CFF] transition-colors">
                  Assign Now
                </button>
              </div>
            )}
          </SectionCard>

          {/* Attachments */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Paperclip className="w-5 h-5 text-slate-400" /> Attachments
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:border-[#8F7CFF]/40 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <div className="w-full h-full bg-slate-200 animate-pulse" /> {/* Placeholder for image */}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm text-slate-700 truncate group-hover:text-[#8F7CFF] transition-colors">IMG_8943.jpg</span>
                  <span className="text-xs font-medium text-slate-400">Added by Resident • 2.4 MB</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Quick Actions */}
          <SectionCard>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" /> Actions
            </h3>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-transparent hover:border-slate-100 group">
                <span className="group-hover:text-[#8F7CFF] transition-colors">Change Status</span>
                <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-transparent hover:border-slate-100 group">
                <span className="group-hover:text-[#8F7CFF] transition-colors">Update Priority</span>
                <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors border border-transparent hover:border-slate-100 group">
                <span className="group-hover:text-[#FF7A7A] transition-colors text-red-600">Delete Complaint</span>
              </button>
            </div>
          </SectionCard>

        </div>
      </div>
    </div>
  );
}

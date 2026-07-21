import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Megaphone, Calendar, Send, Edit, Copy, Trash2, 
  Eye, ShieldAlert, BarChart3, Clock, Plus, X,
  Paperclip, Image as ImageIcon, FileText, CheckCircle2
} from "lucide-react";
import { useAnnouncements, useAnnouncementKPIs } from "../hooks/useAnnouncements";
import { format } from "date-fns";


// Helpers
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'System': return 'bg-[#8F7CFF]/10 text-[#8F7CFF] border-[#8F7CFF]/20';
    case 'Emergency': return 'bg-[#FF7A7A]/10 text-[#FF7A7A] border-[#FF7A7A]/20';
    case 'Update': return 'bg-[#3DD9FF]/10 text-[#00A1C9] border-[#3DD9FF]/20';
    default: return 'bg-[#FFD166]/20 text-[#D49F1C] border-[#FFD166]/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Sent': return 'bg-[#72F1D1]/20 text-teal-700';
    case 'Scheduled': return 'bg-[#3DD9FF]/20 text-[#00A1C9]';
    default: return 'bg-slate-100 text-slate-600';
  }
};

export default function AnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();
  const { data: kpis } = useAnnouncementKPIs();
  
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const stats = [
    { label: "Sent", value: kpis?.totalSent.value, icon: Send, color: "text-[#72F1D1]" },
    { label: "Scheduled", value: kpis?.scheduled.value, icon: Clock, color: "text-[#3DD9FF]" },
    { label: "Drafts", value: kpis?.drafts.value, icon: Edit, color: "text-slate-400" },
    { label: "Avg Read Rate", value: kpis?.avgReadRate.value, icon: Eye, color: "text-[#8F7CFF]" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex relative h-full">
      
      <div className={`flex-1 transition-all duration-300 ${isEditorOpen ? 'pr-6 xl:pr-[600px]' : ''}`}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
              Global Announcements
            </h1>
            <p className="text-slate-500 font-medium text-base">
              Communicate with all societies from one centralized location.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
              <Calendar className="w-4 h-4 text-[#8F7CFF]" />
              Schedule Announcement
            </button>
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-slate-900 shadow-lg shadow-[#72F1D1]/30"
            >
              <Plus className="w-4 h-4" />
              Create Announcement
            </button>
          </div>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Main List */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* KPI Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-heading font-black text-slate-800">{stat.value || '...'}</div>
                </motion.div>
              ))}
            </div>

            {/* Announcement Cards */}
            <div className="space-y-4">
              {isLoading ? (
                [1,2,3].map(i => <div key={i} className="h-40 bg-white/40 backdrop-blur-md rounded-[32px] animate-pulse" />)
              ) : (
                announcements?.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300 group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                        {item.priority === 'High' && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF7A7A] bg-[#FF7A7A]/10 px-2 py-1 rounded-full">
                            <ShieldAlert className="w-3 h-3" /> High Priority
                          </span>
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#8F7CFF] transition-colors">{item.title}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {format(new Date(item.date), "MMM do, yyyy • HH:mm")}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><span className="w-4 h-4" /> {item.audience}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Read Rate</div>
                        <div className="text-2xl font-black text-slate-800">{item.status === 'Sent' ? `${item.readRate}%` : '--'}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#8F7CFF] hover:border-[#8F7CFF]/50 transition-colors tooltip-trigger">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-colors tooltip-trigger">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#FF7A7A] hover:border-[#FF7A7A]/50 transition-colors tooltip-trigger">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Insight Panel (Only visible when editor is closed on large screens) */}
          {!isEditorOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full xl:w-[350px] shrink-0 flex flex-col gap-6"
            >
              {/* Delivery Analytics */}
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#8F7CFF]" /> Delivery Analytics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Delivery Success</span>
                    <span className="text-sm font-bold text-teal-600">99.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Average Open Rate</span>
                    <span className="text-sm font-bold text-slate-700">84.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-500">Failed Deliveries</span>
                    <span className="text-sm font-bold text-[#FF7A7A]">12</span>
                  </div>
                </div>
              </div>

              {/* Quick Templates */}
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3DD9FF]" /> Quick Templates
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-[#FFD166]/50 hover:shadow-md transition-all group text-left">
                    <div>
                      <div className="font-bold text-slate-700 text-sm group-hover:text-[#D49F1C] transition-colors">Festival Greetings</div>
                      <div className="text-xs text-slate-500 font-medium">Diwali, Holi, Christmas...</div>
                    </div>
                    <Copy className="w-4 h-4 text-slate-300 group-hover:text-[#D49F1C]" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-[#FF7A7A]/50 hover:shadow-md transition-all group text-left">
                    <div>
                      <div className="font-bold text-slate-700 text-sm group-hover:text-[#FF7A7A] transition-colors">Emergency Alert</div>
                      <div className="text-xs text-slate-500 font-medium">Outages, Security threats...</div>
                    </div>
                    <Copy className="w-4 h-4 text-slate-300 group-hover:text-[#FF7A7A]" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-100 hover:border-[#8F7CFF]/50 hover:shadow-md transition-all group text-left">
                    <div>
                      <div className="font-bold text-slate-700 text-sm group-hover:text-[#8F7CFF] transition-colors">Maintenance Notice</div>
                      <div className="text-xs text-slate-500 font-medium">Elevators, Water supply...</div>
                    </div>
                    <Copy className="w-4 h-4 text-slate-300 group-hover:text-[#8F7CFF]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

      {/* Create Announcement Editor Drawer */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 600 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 600 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-full md:w-[600px] bg-white/90 backdrop-blur-3xl border-l border-white shadow-[-20px_0_60px_rgba(0,0,0,0.05)] z-50 flex flex-col"
          >
            <div className="p-6 border-b border-slate-200/50 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-heading font-extrabold text-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] flex items-center justify-center shadow-lg">
                  <Megaphone className="w-5 h-5 text-white" />
                </div>
                New Announcement
              </h3>
              <button 
                onClick={() => setIsEditorOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
              
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Message Title</label>
                <input 
                  type="text" 
                  placeholder="Enter a clear, concise title..." 
                  className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] focus:ring-4 focus:ring-[#8F7CFF]/10 transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Category</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-all font-medium text-slate-600 appearance-none">
                    <option>System Update</option>
                    <option>Emergency Alert</option>
                    <option>Festival Greeting</option>
                    <option>General Information</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Priority</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-all font-medium text-slate-600 appearance-none">
                    <option>Normal</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Audience</label>
                <select className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-all font-medium text-slate-600 appearance-none">
                  <option>All Societies Platform-wide</option>
                  <option>Specific City (Bengaluru)</option>
                  <option>Specific Society (Green Valley)</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Message Content</label>
                <div className="border border-slate-200 rounded-2xl bg-white/50 overflow-hidden focus-within:border-[#8F7CFF] focus-within:ring-4 focus-within:ring-[#8F7CFF]/10 transition-all">
                  <div className="flex items-center gap-2 p-2 border-b border-slate-100 bg-white/80">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><ImageIcon className="w-4 h-4" /></button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"><Paperclip className="w-4 h-4" /></button>
                    <div className="w-px h-4 bg-slate-200 mx-2" />
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 font-bold font-serif transition-colors">B</button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-800 italic font-serif transition-colors">I</button>
                  </div>
                  <textarea 
                    rows={8}
                    placeholder="Write your announcement here..."
                    className="w-full p-5 bg-transparent resize-none focus:outline-none font-medium text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Delivery Channels</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-md border-2 border-[#8F7CFF] bg-[#8F7CFF] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-sm text-slate-700">In-App Banner</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-md border-2 border-slate-200 flex items-center justify-center">
                    </div>
                    <span className="font-bold text-sm text-slate-700">Email Broadcast</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="w-6 h-6 rounded-md border-2 border-slate-200 flex items-center justify-center">
                    </div>
                    <span className="font-bold text-sm text-slate-700">SMS / Push (Coming Soon)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200/50 flex justify-between items-center shrink-0 bg-slate-50/50">
              <button className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-white hover:text-slate-800 border border-transparent hover:border-slate-200 transition-all">
                Save Draft
              </button>
              
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-xl bg-white border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Schedule
                </button>
                <button 
                  onClick={() => setIsEditorOpen(false)}
                  className="px-8 py-3 rounded-xl bg-[#8F7CFF] hover:bg-[#7b68ee] text-white font-bold transition-all shadow-lg shadow-[#8F7CFF]/30 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Publish Now
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

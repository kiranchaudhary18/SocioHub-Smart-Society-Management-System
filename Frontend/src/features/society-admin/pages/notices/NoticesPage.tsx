import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { noticeService } from "../../services/notice.service";
import type { Notice, NoticeStats } from "../../services/notice.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { 
  Megaphone, FileText, CalendarClock, Pin, Eye, History, 
  Plus, Download, Search, Filter, LayoutGrid, List, MoreVertical,
  Bell, AlertTriangle, IndianRupee, File
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "GENERAL": return <Megaphone className="w-4 h-4 text-[#8F7CFF]" />;
    case "MAINTENANCE": return <AlertTriangle className="w-4 h-4 text-[#FFD166]" />;
    case "EMERGENCY": return <Bell className="w-4 h-4 text-[#FF7A7A]" />;
    case "EVENT": return <CalendarClock className="w-4 h-4 text-[#72F1D1]" />;
    case "FINANCE": return <IndianRupee className="w-4 h-4 text-[#3DD9FF]" />;
    default: return <File className="w-4 h-4 text-slate-400" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case "PUBLISHED": return "success";
    case "DRAFT": return "neutral";
    case "SCHEDULED": return "warning";
    case "EXPIRED": return "danger";
    default: return "neutral";
  }
};

export default function NoticesPage() {
  const [view, setView] = useState<'card' | 'table'>('card');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [stats, setStats] = useState<NoticeStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [noticesData, statsData] = await Promise.all([
        noticeService.getNotices(),
        noticeService.getStats()
      ]);
      setNotices(noticesData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const filteredNotices = notices.filter(n => 
    `${n.title} ${n.category} ${n.id} ${n.audience}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Notice Board</h1>
          <p className="text-slate-500 font-medium mt-1">Create, schedule and publish notices for residents.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<CalendarClock className="w-4 h-4" />}>Schedule Notice</ActionButton>
          <ActionButton variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export</ActionButton>
          <ActionButton variant="primary" leftIcon={<Plus className="w-4 h-4" />}>Create Notice</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Published" value={stats.published} icon={<Megaphone className="w-5 h-5 text-[#72F1D1]" />} delay={0.1} trend={{ value: 12, isPositive: true }} />
          <StatCard title="Drafts" value={stats.drafts} icon={<FileText className="w-5 h-5 text-slate-400" />} delay={0.15} />
          <StatCard title="Scheduled" value={stats.scheduled} icon={<CalendarClock className="w-5 h-5 text-[#FFD166]" />} delay={0.2} />
          <StatCard title="Pinned" value={stats.pinned} icon={<Pin className="w-5 h-5 text-[#8F7CFF]" />} delay={0.25} />
          <StatCard title="Unread" value={stats.unread} icon={<Eye className="w-5 h-5 text-[#FF5DA2]" />} delay={0.3} />
          <StatCard title="Expired" value={stats.expired} icon={<History className="w-5 h-5 text-slate-300" />} delay={0.35} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search notices by title or category..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('card')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'card' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'table' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="w-full bg-white/60 rounded-[32px] overflow-hidden p-6 animate-pulse">
          <div className="h-12 bg-slate-100/50 rounded-2xl mb-4" />
          {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-100/30 rounded-2xl mb-2" />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === 'card' ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredNotices.map((notice, i) => (
                <motion.div
                  key={notice.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white/60 backdrop-blur-xl border ${notice.isPinned ? 'border-[#8F7CFF]/50 shadow-[0_8px_32px_rgba(143,124,255,0.15)]' : 'border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)]'} rounded-[32px] p-6 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-white transition-all group relative flex flex-col h-full`}
                >
                  {notice.isPinned && (
                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#8F7CFF] text-white p-2 rounded-full shadow-lg">
                      <Pin className="w-4 h-4 fill-white" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <StatusBadge variant={getStatusVariant(notice.status) as any}>{notice.status}</StatusBadge>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 group-hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/admin/notices/${notice.id}`} className="text-xl font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors leading-tight mb-2 line-clamp-2">
                    {notice.title}
                  </Link>

                  <p className="text-sm text-slate-500 mb-6 line-clamp-3">
                    {notice.content}
                  </p>

                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {getCategoryIcon(notice.category)} {notice.category}
                      </span>
                      {notice.priority === 'HIGH' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#FF7A7A] bg-[#FF7A7A]/10 px-2.5 py-1 rounded-lg">
                          <AlertTriangle className="w-3.5 h-3.5" /> High Priority
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100/50">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Published</span>
                        <span className="text-xs font-bold text-slate-600">{notice.publishDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-bold">{notice.viewCount}/{notice.totalResidents}</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-5 whitespace-nowrap">Notice Title</th>
                      <th className="px-6 py-5 whitespace-nowrap">Category</th>
                      <th className="px-6 py-5 whitespace-nowrap">Audience</th>
                      <th className="px-6 py-5 whitespace-nowrap">Status</th>
                      <th className="px-6 py-5 whitespace-nowrap">Published</th>
                      <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotices.map((notice, i) => (
                      <motion.tr 
                        key={notice.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-slate-50 hover:bg-white transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {notice.isPinned && <Pin className="w-4 h-4 text-[#8F7CFF] fill-[#8F7CFF]" />}
                            <div className="flex flex-col">
                              <Link to={`/admin/notices/${notice.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors line-clamp-1">
                                {notice.title}
                              </Link>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] font-black tracking-wider text-slate-400">{notice.id}</span>
                                {notice.priority === 'HIGH' && <span className="text-[10px] font-bold text-[#FF7A7A]">HIGH PRIORITY</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg w-fit">
                            {getCategoryIcon(notice.category)} {notice.category}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-600">{notice.audience}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge variant={getStatusVariant(notice.status) as any}>
                            {notice.status}
                          </StatusBadge>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{notice.publishDate !== '-' ? notice.publishDate.split(',')[0] : '-'}</span>
                            <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 mt-0.5"><Eye className="w-3 h-3" /> {notice.viewCount} views</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}

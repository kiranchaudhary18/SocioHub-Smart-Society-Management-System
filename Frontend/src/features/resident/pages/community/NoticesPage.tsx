import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { communityService, type Notice } from "../../services/community.service";
import { NoticeKPIs } from "./components/notices/NoticeKPIs";
import { FeaturedNotice } from "./components/notices/FeaturedNotice";
import { NoticeToolbar } from "./components/notices/NoticeToolbar";
import { NoticeFeed } from "./components/notices/NoticeFeed";
import { NoticeDetailsDrawer } from "./components/notices/NoticeDetailsDrawer";
import { NoticesRightSidebar } from "./components/notices/NoticesRightSidebar";
import { Loader2 } from "lucide-react";

export default function NoticesPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const [kpis, notices] = await Promise.all([
        communityService.getNoticeKPIs(),
        communityService.getNotices()
      ]);
      return { kpis, notices };
    }
  });

  const handleReset = () => {
    setSearchTerm("");
    setCategoryFilter("ALL");
    setPriorityFilter("ALL");
    setUnreadOnly(false);
  };

  const filteredNotices = useMemo(() => {
    if (!data?.notices) return [];
    return data.notices.filter(n => {
      const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === "ALL" || n.category === categoryFilter;
      const matchPriority = priorityFilter === "ALL" || n.priority === priorityFilter;
      const matchUnread = !unreadOnly || !n.isRead;
      return matchSearch && matchCategory && matchPriority && matchUnread;
    });
  }, [data?.notices, searchTerm, categoryFilter, priorityFilter, unreadOnly]);

  const featuredNotice = useMemo(() => {
    return data?.notices.find(n => n.isFeatured) || data?.notices[0];
  }, [data?.notices]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading notices...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load notices</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Society Notices</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Stay updated with important announcements from your society.</p>
      </div>

      <NoticeKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          {featuredNotice && !searchTerm && categoryFilter === "ALL" && !unreadOnly && (
            <FeaturedNotice notice={featuredNotice} onView={setSelectedNotice} />
          )}

          <NoticeToolbar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter}
            priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
            unreadOnly={unreadOnly} setUnreadOnly={setUnreadOnly}
            onReset={handleReset}
          />
          
          <NoticeFeed 
            notices={filteredNotices}
            onView={setSelectedNotice}
          />
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <NoticesRightSidebar />
          </div>
        </div>

      </div>

      <NoticeDetailsDrawer 
        notice={selectedNotice} 
        isOpen={!!selectedNotice} 
        onClose={() => setSelectedNotice(null)} 
        onNoticeRead={() => {
          queryClient.invalidateQueries({ queryKey: ['notices'] });
        }}
      />

    </div>
  );
}

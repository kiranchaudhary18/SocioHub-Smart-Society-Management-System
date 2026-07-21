import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, Plus, Search, Filter,
  BookOpen, Clock, AlertCircle, CheckCircle2,
  Paperclip, Send, MoreHorizontal, User, Building2, Sparkles, History
} from "lucide-react";
import { useSupportTickets, useSupportKPIs } from "../hooks/useSupport";
import { format, formatDistanceToNow } from "date-fns";
import type { TicketStatus, TicketPriority } from "../mock/support";

const getStatusColor = (status: TicketStatus) => {
  switch (status) {
    case 'Open': return 'bg-[#3DD9FF]/10 text-[#00A1C9] border-[#3DD9FF]/20';
    case 'Pending': return 'bg-[#FFD166]/20 text-[#D49F1C] border-[#FFD166]/30';
    case 'Resolved': return 'bg-[#72F1D1]/20 text-teal-700 border-[#72F1D1]/30';
    case 'Closed': return 'bg-slate-100 text-slate-500 border-slate-200';
    case 'Escalated': return 'bg-[#FF7A7A]/10 text-[#FF7A7A] border-[#FF7A7A]/20';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

const getPriorityIcon = (priority: TicketPriority) => {
  switch (priority) {
    case 'Critical': return <AlertCircle className="w-3 h-3 text-[#FF7A7A]" />;
    case 'High': return <AlertCircle className="w-3 h-3 text-[#FFD166]" />;
    case 'Medium': return <Clock className="w-3 h-3 text-[#3DD9FF]" />;
    default: return <CheckCircle2 className="w-3 h-3 text-slate-400" />;
  }
};

export default function SupportCenterPage() {
  const { data: tickets, isLoading } = useSupportTickets();
  const { data: kpis } = useSupportKPIs();
  
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const activeTicket = tickets?.find(t => t.id === activeTicketId) || (tickets?.[0] ?? null);

  const stats = [
    { label: "Open Tickets", value: kpis?.openTickets.value, color: "text-[#3DD9FF]" },
    { label: "Pending", value: kpis?.pending.value, color: "text-[#FFD166]" },
    { label: "Resolved", value: kpis?.resolved.value, color: "text-[#72F1D1]" },
    { label: "Avg Response", value: kpis?.avgResponseTime.value, color: "text-[#8F7CFF]" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-full gap-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
            Support Center
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Manage platform support requests, technical issues and customer conversations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
            <BookOpen className="w-4 h-4 text-[#8F7CFF]" />
            Knowledge Base
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-slate-900 shadow-lg shadow-[#72F1D1]/30">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </motion.div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex items-center justify-between"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            <div className={`text-2xl font-heading font-black ${stat.color}`}>{stat.value || '...'}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-280px)] min-h-[600px]">
        
        {/* LEFT PANE: Ticket List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[450px] shrink-0 flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          {/* Smart Filters Header */}
          <div className="p-4 border-b border-white flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Search tickets..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:border-[#8F7CFF] text-sm font-medium transition-colors"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-100 hover:bg-slate-50 transition-colors text-xs font-bold text-slate-600 whitespace-nowrap">
                <Filter className="w-3 h-3" /> Status: Open
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-100 hover:bg-slate-50 transition-colors text-xs font-bold text-slate-600 whitespace-nowrap">
                Priority: All
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
            {isLoading ? (
              [1,2,3,4].map(i => <div key={i} className="h-24 bg-white/40 rounded-2xl animate-pulse m-2" />)
            ) : (
              tickets?.map((ticket) => {
                const isActive = (activeTicketId === ticket.id) || (!activeTicketId && activeTicket?.id === ticket.id);
                return (
                  <button
                    key={ticket.id}
                    onClick={() => setActiveTicketId(ticket.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border ${
                      isActive 
                        ? 'bg-white shadow-[0_4px_20px_rgba(143,124,255,0.08)] border-[#8F7CFF]/20' 
                        : 'bg-transparent border-transparent hover:bg-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-400">{ticket.id}</span>
                      <span className="text-xs font-medium text-slate-400">
                        {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold mb-2 line-clamp-1 ${isActive ? 'text-[#8F7CFF]' : 'text-slate-800'}`}>
                      {ticket.subject}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(ticket.priority)}
                        <span className="text-xs font-medium text-slate-500 line-clamp-1">{ticket.user.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>

        {/* RIGHT PANE: Workspace */}
        {activeTicket ? (
          <motion.div 
            key={activeTicket.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col xl:flex-row gap-6 overflow-hidden"
          >
            {/* Conversation Area */}
            <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
              
              {/* Ticket Header */}
              <div className="p-6 border-b border-white bg-white/40 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-slate-400">{activeTicket.id}</span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                      {activeTicket.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-heading font-extrabold text-slate-900">{activeTicket.subject}</h2>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    Resolve
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                {activeTicket.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.isInternal ? 'pl-8' : ''}`}>
                    {msg.sender.avatar ? (
                      <img src={msg.sender.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8F7CFF]/20 to-[#3DD9FF]/20 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-[#8F7CFF]" />
                      </div>
                    )}
                    <div className={`flex-1 ${msg.isInternal ? 'bg-[#FFD166]/10 border border-[#FFD166]/20' : 'bg-white border border-slate-100'} p-4 rounded-2xl rounded-tl-none shadow-sm`}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-800">{msg.sender.name}</span>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${msg.isInternal ? 'bg-[#FFD166]/20 text-[#D49F1C]' : 'bg-slate-100 text-slate-500'}`}>
                            {msg.sender.role}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-slate-400">
                          {format(new Date(msg.timestamp), "HH:mm")}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </p>
                      {msg.isInternal && (
                        <div className="mt-2 text-xs font-bold text-[#D49F1C] flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Internal Note (Not visible to user)
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Editor */}
              <div className="p-4 border-t border-white bg-white/40">
                <div className="bg-white rounded-2xl border border-slate-200 focus-within:border-[#8F7CFF] focus-within:ring-4 focus-within:ring-[#8F7CFF]/10 transition-all p-3 shadow-sm">
                  <textarea 
                    rows={3}
                    placeholder="Type your reply here... (Use @ to mention teammates)"
                    className="w-full bg-transparent resize-none focus:outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                  />
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                    <div className="flex gap-1">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors tooltip-trigger" title="Attach File">
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors text-xs font-bold flex items-center gap-1">
                        Internal Note
                      </button>
                    </div>
                    <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] text-white font-bold shadow-md shadow-[#8F7CFF]/20 hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Context Sidebar */}
            <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
              
              {/* User Context */}
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-center flex flex-col items-center">
                {activeTicket.user.avatar ? (
                  <img src={activeTicket.user.avatar} alt="User" className="w-20 h-20 rounded-2xl mb-4 bg-slate-100" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                )}
                <h3 className="text-lg font-bold text-slate-900">{activeTicket.user.name}</h3>
                <p className="text-sm font-medium text-slate-500 mb-2">{activeTicket.user.email}</p>
                <span className="px-2.5 py-1 rounded-full bg-[#8F7CFF]/10 text-[#8F7CFF] text-[10px] font-bold uppercase tracking-wider mb-4">
                  {activeTicket.user.role}
                </span>

                <div className="w-full flex items-center gap-2 p-3 bg-white/50 rounded-xl border border-slate-100 text-left">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 line-clamp-1">{activeTicket.user.society}</span>
                </div>
              </div>

              {/* AI Assistant */}
              <div className="bg-gradient-to-br from-[#8F7CFF] to-[#3DD9FF] rounded-[32px] p-1 shadow-lg shadow-[#8F7CFF]/20">
                <div className="bg-white/95 backdrop-blur-md rounded-[28px] p-5 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#8F7CFF]/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                  <h4 className="text-sm font-heading font-black text-slate-800 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8F7CFF]" /> AI Suggestions
                  </h4>
                  <p className="text-xs font-medium text-slate-600 mb-4 leading-relaxed">
                    Based on the message, this seems to be a known issue with the v2.4 mobile app caching.
                  </p>
                  <button className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-[#8F7CFF]/5 border border-slate-100 hover:border-[#8F7CFF]/30 transition-all text-xs font-bold text-slate-700 text-left line-clamp-2">
                    "Hi {activeTicket.user.name.split(' ')[0]}, this is a known issue. Please ask guards to clear app cache or update to v2.4.1..."
                  </button>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" /> Ticket Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500">Created</span>
                    <span className="text-xs font-bold text-slate-700">{format(new Date(activeTicket.createdAt), "MMM d, HH:mm")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500">Assignee</span>
                    <span className="text-xs font-bold text-[#8F7CFF]">{activeTicket.assignedTo || "Unassigned"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-500">Priority</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                      {getPriorityIcon(activeTicket.priority)} {activeTicket.priority}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md border border-white/60 rounded-[32px]">
            <MessageSquare className="w-16 h-16 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-400">Select a ticket to view conversation</h3>
          </div>
        )}

      </div>
    </div>
  );
}

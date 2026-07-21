import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UserPlus, Download, Search, Filter,
  TrendingUp, TrendingDown, 
  UserCog, Eye, ShieldAlert,
  Key, RefreshCw, Trash2
} from "lucide-react";
import { usePlatformUsers, usePlatformUserKPIs } from "../hooks/useUsers";
import { format } from "date-fns";
import { Role } from "@/types/auth";
import * as Tooltip from "@radix-ui/react-tooltip";

// Helper for Role Badge Colors
const getRoleBadge = (role: Role) => {
  switch (role) {
    case Role.SUPER_ADMIN: return { label: "Super Admin", color: "bg-[#FF5DA2]/10 text-[#FF5DA2]" };
    case Role.SOCIETY_ADMIN: return { label: "Society Admin", color: "bg-[#8F7CFF]/10 text-[#8F7CFF]" };
    case Role.SECURITY: return { label: "Security", color: "bg-[#FFD166]/20 text-[#D49F1C]" };
    case Role.STAFF: return { label: "Staff", color: "bg-slate-100 text-slate-600" };
    default: return { label: "Resident", color: "bg-[#72F1D1]/20 text-teal-700" };
  }
};

export default function PlatformUsersPage() {
  const { data: users, isLoading } = usePlatformUsers();
  const { data: kpis } = usePlatformUserKPIs();
  
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const kpiCards = [
    { title: "Total Users", value: kpis?.totalUsers.value.toLocaleString(), trend: kpis?.totalUsers.trend, positive: kpis?.totalUsers.positive, icon: Users, color: "text-[#72F1D1]", bg: "bg-[#72F1D1]/10" },
    { title: "Active Today", value: kpis?.activeToday.value.toLocaleString(), trend: kpis?.activeToday.trend, positive: kpis?.activeToday.positive, icon: TrendingUp, color: "text-[#8F7CFF]", bg: "bg-[#8F7CFF]/10" },
    { title: "Pending Approvals", value: kpis?.pendingApprovals.value, trend: kpis?.pendingApprovals.trend, positive: kpis?.pendingApprovals.positive, icon: ShieldAlert, color: "text-[#FFD166]", bg: "bg-[#FFD166]/20" },
    { title: "Blocked Users", value: kpis?.blockedUsers.value, trend: kpis?.blockedUsers.trend, positive: kpis?.blockedUsers.positive, icon: ShieldAlert, color: "text-[#FF7A7A]", bg: "bg-[#FF7A7A]/10" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex relative h-full">
      
      <div className={`flex-1 transition-all duration-300 ${selectedUser ? 'pr-6 xl:pr-[400px]' : ''}`}>
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
              Platform Users
            </h1>
            <p className="text-slate-500 font-medium text-base">
              Manage residents, society admins, security guards and staff from one place.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:bg-white transition-colors text-sm font-bold text-slate-700">
              <Download className="w-4 h-4 text-[#8F7CFF]" />
              Export Users
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-slate-900 shadow-lg shadow-[#72F1D1]/30">
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(143,124,255,0.08)] transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${card.positive ? 'bg-[#72F1D1]/10 text-teal-600' : 'bg-[#FF7A7A]/10 text-[#FF7A7A]'}`}>
                  {card.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{card.trend}</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 mb-1">{card.title}</h4>
                <div className="text-3xl font-heading font-black text-slate-800">{card.value || '...'}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Smart Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-4 mb-6 flex flex-col xl:flex-row gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
        >
          <div className="flex-1 relative min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by name, email, or phone..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 text-sm font-medium transition-all"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700 whitespace-nowrap">
              <Filter className="w-4 h-4 text-slate-400" />
              Role: All
            </button>
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700 whitespace-nowrap">
              Society: All
            </button>
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-700 whitespace-nowrap">
              Status: All
            </button>
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-transparent transition-colors text-sm font-bold text-slate-600 whitespace-nowrap">
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </motion.div>

        {/* Data Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Society</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {isLoading ? (
                  [1,2,3,4,5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-5"><div className="h-10 w-48 bg-slate-200 rounded-xl" /></td>
                      <td className="px-6 py-5"><div className="h-6 w-24 bg-slate-200 rounded-full" /></td>
                      <td className="px-6 py-5"><div className="h-6 w-32 bg-slate-200 rounded-xl" /></td>
                      <td className="px-6 py-5"><div className="h-6 w-20 bg-slate-200 rounded-full" /></td>
                      <td className="px-6 py-5"><div className="h-6 w-24 bg-slate-200 rounded-xl" /></td>
                      <td className="px-6 py-5"><div className="h-8 w-20 bg-slate-200 rounded-xl ml-auto" /></td>
                    </tr>
                  ))
                ) : (
                  users?.map((user) => {
                    const roleBadge = getRoleBadge(user.role);
                    return (
                      <tr 
                        key={user.id} 
                        onClick={() => setSelectedUser(user)}
                        className={`hover:bg-white/40 transition-colors group cursor-pointer ${selectedUser?.id === user.id ? 'bg-white/60' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full bg-slate-100 shrink-0" />
                            <div>
                              <div className="font-bold text-slate-800 group-hover:text-[#8F7CFF] transition-colors">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs text-slate-500 font-medium">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${roleBadge.color}`}>
                            {roleBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-slate-600 line-clamp-1 max-w-[150px]">{user.society}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            user.status === 'Active' ? 'bg-[#72F1D1]/20 text-teal-700' : 
                            user.status === 'Suspended' ? 'bg-[#FF7A7A]/10 text-[#FF7A7A]' : 
                            'bg-[#FFD166]/20 text-[#D49F1C]'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-500">
                            {format(new Date(user.lastLogin), "MMM d, HH:mm")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#8F7CFF] transition-all">
                                    <Eye className="w-4 h-4" />
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg" sideOffset={5}>
                                    View Profile
                                    <Tooltip.Arrow className="fill-slate-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>

                            <Tooltip.Provider>
                              <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF7A7A] transition-all">
                                    <ShieldAlert className="w-4 h-4" />
                                  </button>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                  <Tooltip.Content className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg" sideOffset={5}>
                                    Suspend User
                                    <Tooltip.Arrow className="fill-slate-800" />
                                  </Tooltip.Content>
                                </Tooltip.Portal>
                              </Tooltip.Root>
                            </Tooltip.Provider>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>

      {/* User Details Drawer (Right Panel) */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div 
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-screen w-[400px] bg-white/80 backdrop-blur-3xl border-l border-white shadow-[-20px_0_60px_rgba(0,0,0,0.05)] z-50 overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-heading font-extrabold text-slate-800">User Profile</h3>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <Search className="w-4 h-4 rotate-45" /> {/* Close icon substitute */}
                </button>
              </div>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <img src={selectedUser.avatar} alt="Profile" className="w-24 h-24 rounded-3xl bg-slate-100 shadow-xl shadow-[#8F7CFF]/10" />
                  <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white ${
                    selectedUser.status === 'Active' ? 'bg-[#72F1D1]' : 'bg-[#FF7A7A]'
                  }`} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{selectedUser.firstName} {selectedUser.lastName}</h2>
                <p className="text-sm font-medium text-slate-500 mb-3">{selectedUser.email}</p>
                
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getRoleBadge(selectedUser.role).color}`}>
                  {getRoleBadge(selectedUser.role).label}
                </span>
              </div>

              <div className="space-y-6">
                <div className="bg-white/50 rounded-2xl p-5 border border-white">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Info</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-500">Phone</span>
                      <span className="text-sm font-bold text-slate-700">{selectedUser.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-500">Society</span>
                      <span className="text-sm font-bold text-[#8F7CFF]">{selectedUser.society}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-2xl p-5 border border-white">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Account Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-500">Registered</span>
                      <span className="text-sm font-bold text-slate-700">{format(new Date(selectedUser.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-500">Last Login</span>
                      <span className="text-sm font-bold text-slate-700">{format(new Date(selectedUser.lastLogin), "MMM d, HH:mm")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-[#8F7CFF] hover:bg-[#7b68ee] text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-[#8F7CFF]/30 flex justify-center items-center gap-2">
                  <UserCog className="w-4 h-4" /> Edit User Profile
                </button>
                <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-2xl border border-slate-200 transition-all flex justify-center items-center gap-2">
                  <Key className="w-4 h-4" /> Reset Password
                </button>
                <button className="w-full bg-[#FF7A7A]/10 hover:bg-[#FF7A7A]/20 text-[#FF7A7A] font-bold py-3.5 rounded-2xl transition-all flex justify-center items-center gap-2 mt-4">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

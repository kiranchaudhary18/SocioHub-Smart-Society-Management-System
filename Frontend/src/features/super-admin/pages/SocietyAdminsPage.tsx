import { motion } from "framer-motion";
import { Search, Filter, ShieldAlert, Key, MoreHorizontal, UserCog } from "lucide-react";

export default function SocietyAdminsPage() {
  const admins = [
    { id: 1, name: "Amit Shah", email: "amit@greenvalley.com", society: "Green Valley Apartments", status: "Active", lastLogin: "2 hours ago" },
    { id: 2, name: "Neha Patil", email: "neha@blueridge.com", society: "Blue Ridge Residency", status: "Active", lastLogin: "1 day ago" },
    { id: 3, name: "Vikram Singh", email: "vikram@sunrise.com", society: "Sunrise Towers", status: "Suspended", lastLogin: "2 weeks ago" },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
          Society Admins
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Manage secretaries and primary administrators for all societies.
        </p>
      </motion.div>

      {/* Filters Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-4 mb-6 flex flex-col md:flex-row gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name, email, or society..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 text-sm font-medium transition-all"
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Admin Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Society</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-white/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8F7CFF]/20 to-[#3DD9FF]/20 flex items-center justify-center">
                        <UserCog className="w-5 h-5 text-[#8F7CFF]" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{admin.name}</div>
                        <div className="text-xs text-slate-500 font-medium">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-600">{admin.society}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      admin.status === 'Active' ? 'bg-[#72F1D1]/20 text-teal-700' : 'bg-[#FF7A7A]/10 text-[#FF7A7A]'
                    }`}>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-500">{admin.lastLogin}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#8F7CFF] hover:bg-white transition-all tooltip-trigger" title="Reset Password">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#FF7A7A] hover:bg-white transition-all tooltip-trigger" title="Suspend Account">
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-white transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

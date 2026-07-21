import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Plus, Download, Upload, Users,
  Activity, Settings, Edit3, Trash2
} from "lucide-react";
import { useRoles } from "../hooks/useRoles";
import { format } from "date-fns";
import type { PermissionAccess } from "../mock/roles";
import * as Switch from "@radix-ui/react-switch";

const ACCESS_TYPES: PermissionAccess[] = ["View", "Create", "Edit", "Delete", "Approve"];

export default function RolesPermissionsPage() {
  const { data: roles, isLoading } = useRoles();
  const [activeRoleId, setActiveRoleId] = useState<string | null>(null);

  const activeRole = roles?.find(r => r.id === activeRoleId) || (roles?.[0] ?? null);

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-[calc(100vh-100px)] gap-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
            Roles & Permissions
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Configure system access levels and module permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white transition-colors text-sm font-bold text-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white transition-colors text-sm font-bold text-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-white shadow-lg shadow-[#8F7CFF]/30">
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
        
        {/* LEFT: Role List */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[320px] shrink-0 flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="p-5 border-b border-white bg-white/40">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8F7CFF]" />
              System Roles
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-white/50 rounded-2xl animate-pulse" />)
            ) : (
              roles?.map((role) => {
                const isActive = (activeRoleId === role.id) || (!activeRoleId && activeRole?.id === role.id);
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveRoleId(role.id)}
                    className={`w-full text-left p-4 rounded-2xl transition-all border ${
                      isActive 
                        ? 'bg-white shadow-[0_4px_20px_rgba(143,124,255,0.08)] border-[#8F7CFF]/20' 
                        : 'bg-transparent border-transparent hover:bg-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold ${isActive ? 'text-[#8F7CFF]' : 'text-slate-700'}`}>{role.name}</span>
                      {role.isSystem && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-400 uppercase tracking-wider">Sys</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Users className="w-3.5 h-3.5" />
                      {role.userCount.toLocaleString()} Users
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>

        {/* CENTER: Permission Matrix */}
        {activeRole && (
          <motion.div 
            key={activeRole.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-[2] flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
          >
            <div className="p-6 border-b border-white bg-white/40 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-heading font-extrabold text-slate-900 mb-1">{activeRole.name} Permissions</h2>
                <p className="text-sm font-medium text-slate-500">Configure what users with this role can do across modules.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                  Discard Changes
                </button>
                <button className="px-4 py-2 rounded-xl bg-[#72F1D1] text-teal-800 text-sm font-bold hover:bg-[#5ee1c0] transition-colors shadow-lg shadow-[#72F1D1]/30">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">Module</th>
                    {ACCESS_TYPES.map(type => (
                      <th key={type} className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center sticky top-0 bg-white/80 backdrop-blur-md z-10">
                        {type}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeRole.permissions.map((perm) => (
                    <tr key={perm.module} className="hover:bg-white/40 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-700">{perm.module}</td>
                      {ACCESS_TYPES.map(type => {
                        const hasAccess = perm.access[type];
                        return (
                          <td key={type} className="py-4 px-4 text-center">
                            <Switch.Root 
                              checked={hasAccess}
                              className={`w-11 h-6 rounded-full relative transition-colors ${hasAccess ? 'bg-[#72F1D1]' : 'bg-slate-200'}`}
                            >
                              <Switch.Thumb 
                                className={`block w-4 h-4 bg-white rounded-full transition-transform transform shadow-sm ${hasAccess ? 'translate-x-[22px]' : 'translate-x-[4px]'}`} 
                              />
                            </Switch.Root>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* RIGHT: Role Summary */}
        {activeRole && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full xl:w-[350px] shrink-0 flex flex-col gap-6"
          >
            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/20 to-[#3DD9FF]/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-[#8F7CFF]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{activeRole.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-6">{activeRole.description}</p>
              
              <div className="w-full grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/50 border border-slate-100 rounded-2xl p-4">
                  <span className="block text-2xl font-black text-slate-700 mb-1">{activeRole.userCount.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Users</span>
                </div>
                <div className="bg-white/50 border border-slate-100 rounded-2xl p-4">
                  <span className="block text-2xl font-black text-[#8F7CFF] mb-1">
                    {activeRole.permissions.reduce((acc, curr) => acc + Object.values(curr.access).filter(Boolean).length, 0)}
                  </span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Policies</span>
                </div>
              </div>

              <div className="flex gap-2 w-full">
                <button className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" /> Edit Info
                </button>
                {!activeRole.isSystem && (
                  <button className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#FF7A7A] hover:bg-[#FF7A7A]/10 transition-colors flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex-1">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" /> Recent Activity
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Settings className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Permissions updated</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">By Kiran Chaudhary • {format(new Date(activeRole.lastUpdated), "MMM d, yyyy")}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Role assigned to 15 users</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">System • Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

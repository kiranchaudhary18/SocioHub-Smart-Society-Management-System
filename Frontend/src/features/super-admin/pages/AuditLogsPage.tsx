import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Download, Activity, ShieldAlert,
  Globe, Clock, Laptop, Eye, X, ShieldCheck, Database,
  Terminal, UserCog, User, MapPin
} from "lucide-react";
import { useAuditLogs, useAuditKPIs, useSecurityAlerts } from "../hooks/useAudit";
import { formatDistanceToNow } from "date-fns";
import type { AuditEvent, RiskLevel } from "../mock/audit";

const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case 'Critical': return 'text-[#FF7A7A] bg-[#FF7A7A]/10 border-[#FF7A7A]/20';
    case 'High': return 'text-[#FFD166] bg-[#FFD166]/10 border-[#FFD166]/20';
    case 'Medium': return 'text-[#3DD9FF] bg-[#3DD9FF]/10 border-[#3DD9FF]/20';
    case 'Low': return 'text-[#72F1D1] bg-[#72F1D1]/10 border-[#72F1D1]/20';
    default: return 'text-slate-500 bg-slate-100 border-slate-200';
  }
};

const getModuleIcon = (moduleName: string) => {
  switch (moduleName) {
    case 'Authentication': return <ShieldCheck className="w-4 h-4" />;
    case 'User Management': return <UserCog className="w-4 h-4" />;
    case 'Billing': return <Database className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

export default function AuditLogsPage() {
  const { data: logs, isLoading: isLogsLoading } = useAuditLogs();
  const { data: kpis } = useAuditKPIs();
  const { data: alerts } = useSecurityAlerts();
  
  const [selectedLog, setSelectedLog] = useState<AuditEvent | null>(null);

  const stats = [
    { label: "Today's Logs", value: kpis?.todayLogs.value.toLocaleString(), color: "text-[#8F7CFF]" },
    { label: "Failed Logins", value: kpis?.failedLogins.value, color: "text-[#FF7A7A]" },
    { label: "Deleted Records", value: kpis?.deletedRecords.value, color: "text-[#FFD166]" },
    { label: "Admin Actions", value: kpis?.adminActions.value, color: "text-[#3DD9FF]" },
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
            Audit Logs
          </h1>
          <p className="text-slate-500 font-medium text-base">
            System-wide activity timeline, security alerts, and request payloads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white transition-colors text-sm font-bold text-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Download className="w-4 h-4" />
            Export Logs
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

      {/* Filters Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[24px] p-4 flex flex-col md:flex-row gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by action, IP, or user..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 focus:outline-none focus:ring-4 focus:ring-[#8F7CFF]/10 focus:border-[#8F7CFF]/40 text-sm font-medium transition-all"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          {['Date: Today', 'Role: All', 'Action: All', 'Risk: High'].map((f) => (
            <button key={f} className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/50 border border-slate-200/60 hover:bg-white transition-colors text-sm font-bold text-slate-600 whitespace-nowrap">
              {f === 'Risk: High' && <Filter className="w-4 h-4" />}
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* LEFT: Timeline */}
        <div className="flex-1 bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 min-h-[600px]">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#8F7CFF]" />
            Activity Timeline
          </h3>
          
          <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-slate-200">
            {isLogsLoading ? (
              [1, 2, 3].map((i) => <div key={i} className="ml-12 h-24 bg-white/40 rounded-2xl animate-pulse" />)
            ) : (
              logs?.map((log) => (
                <div key={log.id} className="relative pl-12 group">
                  <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center bg-white shadow-sm z-10 ${
                    log.riskLevel === 'Critical' || log.riskLevel === 'High' ? 'text-[#FF7A7A]' : 'text-slate-400'
                  }`}>
                    {log.actor.avatar ? (
                      <img src={log.actor.avatar} alt="" className="w-full h-full rounded-full" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>

                  <div 
                    onClick={() => setSelectedLog(log)}
                    className={`bg-white border p-5 rounded-2xl cursor-pointer transition-all hover:shadow-[0_8px_30px_rgba(143,124,255,0.08)] ${
                      selectedLog?.id === log.id ? 'border-[#8F7CFF] shadow-[0_4px_20px_rgba(143,124,255,0.12)]' : 'border-slate-100 hover:border-[#8F7CFF]/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800">{log.action}</span>
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${getRiskColor(log.riskLevel)}`}>
                            {log.riskLevel} Risk
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-slate-500">
                          <span className="text-slate-700 font-bold">{log.actor.name}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">{getModuleIcon(log.module)} {log.module}</span>
                          {log.society && (
                            <>
                              <span>•</span>
                              <span>{log.society}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-50 text-xs font-medium text-slate-500">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Globe className="w-3.5 h-3.5 text-slate-400" /> {log.ip}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <Laptop className="w-3.5 h-3.5 text-slate-400" /> {log.browser}
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {log.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT: Security Alerts & Detail Drawer */}
        <div className="w-full xl:w-[400px] shrink-0 flex flex-col gap-6">
          
          <AnimatePresence mode="wait">
            {selectedLog ? (
              <motion.div
                key="details"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0F172A] rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[800px]"
              >
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#3DD9FF]" />
                    <span className="text-sm font-bold text-white font-mono">Payload Preview</span>
                  </div>
                  <button onClick={() => setSelectedLog(null)} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#8F7CFF] uppercase tracking-wider mb-2 block">Event Meta</span>
                    <pre className="p-3 bg-[#1E293B] rounded-xl text-xs text-slate-300 font-mono overflow-x-auto">
                      ID: {selectedLog.id}
                      <br/>Timestamp: {selectedLog.timestamp}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#3DD9FF] uppercase tracking-wider mb-2 block">Request</span>
                    <pre className="p-3 bg-[#1E293B] rounded-xl text-xs text-slate-300 font-mono overflow-x-auto">
                      {JSON.stringify(selectedLog.details.request, null, 2)}
                    </pre>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#72F1D1] uppercase tracking-wider mb-2 block">Response</span>
                    <pre className="p-3 bg-[#1E293B] rounded-xl text-xs text-slate-300 font-mono overflow-x-auto">
                      {JSON.stringify(selectedLog.details.response, null, 2)}
                    </pre>
                  </div>
                  {selectedLog.details.affectedRecords.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-[#FFD166] uppercase tracking-wider mb-2 block">Affected Records</span>
                      <pre className="p-3 bg-[#1E293B] rounded-xl text-xs text-slate-300 font-mono overflow-x-auto">
                        {JSON.stringify(selectedLog.details.affectedRecords, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="alerts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-[#FF7A7A]" />
                    Security Alerts
                  </h3>
                  <button className="text-sm font-bold text-[#8F7CFF] hover:text-[#7b68ee]">View All</button>
                </div>

                <div className="space-y-4">
                  {alerts?.map((alert) => (
                    <div key={alert.id} className="p-4 bg-white border border-[#FF7A7A]/20 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#FF7A7A] to-[#FFD166]" />
                      <div className="pl-2">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{alert.title}</h4>
                          <span className="text-xs font-medium text-slate-400 shrink-0">{alert.time}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-500 mb-2">{alert.description}</p>
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          alert.severity === 'Critical' ? 'bg-[#FF7A7A]/10 text-[#FF7A7A]' :
                          alert.severity === 'High' ? 'bg-[#FFD166]/10 text-[#D49F1C]' :
                          'bg-[#3DD9FF]/10 text-[#00A1C9]'
                        }`}>
                          {alert.severity} Severity
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#8F7CFF]/10 to-[#3DD9FF]/10 border border-[#8F7CFF]/20 flex items-start gap-3">
                  <Eye className="w-5 h-5 text-[#8F7CFF] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 mb-1">Proactive Monitoring Active</h5>
                    <p className="text-xs font-medium text-slate-600">AI is analyzing 2,450 events/min for anomalous behavior.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
}

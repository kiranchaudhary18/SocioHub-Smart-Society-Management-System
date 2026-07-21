import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { visitorService } from "../../services/visitor.service";
import type { VisitorPass } from "../../services/visitor.service";
import { ArrowLeft, Printer, Download, QrCode, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatusBadge } from "../../components/ui/StatusBadge";

export default function VisitorPassesPage() {
  const [passes, setPasses] = useState<VisitorPass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    visitorService.getVisitorPasses().then(data => {
      setPasses(data);
      setIsLoading(false);
    });
  }, []);

  const filteredPasses = passes.filter(p => 
    `${p.visitorName} ${p.residentName} ${p.flat}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <Link to="/admin/visitors" className="text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2 mb-2 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Visitors
          </Link>
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-3">
            Visitor Passes
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage, print and verify digital visitor passes.</p>
        </div>
        <div className="flex items-center gap-3">
          <ActionButton variant="primary" leftIcon={<QrCode className="w-4 h-4" />}>Scan Pass</ActionButton>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search passes by visitor, resident or flat..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100 w-full md:w-auto">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Pass Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="bg-white/40 h-80 rounded-3xl animate-pulse" />)}
        </div>
      ) : filteredPasses.length === 0 ? (
        <div className="w-full h-64 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60">
          <QrCode className="w-12 h-12 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No Passes Found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPasses.map((pass, i) => (
              <motion.div
                key={pass.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-slate-200 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col relative group"
              >
                {/* Pass Header */}
                <div className="bg-slate-800 p-5 pb-12 flex justify-between items-start relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="flex flex-col relative z-10">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Visitor Pass</span>
                    <span className="text-white font-black text-xl tracking-wider">{pass.id.toUpperCase()}</span>
                  </div>
                  <StatusBadge variant={pass.status === 'ACTIVE' ? 'success' : 'neutral'}>{pass.status}</StatusBadge>
                </div>

                {/* Pass Body (Overlapping) */}
                <div className="bg-white mx-4 -mt-8 rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-5 relative z-20">
                  <div className="w-24 h-24 bg-white border-2 border-slate-100 p-1 rounded-xl shrink-0">
                    <img src={pass.qrCodeUrl} alt="QR Code" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visitor</span>
                      <span className="text-slate-800 font-bold truncate text-base">{pass.visitorName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visiting</span>
                      <span className="text-slate-600 font-bold truncate text-sm">{pass.residentName} ({pass.flat})</span>
                    </div>
                  </div>
                </div>

                {/* Dates & Actions */}
                <div className="p-5 pt-4 flex flex-col gap-4 flex-1">
                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valid From</span>
                      <span className="text-slate-700 font-bold text-xs">{pass.validFrom}</span>
                    </div>
                    <div className="w-px h-6 bg-slate-200" />
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valid Until</span>
                      <span className="text-slate-700 font-bold text-xs">{pass.validUntil}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-200">
                      <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#8F7CFF]/10 hover:bg-[#8F7CFF] text-[#8F7CFF] hover:text-white font-bold text-sm transition-colors border border-transparent">
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </div>

                {/* Perforated Edge Decoration */}
                <div className="absolute left-[-8px] top-[108px] w-4 h-4 bg-slate-50 rounded-full border-r border-slate-200 z-30" />
                <div className="absolute right-[-8px] top-[108px] w-4 h-4 bg-slate-50 rounded-full border-l border-slate-200 z-30" />

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

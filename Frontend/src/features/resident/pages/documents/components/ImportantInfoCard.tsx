import { ShieldAlert, Info, Clock, Mail } from "lucide-react";

export function ImportantInfoCard() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 shadow-xl text-white relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
      
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex-1 flex flex-col relative z-10 w-full">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-heading font-black text-white">Document Access Policy</h3>
        </div>
        <p className="text-sm font-medium text-slate-300 leading-relaxed max-w-3xl">
          Documents available in this workspace are strictly for internal society use. Please do not share sensitive financial or legal documents with external parties without prior committee approval. All downloads are logged for security purposes.
        </p>
      </div>

      <div className="shrink-0 relative z-10 flex flex-col gap-3 w-full md:w-auto">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
          <Clock className="w-5 h-5 text-blue-300" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Office Timings</span>
            <span className="text-sm font-bold text-white">10:00 AM - 6:00 PM</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
          <Mail className="w-5 h-5 text-blue-300" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Support</span>
            <span className="text-sm font-bold text-white">admin@society.com</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}

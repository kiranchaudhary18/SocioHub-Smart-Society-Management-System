import { ShieldAlert, AlertCircle } from "lucide-react";

export function VisitorGuidelines() {
  return (
    <div className="bg-[#FFD166]/10 border border-[#FFD166]/20 rounded-[32px] p-6 flex flex-col gap-4 h-full">
      <div className="flex items-center gap-2 border-b border-amber-100/50 pb-3">
        <ShieldAlert className="w-5 h-5 text-amber-500" />
        <h4 className="text-sm font-bold text-slate-800">Visitor Guidelines</h4>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            Visitor passes expire automatically after the scheduled date and time.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            Security verification at the main gate is mandatory. Visitors must carry valid identification.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-900 leading-relaxed">
            For overnight parking, please inform the management office in advance.
          </p>
        </div>
      </div>
    </div>
  );
}

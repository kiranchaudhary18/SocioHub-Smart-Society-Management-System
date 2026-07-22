import { Info, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function UpdateInfoCard() {
  return (
    <div className="bg-[#8F7CFF]/5 border border-[#8F7CFF]/20 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-heading font-black text-slate-800 flex items-center gap-2">
          <Info className="w-5 h-5 text-[#8F7CFF]" /> Need to update your family information?
        </h4>
        <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
          Family member information is managed and verified by your Society Administrator for security purposes. If you need to add, remove or update any family member, please contact your Society Office.
        </p>
      </div>
      <Link 
        to="/resident/community/notices" // This could point to a helpdesk or office contact page
        className="shrink-0 px-6 py-3 bg-[#8F7CFF] hover:bg-[#7b68ee] text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
      >
        Contact Society Office <ExternalLink className="w-4 h-4" />
      </Link>
    </div>
  );
}

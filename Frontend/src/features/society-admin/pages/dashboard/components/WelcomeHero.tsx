import { useSession } from "@/hooks/useSession";
import { ActionButton } from "../../../components/ui/ActionButton";
import { Megaphone, CheckCircle2, Zap, CloudSun } from "lucide-react";
import { format } from "date-fns";

export function WelcomeHero() {
  const { user } = useSession();
  const currentDate = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <div className="relative w-full overflow-hidden rounded-[32px] bg-white border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] p-8 sm:p-10 mb-6">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#3DD9FF]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-32 w-64 h-64 bg-gradient-to-tl from-[#8F7CFF]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex flex-col">
          <h1 className="text-4xl sm:text-5xl font-heading font-black text-slate-800 tracking-tight mb-3">
            Good Morning, <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] capitalize">{user?.firstName || 'Kiran'}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1.5"><CloudSun className="w-4 h-4 text-amber-500" /> 31°C Mostly Sunny</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
            <span>{currentDate}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
            <span>Prestige Falcon City</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-white/50 backdrop-blur-md p-2 rounded-[24px] border border-white">
          <ActionButton variant="primary" leftIcon={<Megaphone className="w-4 h-4" />}>
            Create Notice
          </ActionButton>
          <ActionButton variant="secondary" leftIcon={<CheckCircle2 className="w-4 h-4 text-[#72F1D1]" />}>
            Approve Resident
          </ActionButton>
          <ActionButton variant="secondary" leftIcon={<CheckCircle2 className="w-4 h-4 text-[#8F7CFF]" />}>
            Approve Visitor
          </ActionButton>
          <ActionButton variant="outline" leftIcon={<Zap className="w-4 h-4 text-[#FFD166]" />}>
            Generate Bills
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  breadcrumbs: { label: string; path?: string }[];
}

export function PlaceholderPage({ title, subtitle, breadcrumbs }: Props) {
  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
          <Link to="/resident" className="hover:text-[#8F7CFF] transition-colors">Resident</Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              {crumb.path ? (
                <Link to={crumb.path} className="hover:text-[#8F7CFF] transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-600">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">{title}</h1>
        <p className="text-slate-500 font-medium">{subtitle}</p>
      </div>

      {/* Empty Workspace */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full min-h-[400px] flex-1 rounded-[24px] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center p-12 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <span className="text-2xl font-black text-slate-300">🚧</span>
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">Workspace in Development</h3>
        <p className="text-slate-500 font-medium max-w-md">
          The {title} module is currently being built. This space will soon house enterprise-grade tools and analytics for managing this workflow.
        </p>
      </motion.div>
    </div>
  );
}

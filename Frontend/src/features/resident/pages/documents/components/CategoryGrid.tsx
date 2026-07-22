import { Scale, Wrench, FileText, Briefcase, ClipboardList, Newspaper } from "lucide-react";
import type { DocumentCategory } from "../../../services/documents.service";

interface Props {
  categories: DocumentCategory[];
  selectedCategory: string;
  onSelect: (categoryName: string) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case "Scale": return Scale;
    case "Wrench": return Wrench;
    case "FileText": return FileText;
    case "Briefcase": return Briefcase;
    case "ClipboardList": return ClipboardList;
    case "Newspaper": return Newspaper;
    default: return FileText;
  }
};

export function CategoryGrid({ categories, selectedCategory, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-black text-slate-800">Categories</h3>
        {selectedCategory !== "ALL" && (
          <button 
            onClick={() => onSelect("ALL")}
            className="text-sm font-bold text-[#8F7CFF] hover:text-[#7261D1] transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(cat => {
          const Icon = getIcon(cat.iconName);
          const isSelected = selectedCategory === cat.name;

          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.name)}
              className={`
                flex flex-col items-center justify-center gap-3 p-4 rounded-[24px] border transition-all text-center group relative overflow-hidden
                ${isSelected 
                  ? 'bg-gradient-to-br from-[#8F7CFF] to-[#604CE8] border-transparent text-white shadow-md scale-105' 
                  : 'bg-white/60 backdrop-blur-xl border-white/80 hover:border-[#8F7CFF]/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:-translate-y-1 text-slate-700'
                }
              `}
            >
              {isSelected && (
                 <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 blur-[20px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              )}
              
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors
                ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-[#8F7CFF]/10 group-hover:text-[#8F7CFF]'}
              `}>
                <Icon className="w-5 h-5" />
              </div>
              
              <div className="flex flex-col gap-1 items-center">
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-700'}`}>{cat.name}</span>
                <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {cat.count} files
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
}

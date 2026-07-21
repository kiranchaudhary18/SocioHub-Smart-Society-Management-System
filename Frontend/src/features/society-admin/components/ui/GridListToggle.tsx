import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface GridListToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
  className?: string;
}

export function GridListToggle({ view, onChange, className }: GridListToggleProps) {
  return (
    <div className={cn("flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm", className)}>
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "p-2 rounded-lg transition-all",
          view === "grid" 
            ? "bg-slate-100 text-slate-900 shadow-sm" 
            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
        )}
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        onClick={() => onChange("list")}
        className={cn(
          "p-2 rounded-lg transition-all",
          view === "list" 
            ? "bg-slate-100 text-slate-900 shadow-sm" 
            : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
        )}
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}

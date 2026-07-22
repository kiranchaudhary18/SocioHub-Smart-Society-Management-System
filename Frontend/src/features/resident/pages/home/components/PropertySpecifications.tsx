import { motion } from "framer-motion";
import { Ruler, Maximize2, MoveDiagonal, Compass, BedDouble, Bath, LayoutGrid, ChefHat, Sofa } from "lucide-react";
import type { PropertySpecifications as IPropertySpecs } from "../../../services/myHome.service";

interface Props {
  specs: IPropertySpecs;
}

export function PropertySpecifications({ specs }: Props) {
  const items = [
    { label: "BHK Type", value: specs.bhk, icon: LayoutGrid, color: "text-[#3DD9FF]" },
    { label: "Built-up Area", value: specs.builtUpArea, icon: Maximize2, color: "text-[#8F7CFF]" },
    { label: "Carpet Area", value: specs.carpetArea, icon: MoveDiagonal, color: "text-[#72F1D1]" },
    { label: "Facing", value: specs.facing, icon: Compass, color: "text-[#FFD166]" },
    { label: "Bedrooms", value: specs.bedrooms.toString(), icon: BedDouble, color: "text-[#FF5DA2]" },
    { label: "Bathrooms", value: specs.bathrooms.toString(), icon: Bath, color: "text-[#3DD9FF]" },
    { label: "Balconies", value: specs.balconies.toString(), icon: LayoutGrid, color: "text-[#8F7CFF]" },
    { label: "Kitchen", value: specs.kitchenType, icon: ChefHat, color: "text-[#FFD166]" },
    { label: "Furnishing", value: specs.furnishedStatus, icon: Sofa, color: "text-[#72F1D1]" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
        <div className="w-12 h-12 rounded-xl bg-[#3DD9FF]/10 text-[#00a3cc] flex items-center justify-center">
          <Ruler className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Specifications</h3>
          <p className="text-sm font-medium text-slate-500">Architectural and interior details</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 ${item.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-white transition-all shadow-sm`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</span>
              <span className="text-sm font-black text-slate-800 leading-tight">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

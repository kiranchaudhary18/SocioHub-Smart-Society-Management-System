import { useState } from "react";
import { Plus, Upload, Calendar, Clock, MapPin, AlignLeft, Info, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ComplaintCategory, ComplaintPriority } from "../../../services/complaint.service";

interface Props {
  onSubmit: (data: any) => Promise<void>;
}

export function RaiseComplaintForm({ onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successId, setSuccessId] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Maintenance" as ComplaintCategory,
    priority: "MEDIUM" as ComplaintPriority,
    location: "",
    description: "",
    preferredDate: "",
    preferredTime: "",
  });

  const categories: ComplaintCategory[] = ["Maintenance", "Electrical", "Plumbing", "Water Supply", "Security", "Cleaning", "Parking", "Lift", "Noise", "Other"];
  const priorities: ComplaintPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        hasAttachment: false // Mocking no attachment upload for now
      });
      // Mock Success ID for toast
      setSuccessId(`CMP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        title: "", category: "Maintenance", priority: "MEDIUM", location: "", description: "", preferredDate: "", preferredTime: ""
      });

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "", category: "Maintenance", priority: "MEDIUM", location: "", description: "", preferredDate: "", preferredTime: ""
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 lg:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] relative overflow-hidden">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
          <Plus className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Raise New Complaint</h3>
          <p className="text-sm font-medium text-slate-500">Provide details so our team can assist you quickly.</p>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-6 right-6 left-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between z-10 shadow-lg shadow-emerald-500/10"
          >
            <div className="flex items-center gap-3 text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="font-bold">Complaint Submitted Successfully!</span>
                <span className="text-xs font-medium opacity-80">Reference ID: {successId}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Complaint Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Info className="w-4 h-4" />
              </div>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Water leaking in kitchen"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input 
                required
                type="text" 
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. Tower B Basement Parking"
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value as ComplaintCategory})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all appearance-none cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</label>
            <select 
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value as ComplaintPriority})}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all appearance-none cursor-pointer"
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        {/* Row 3 - Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</label>
          <div className="relative">
            <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
              <AlignLeft className="w-4 h-4" />
            </div>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the issue in detail..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all resize-none"
            />
          </div>
        </div>

        {/* Row 4 - Dates & Attachments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Visit Date (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input 
                type="date" 
                value={formData.preferredDate}
                onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Time (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Clock className="w-4 h-4" />
              </div>
              <input 
                type="time" 
                value={formData.preferredTime}
                onChange={e => setFormData({...formData, preferredTime: e.target.value})}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-2 focus:ring-[#8F7CFF]/20 transition-all"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attachment</label>
            <button type="button" className="w-full h-[46px] border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:bg-slate-50 hover:border-slate-300 transition-colors">
              <Upload className="w-4 h-4" /> Upload Image
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 mt-4 pt-6 border-t border-slate-100">
          <button 
            type="button" 
            onClick={handleReset}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Reset
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Complaint"}
          </button>
        </div>

      </form>

    </div>
  );
}

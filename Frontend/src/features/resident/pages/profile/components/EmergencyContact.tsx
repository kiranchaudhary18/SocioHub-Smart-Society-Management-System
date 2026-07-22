import { useState } from "react";
import { HeartPulse, Edit2, Phone, Mail, MapPin, X, Save } from "lucide-react";
import type { EmergencyContact as EmergencyContactType } from "../../../services/profile.service";

interface Props {
  contact: EmergencyContactType;
  onSave: (data: EmergencyContactType) => Promise<void>;
}

export function EmergencyContact({ contact, onSave }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<EmergencyContactType>(contact);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black text-slate-800">Emergency Contact</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Primary contact in case of an emergency.</p>
          </div>
        </div>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" /> Update
          </button>
        )}
      </div>

      <div className="p-6 md:p-8 relative">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-red-400 focus:ring-red-400 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Relationship</label>
                <input required type="text" value={formData.relationship} onChange={e => setFormData({...formData, relationship: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-red-400 focus:ring-red-400 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <input required type="text" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-red-400 focus:ring-red-400 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-red-400 focus:ring-red-400 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Address</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:border-red-400 focus:ring-red-400 outline-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => { setIsEditing(false); setFormData(contact); }} className="px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm flex items-center gap-2">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm shadow-sm flex items-center gap-2">
                <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Contact"}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="w-full md:w-64 bg-red-50/50 border border-red-100 rounded-2xl p-6 flex flex-col items-center text-center shrink-0">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 text-2xl font-black mb-4">
                {contact.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{contact.name}</h3>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-wider mt-2">
                {contact.relationship}
              </span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 gap-4 w-full">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phone Number</span>
                  <span className="text-sm font-bold text-slate-800">{contact.phoneNumber}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <span className="text-sm font-bold text-slate-800">{contact.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</span>
                  <span className="text-sm font-bold text-slate-800">{contact.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { UserCircle, Save, RotateCcw, CheckCircle2 } from "lucide-react";
import type { ResidentProfile } from "../../../services/profile.service";

interface Props {
  profile: ResidentProfile;
  onSave: (data: Partial<ResidentProfile>) => Promise<void>;
}

export function PersonalInformation({ profile, onSave }: Props) {
  const [formData, setFormData] = useState<Partial<ResidentProfile>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      alternateNumber: profile.alternateNumber,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      occupation: profile.occupation,
      bloodGroup: profile.bloodGroup,
      nationality: profile.nationality,
      languagePreference: profile.languagePreference,
    });
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = () => {
    setFormData({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      mobileNumber: profile.mobileNumber,
      alternateNumber: profile.alternateNumber,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      occupation: profile.occupation,
      bloodGroup: profile.bloodGroup,
      nationality: profile.nationality,
      languagePreference: profile.languagePreference,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    mobileNumber: profile.mobileNumber,
    alternateNumber: profile.alternateNumber,
    dateOfBirth: profile.dateOfBirth,
    gender: profile.gender,
    occupation: profile.occupation,
    bloodGroup: profile.bloodGroup,
    nationality: profile.nationality,
    languagePreference: profile.languagePreference,
  });

  const InputField = ({ label, name, type = "text", required = false }: any) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label} {required && <span className="text-red-500">*</span>}</label>
      <input 
        type={type}
        name={name}
        value={formData[name as keyof typeof formData] || ""}
        onChange={handleChange}
        required={required}
        className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all placeholder:text-slate-400"
      />
    </div>
  );

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <UserCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-black text-slate-800">Personal Information</h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Update your personal details and how we can reach you.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" required />
          <InputField label="Last Name" name="lastName" required />
          <InputField label="Email Address" name="email" type="email" required />
          <InputField label="Mobile Number" name="mobileNumber" required />
          <InputField label="Alternate Number" name="alternateNumber" />
          <InputField label="Date of Birth" name="dateOfBirth" type="date" />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</label>
            <select 
              name="gender" 
              value={formData.gender || ""} 
              onChange={handleChange}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <InputField label="Occupation" name="occupation" />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Blood Group</label>
            <select 
              name="bloodGroup" 
              value={formData.bloodGroup || ""} 
              onChange={handleChange}
              className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8F7CFF]/50 focus:border-[#8F7CFF] transition-all"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <InputField label="Nationality" name="nationality" />
          <InputField label="Language Preference" name="languagePreference" />
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
          {showSuccess && (
            <span className="text-sm font-bold text-emerald-500 flex items-center gap-1.5 mr-auto">
              <CheckCircle2 className="w-4 h-4" /> Changes saved successfully
            </span>
          )}
          
          <button 
            type="button" 
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button 
            type="submit"
            disabled={!hasChanges || isSaving}
            className="px-8 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}

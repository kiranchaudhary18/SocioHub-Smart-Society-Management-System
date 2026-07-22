import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, Droplet, Briefcase, Calendar, ShieldCheck, Contact } from "lucide-react";
import type { FamilyMember } from "../../../../services/myHome.service";

interface Props {
  member: FamilyMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MemberDetailsDrawer({ member, isOpen, onClose }: Props) {
  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%", opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.5 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col border-l border-slate-100 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <h2 className="text-lg font-heading font-black text-slate-800">Member Details</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Hero */}
            <div className="p-8 flex flex-col items-center border-b border-slate-50 bg-slate-50/50">
              <img src={member.photoUrl} alt={member.fullName} className="w-24 h-24 rounded-3xl object-cover shadow-md border-2 border-white mb-4 bg-white" />
              <h3 className="text-2xl font-black text-slate-800">{member.fullName}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full">{member.relationship}</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                  member.status === "VERIFIED" ? "bg-emerald-100 text-emerald-700" : 
                  member.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {member.status}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="p-6 flex flex-col gap-6">
              
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Info</h4>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Gender & Age</span>
                    <span className="text-sm font-bold text-slate-800">{member.gender}, {member.age} years</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Date of Birth</span>
                    <span className="text-sm font-bold text-slate-800">{new Date(member.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Blood Group</span>
                    <span className="text-sm font-bold text-slate-800">{member.bloodGroup}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact & Work</h4>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Phone Number</span>
                    <span className="text-sm font-bold text-slate-800">{member.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Email Address</span>
                    <span className="text-sm font-bold text-slate-800">{member.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Occupation</span>
                    <span className="text-sm font-bold text-slate-800">{member.occupation}</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Additional Data</h4>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                    <Contact className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Emergency Contact</span>
                    <span className="text-sm font-bold text-slate-800">{member.emergencyContact}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400">Member Since</span>
                    <span className="text-sm font-bold text-slate-800">{member.memberSince}</span>
                  </div>
                </div>
              </div>

              {member.remarks && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Admin Remarks</span>
                  <p className="text-sm font-medium text-slate-700 leading-relaxed">{member.remarks}</p>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

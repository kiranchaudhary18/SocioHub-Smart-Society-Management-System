import { Eye, Users } from "lucide-react";
import type { FamilyMember } from "../../../../services/myHome.service";
import { cn } from "@/lib/utils";

interface Props {
  members: FamilyMember[];
  onViewDetails: (member: FamilyMember) => void;
}

export function FamilyMembersTable({ members, onViewDetails }: Props) {
  if (members.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-12 shadow-sm text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <Users className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">No Members Found</h3>
        <p className="text-sm font-medium text-slate-500">There are no family members matching your current filters.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Member Details</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Relationship</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Age/Gender</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-4">
                    <img src={member.photoUrl} alt={member.fullName} className="w-12 h-12 rounded-2xl bg-slate-100 object-cover shadow-sm border border-slate-200/50" />
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-800">{member.fullName}</span>
                      <span className="text-xs font-medium text-slate-500">{member.id}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{member.relationship}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{member.age} yrs</span>
                    <span className="text-xs font-medium text-slate-500">{member.gender}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">{member.phone}</span>
                    <span className="text-xs font-medium text-slate-500 truncate max-w-[150px]">{member.email}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border",
                    member.status === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                    member.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-100" :
                    "bg-red-50 text-red-600 border-red-100"
                  )}>
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button 
                    onClick={() => onViewDetails(member)}
                    className="inline-flex items-center justify-center px-4 py-2 bg-white border border-slate-200 hover:border-[#8F7CFF] text-slate-600 hover:text-[#8F7CFF] hover:bg-[#8F7CFF]/5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <Eye className="w-4 h-4 mr-2" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

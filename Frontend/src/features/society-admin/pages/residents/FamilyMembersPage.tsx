import { useState, useEffect } from "react";
import type { FamilyMember } from "../../services/resident.service";
import { residentService } from "../../services/resident.service";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, Phone, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "../../components/ui/StatusBadge";

export default function FamilyMembersPage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    residentService.getFamilyMembers().then(data => {
      setMembers(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <Link to="/admin/residents" className="text-[#8F7CFF] hover:underline font-bold text-sm flex items-center gap-2 mb-2 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Residents
          </Link>
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight flex items-center gap-3">
            Family Members
          </h1>
          <p className="text-slate-500 font-medium mt-1">Directory of all family members and dependents.</p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden">
        
        {isLoading ? (
          <div className="p-6 animate-pulse flex flex-col gap-4">
            <div className="h-12 bg-slate-100 rounded-2xl" />
            <div className="h-16 bg-slate-100 rounded-2xl" />
            <div className="h-16 bg-slate-100 rounded-2xl" />
          </div>
        ) : members.length === 0 ? (
          <div className="w-full h-64 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No Family Members Found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-5 whitespace-nowrap">Name</th>
                  <th className="px-6 py-5 whitespace-nowrap">Associated Resident</th>
                  <th className="px-6 py-5 whitespace-nowrap">Relation</th>
                  <th className="px-6 py-5 whitespace-nowrap">Contact</th>
                  <th className="px-6 py-5 whitespace-nowrap">Status</th>
                  <th className="px-6 py-5 whitespace-nowrap text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <motion.tr 
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group border-b border-slate-50 hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F7CFF]/10 to-[#3DD9FF]/10 flex items-center justify-center font-bold text-[#8F7CFF] border border-white shadow-sm">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800">{member.name}</span>
                          <span className="text-xs font-medium text-slate-500">{member.age} yrs old</span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/admin/residents/${member.residentId}`} className="text-sm font-bold text-[#8F7CFF] hover:underline">
                        View Primary Resident
                      </Link>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 font-black text-xs tracking-wider rounded-lg border border-slate-200 uppercase">
                        {member.relation}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.phone ? (
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {member.phone}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400 font-medium italic">Not provided</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant={member.status === 'ACTIVE' ? 'success' : 'neutral'}>{member.status}</StatusBadge>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 inline-flex items-center justify-center text-slate-400 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

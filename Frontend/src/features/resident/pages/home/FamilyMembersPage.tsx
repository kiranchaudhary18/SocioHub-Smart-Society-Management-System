import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { myHomeService, type FamilyMember } from "../../services/myHome.service";
import { FamilySummaryKPIs } from "./components/family/FamilySummaryKPIs";
import { FamilyToolbar } from "./components/family/FamilyToolbar";
import { FamilyMembersTable } from "./components/family/FamilyMembersTable";
import { MemberDetailsDrawer } from "./components/family/MemberDetailsDrawer";
import { UpdateInfoCard } from "./components/family/UpdateInfoCard";
import { FamilyRightPanel } from "./components/family/FamilyRightPanel";
import { Loader2, Users } from "lucide-react";

export default function FamilyMembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [relationshipFilter, setRelationshipFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [ageFilter, setAgeFilter] = useState("ALL");
  
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['familyMembersData'],
    queryFn: async () => {
      const [summary, members] = await Promise.all([
        myHomeService.getFamilySummary(),
        myHomeService.getFamilyMembers()
      ]);
      return { summary, members };
    }
  });

  const filteredMembers = useMemo(() => {
    if (!data?.members) return [];
    return data.members.filter(member => {
      // Search
      const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Relationship
      let matchesRel = true;
      if (relationshipFilter !== "ALL") {
        if (relationshipFilter === "Other") {
          matchesRel = !["Spouse", "Child", "Parent", "Sibling"].includes(member.relationship);
        } else {
          matchesRel = member.relationship.toLowerCase().includes(relationshipFilter.toLowerCase());
        }
      }

      // Status
      const matchesStatus = statusFilter === "ALL" || member.status === statusFilter;

      // Age Group
      let matchesAge = true;
      if (ageFilter === "CHILD") matchesAge = member.age < 18;
      if (ageFilter === "ADULT") matchesAge = member.age >= 18 && member.age < 60;
      if (ageFilter === "SENIOR") matchesAge = member.age >= 60;

      return matchesSearch && matchesRel && matchesStatus && matchesAge;
    });
  }, [data?.members, searchTerm, relationshipFilter, statusFilter, ageFilter]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setRelationshipFilter("ALL");
    setStatusFilter("ALL");
    setAgeFilter("ALL");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading family records...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load family records</h2>
        <p className="text-sm text-slate-500 max-w-md">There was a problem connecting to the server. Please check your connection and try again.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Family Members</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">View all family members registered under your residence.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {data.members.length > 0 ? (
            <>
              <FamilySummaryKPIs summary={data.summary} />
              <FamilyToolbar 
                searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                relationshipFilter={relationshipFilter} setRelationshipFilter={setRelationshipFilter}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                ageFilter={ageFilter} setAgeFilter={setAgeFilter}
                onReset={handleResetFilters}
              />
              <FamilyMembersTable 
                members={filteredMembers} 
                onViewDetails={(member) => setSelectedMember(member)} 
              />
              <UpdateInfoCard />
            </>
          ) : (
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-16 shadow-sm text-center flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No Family Members Registered</h3>
              <p className="text-sm font-medium text-slate-500 max-w-md mb-8">
                There are currently no family members registered to this flat. To add family members, you must contact your society administrator.
              </p>
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-sm transition-colors">
                Contact Society Office
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <FamilyRightPanel />
          </div>
        </div>

      </div>

      <MemberDetailsDrawer 
        member={selectedMember} 
        isOpen={!!selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />

    </div>
  );
}

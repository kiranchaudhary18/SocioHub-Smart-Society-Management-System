import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { complaintService, type Complaint } from "../../services/complaint.service";
import { ComplaintKPIs } from "./components/ComplaintKPIs";
import { RaiseComplaintForm } from "./components/RaiseComplaintForm";
import { ComplaintsTable } from "./components/ComplaintsTable";
import { ComplaintDetailsDrawer } from "./components/ComplaintDetailsDrawer";
import { ComplaintsRightSidebar } from "./components/ComplaintsRightSidebar";
import { Loader2 } from "lucide-react";

export default function ComplaintsPage() {
  const queryClient = useQueryClient();
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const raiseFormRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['complaintsData'],
    queryFn: async () => {
      const [kpis, complaints] = await Promise.all([
        complaintService.getComplaintKPIs(),
        complaintService.getComplaints()
      ]);
      return { kpis, complaints };
    }
  });

  const submitMutation = useMutation({
    mutationFn: complaintService.submitComplaint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complaintsData'] });
    }
  });

  const scrollToRaiseForm = () => {
    raiseFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading helpdesk data...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load complaints</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Complaints</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Raise, track and manage complaints related to your residence.</p>
      </div>

      <ComplaintKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {/* Table */}
          <ComplaintsTable 
            complaints={data.complaints} 
            onViewDetails={setSelectedComplaint}
            onNewComplaint={scrollToRaiseForm}
          />
          
          {/* Form */}
          <div ref={raiseFormRef}>
            <RaiseComplaintForm 
              onSubmit={async (formData) => {
                await submitMutation.mutateAsync(formData);
              }} 
            />
          </div>
          
        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <ComplaintsRightSidebar />
          </div>
        </div>

      </div>

      <ComplaintDetailsDrawer 
        complaint={selectedComplaint} 
        isOpen={!!selectedComplaint} 
        onClose={() => setSelectedComplaint(null)} 
      />

    </div>
  );
}

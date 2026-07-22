import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityService } from "../../services/community.service";
import { PollsKPIs } from "./components/polls/PollsKPIs";
import { ActivePolls } from "./components/polls/ActivePolls";
import { SurveyCards } from "./components/polls/SurveyCards";
import { PastResults } from "./components/polls/PastResults";
import { PollsRightSidebar } from "./components/polls/PollsRightSidebar";
import { Loader2 } from "lucide-react";

export default function PollsPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      const [kpis, communityData] = await Promise.all([
        communityService.getPollKPIs(),
        communityService.getPolls()
      ]);
      return { kpis, ...communityData };
    }
  });

  const voteMutation = useMutation({
    mutationFn: ({ pollId, optionId }: { pollId: string, optionId: string }) => communityService.votePoll(pollId, optionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] });
    }
  });

  const handleVote = async (pollId: string, optionId: string) => {
    await voteMutation.mutateAsync({ pollId, optionId });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading polls & surveys...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load data</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Polls & Surveys</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Share your opinion and participate in society decisions.</p>
      </div>

      <PollsKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-12">
          
          <ActivePolls polls={data.polls} onVote={handleVote} />

          <SurveyCards surveys={data.surveys} />

          <PastResults polls={data.polls} />

        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <PollsRightSidebar />
          </div>
        </div>

      </div>
    </div>
  );
}

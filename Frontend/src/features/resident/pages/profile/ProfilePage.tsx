import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService, type ResidentProfile, type EmergencyContact } from "../../services/profile.service";
import { ProfileSummary } from "./components/ProfileSummary";
import { PersonalInformation } from "./components/PersonalInformation";
import { ResidenceInformation } from "./components/ResidenceInformation";
import { EmergencyContact as EmergencyContactCard } from "./components/EmergencyContact";
import { NotificationPreferences } from "./components/NotificationPreferences";
import { SecuritySettings } from "./components/SecuritySettings";
import { PrivacySettings } from "./components/PrivacySettings";
import { RecentActivity } from "./components/RecentActivity";
import { ProfileRightSidebar } from "./components/ProfileRightSidebar";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profileData'],
    queryFn: profileService.getProfile
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: Partial<ResidentProfile>) => profileService.updatePersonalInfo(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profileData'] })
  });

  const updateEmergencyMutation = useMutation({
    mutationFn: (data: EmergencyContact) => profileService.updateEmergencyContact(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profileData'] })
  });

  const updatePrefsMutation = useMutation({
    mutationFn: ({ key, value }: { key: any, value: boolean }) => profileService.updatePreferences(key, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profileData'] })
  });

  const updatePrivacyMutation = useMutation({
    mutationFn: ({ key, value }: { key: any, value: any }) => profileService.updatePrivacy(key, value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profileData'] })
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load profile</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-sm transition-all">
          Try Again
        </button>
      </div>
    );
  }

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">My Profile</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Manage your account, personal information and preferences.</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 xl:grid-cols-12 gap-8"
      >
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          <motion.div variants={itemVariants}>
            <ProfileSummary profile={data.profile} residence={data.residence} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PersonalInformation 
              profile={data.profile} 
              onSave={async (d) => { await updateProfileMutation.mutateAsync(d); }} 
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ResidenceInformation residence={data.residence} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <EmergencyContactCard 
              contact={data.emergency} 
              onSave={async (d) => { await updateEmergencyMutation.mutateAsync(d); }} 
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <NotificationPreferences 
              preferences={data.preferences} 
              onToggle={(key, value) => updatePrefsMutation.mutate({ key, value })}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SecuritySettings security={data.security} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PrivacySettings 
              privacy={data.privacy}
              onToggle={(key, value) => updatePrivacyMutation.mutate({ key, value })}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <RecentActivity activities={data.activity} />
          </motion.div>

        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <ProfileRightSidebar completion={data.completion} />
            </motion.div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}

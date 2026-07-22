import { motion } from "framer-motion";
import { Car, Building2, UserCircle, CalendarDays, Wallet, UserPlus, MessageSquareWarning, Dumbbell } from "lucide-react";
import type { ResidentProfile } from "../../../services/dashboard.service";
import { Link } from "react-router-dom";

interface Props {
  profile: ResidentProfile;
}

export function WelcomeHero({ profile }: Props) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full rounded-[32px] overflow-hidden bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] bg-gradient-to-bl from-[#8F7CFF] via-[#3DD9FF] to-transparent rounded-full blur-[80px]"
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row p-6 md:p-8 lg:p-10 gap-8 items-center lg:items-stretch">
        
        {/* Left: Profile Info */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left pt-2 pb-2">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-3">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-800 tracking-tight">{profile.name}</h2>
            <div className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md border border-white">
              {profile.type}
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-xl text-sm font-bold text-slate-700 border border-white shadow-sm">
              <Building2 className="w-4 h-4 text-[#8F7CFF]" />
              {profile.flatNumber}, {profile.tower}
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-xl text-sm font-bold text-slate-700 border border-white shadow-sm">
              <Car className="w-4 h-4 text-[#3DD9FF]" />
              {profile.parkingSlot}
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 rounded-xl text-sm font-bold text-slate-700 border border-white shadow-sm">
              <CalendarDays className="w-4 h-4 text-[#72F1D1]" />
              Since {profile.memberSince}
            </div>
          </div>
          
          <p className="mt-5 text-slate-500 font-medium text-sm flex items-center justify-center md:justify-start gap-1.5">
            <UserCircle className="w-4 h-4" /> Member of <span className="font-bold text-slate-700">{profile.societyName}</span>
          </p>
        </div>

        {/* Right: Quick Actions */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-white/40 pt-6 lg:pt-0 lg:pl-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 text-center lg:text-left">Quick Actions</p>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
            <Link to="/resident/payments" className="group flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white rounded-2xl transition-all border border-white/60 shadow-sm hover:shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#72F1D1]/20 text-[#00c49a] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Wallet className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Pay Dues</span>
            </Link>
            
            <Link to="/resident/visitors" className="group flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white rounded-2xl transition-all border border-white/60 shadow-sm hover:shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#3DD9FF]/20 text-[#00a3cc] flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserPlus className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Invite Visitor</span>
            </Link>
            
            <Link to="/resident/complaints" className="group flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white rounded-2xl transition-all border border-white/60 shadow-sm hover:shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#FF5DA2]/20 text-[#e63982] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquareWarning className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Raise Complaint</span>
            </Link>
            
            <Link to="/resident/amenities" className="group flex items-center gap-3 px-4 py-3 bg-white/60 hover:bg-white rounded-2xl transition-all border border-white/60 shadow-sm hover:shadow-md">
              <div className="w-8 h-8 rounded-xl bg-[#8BF178]/20 text-[#5bc946] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Dumbbell className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-slate-700">Book Amenity</span>
            </Link>
          </div>
        </div>
        
      </div>
    </motion.div>
  );
}

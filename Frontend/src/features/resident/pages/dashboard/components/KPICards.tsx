import { motion } from "framer-motion";
import { Wallet, MessageSquareWarning, Users, CalendarDays, Bell, PartyPopper } from "lucide-react";
import type { KPIData } from "../../../services/dashboard.service";
import { Link } from "react-router-dom";

interface Props {
  kpis: KPIData;
}

export function KPICards({ kpis }: Props) {
  const cards = [
    {
      title: "Maintenance Dues",
      value: `₹${kpis.outstandingMaintenance.toLocaleString()}`,
      subtitle: "Due by 5th Aug",
      icon: Wallet,
      color: "#FF7A7A",
      bgClass: "bg-[#FF7A7A]/10",
      textClass: "text-[#FF7A7A]",
      link: "/resident/payments",
    },
    {
      title: "Active Complaints",
      value: kpis.activeComplaints.toString(),
      subtitle: "2 In Progress",
      icon: MessageSquareWarning,
      color: "#FF5DA2",
      bgClass: "bg-[#FF5DA2]/10",
      textClass: "text-[#FF5DA2]",
      link: "/resident/complaints",
    },
    {
      title: "Today's Visitors",
      value: kpis.visitorsToday.toString(),
      subtitle: `${kpis.expectedVisitors} Expected`,
      icon: Users,
      color: "#FFD166",
      bgClass: "bg-[#FFD166]/10",
      textClass: "text-[#e6b84d]",
      link: "/resident/visitors",
    },
    {
      title: "My Bookings",
      value: kpis.upcomingBookings.toString(),
      subtitle: "Upcoming",
      icon: CalendarDays,
      color: "#8BF178",
      bgClass: "bg-[#8BF178]/10",
      textClass: "text-[#5bc946]",
      link: "/resident/amenities",
    },
    {
      title: "Unread Notices",
      value: kpis.unreadNotices.toString(),
      subtitle: "Check updates",
      icon: Bell,
      color: "#8F7CFF",
      bgClass: "bg-[#8F7CFF]/10",
      textClass: "text-[#8F7CFF]",
      link: "/resident/community/notices",
    },
    {
      title: "Upcoming Events",
      value: kpis.upcomingEvents.toString(),
      subtitle: "This month",
      icon: PartyPopper,
      color: "#3DD9FF",
      bgClass: "bg-[#3DD9FF]/10",
      textClass: "text-[#00a3cc]",
      link: "/resident/community/events",
    },
  ];

  const container: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
    >
      {cards.map((card, idx) => (
        <Link key={idx} to={card.link}>
          <motion.div 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group w-full bg-white/60 backdrop-blur-xl border border-white/80 p-5 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between h-full min-h-[140px]"
          >
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-2xl ${card.bgClass} ${card.textClass} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className="text-right">
                <span className="text-3xl font-heading font-black text-slate-800 tracking-tight leading-none">{card.value}</span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col">
              <span className="text-sm font-bold text-slate-700">{card.title}</span>
              <span className="text-xs font-medium text-slate-500 mt-1">{card.subtitle}</span>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}

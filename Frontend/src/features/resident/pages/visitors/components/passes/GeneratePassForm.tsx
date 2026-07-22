import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Download, Share2, Plus, User, Calendar, Clock, Car, FileText, CheckCircle2, Users } from "lucide-react";
import type { VisitorPass } from "../../../../services/visitor.service";
import { visitorService } from "../../../../services/visitor.service";

export function GeneratePassForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPass, setGeneratedPass] = useState<VisitorPass | null>(null);

  // Form State
  const [visitorName, setVisitorName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Guest");
  const [purpose, setPurpose] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [visitorsCount, setVisitorsCount] = useState(1);
  const [notes, setNotes] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const pass = await visitorService.generateVisitorPass({
        visitorName,
        phone,
        type,
        purpose,
        visitDate,
        expectedTime,
        vehicleNumber,
        visitorsCount,
        notes,
      });
      setGeneratedPass(pass);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setVisitorName("");
    setPhone("");
    setType("Guest");
    setPurpose("");
    setVisitDate("");
    setExpectedTime("");
    setVehicleNumber("");
    setVisitorsCount(1);
    setNotes("");
    setGeneratedPass(null);
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[32px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] h-full">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#8F7CFF]/10 text-[#8F7CFF] flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-black text-slate-800 tracking-tight">Generate Pass</h3>
          <p className="text-sm font-medium text-slate-500">Create a new visitor pass instantly</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!generatedPass ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleGenerate} 
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Visitor Name</label>
                <input required type="text" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} placeholder="Full Name" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Phone Number</label>
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9000000000" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Visitor Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all">
                  <option value="Guest">Guest</option>
                  <option value="Friend">Friend</option>
                  <option value="Family">Family</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Service">Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">Purpose</label>
                <input required type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g. Dinner, AC Repair" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Visit Date</label>
                <input required type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Expected Arrival</label>
                <input required type="time" value={expectedTime} onChange={(e) => setExpectedTime(e.target.value)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Car className="w-3.5 h-3.5"/> Vehicle Number (Optional)</label>
                <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} placeholder="e.g. KA-01-AB-1234" className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><Users className="w-3.5 h-3.5"/> Number of Visitors</label>
                <input required type="number" min="1" max="20" value={visitorsCount} onChange={(e) => setVisitorsCount(parseInt(e.target.value) || 1)} className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"><FileText className="w-3.5 h-3.5"/> Notes for Security (Optional)</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Leave any instructions for the security gate..." className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#8F7CFF] focus:ring-1 focus:ring-[#8F7CFF] transition-all resize-none" />
            </div>

            <div className="flex items-center gap-4 mt-2">
              <button 
                type="submit" 
                disabled={isGenerating}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Generate Pass"}
              </button>
              <button 
                type="button" 
                onClick={handleClear}
                disabled={isGenerating}
                className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-sm shadow-sm transition-colors"
              >
                Clear Form
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-6"
          >
            {/* QR Pass Preview Card */}
            <div className="w-full max-w-sm bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col">
              
              <div className="bg-[#8F7CFF] p-6 flex flex-col items-center text-center text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                  {generatedPass.status}
                </div>
                <CheckCircle2 className="w-12 h-12 mb-3 text-[#3DD9FF]" />
                <h4 className="text-xl font-black">{generatedPass.visitorName}</h4>
                <span className="text-sm font-medium opacity-90 mt-1">{generatedPass.type} • {generatedPass.purpose}</span>
              </div>

              <div className="p-8 flex flex-col items-center bg-slate-50 border-b border-slate-100 border-dashed">
                {/* Mock QR Code Pattern */}
                <div className="w-40 h-40 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                  <QrCode className="w-full h-full text-slate-800" strokeWidth={1} />
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-[0.2em] mt-4 uppercase">
                  {generatedPass.id}
                </span>
              </div>

              <div className="p-6 flex items-center justify-between bg-white text-center">
                <div className="flex flex-col items-center flex-1 border-r border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Date</span>
                  <span className="text-sm font-black text-slate-800 mt-0.5">{generatedPass.visitDate}</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time</span>
                  <span className="text-sm font-black text-slate-800 mt-0.5">{generatedPass.expectedTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-8 w-full max-w-sm">
              <button 
                onClick={handleClear}
                className="flex-1 py-3 bg-white border border-slate-200 hover:border-[#8F7CFF] hover:bg-[#8F7CFF]/5 text-slate-700 hover:text-[#8F7CFF] rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> New Pass
              </button>
              <button className="flex-1 py-3 bg-[#8F7CFF] hover:bg-[#7b68ee] text-white rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" /> Share Pass
              </button>
            </div>
            <button className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors">
              <Download className="w-3 h-3" /> Download as PDF
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

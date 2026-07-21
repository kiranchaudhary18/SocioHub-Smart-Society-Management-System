import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check, Building2, MapPin, User } from "lucide-react";
import { Link } from "react-router-dom";

const STEPS = [
  { id: 1, title: "Society Details", icon: Building2 },
  { id: 2, title: "Location", icon: MapPin },
  { id: 3, title: "Secretary Info", icon: User },
];

export default function CreateSocietyPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-8 flex flex-col h-full">
      
      {/* Header */}
      <div className="mb-8">
        <Link to="/super-admin/societies" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#8F7CFF] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Societies
        </Link>
        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2">
          Onboard New Society
        </h1>
        <p className="text-slate-500 font-medium text-base">
          Follow the wizard to create and configure a new society on the platform.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex-1 flex flex-col">
        
        {/* Stepper Header */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-[#72F1D1] to-[#3DD9FF] rounded-full z-0 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />
          
          {STEPS.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-white shadow-xl shadow-[#8F7CFF]/20 border-2 border-[#8F7CFF] text-[#8F7CFF]' :
                    isCompleted ? 'bg-gradient-to-br from-[#72F1D1] to-[#3DD9FF] text-white shadow-lg shadow-[#72F1D1]/30' :
                    'bg-slate-100 text-slate-400 border border-white'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hidden md:block ${
                  isActive ? 'text-[#8F7CFF]' : 
                  isCompleted ? 'text-slate-700' : 
                  'text-slate-400'
                }`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-1 relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {currentStep === 1 && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Society Name</label>
                    <input type="text" placeholder="Enter society name" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Total Flats</label>
                      <input type="number" placeholder="e.g. 150" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Total Blocks</label>
                      <input type="number" placeholder="e.g. 4" className="w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:outline-none focus:border-[#8F7CFF] transition-colors" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
                  <MapPin className="w-16 h-16 text-slate-200 mb-4" />
                  <p className="text-slate-500 font-medium">Location form fields will go here.</p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6 max-w-2xl mx-auto flex flex-col items-center justify-center h-full">
                  <User className="w-16 h-16 text-slate-200 mb-4" />
                  <p className="text-slate-500 font-medium">Secretary details form fields will go here.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            Go Back
          </button>
          
          <button 
            onClick={currentStep === STEPS.length ? () => alert("Created!") : nextStep}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] text-white font-bold shadow-lg shadow-[#8F7CFF]/30 hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {currentStep === STEPS.length ? "Complete Setup" : "Continue"}
            {currentStep !== STEPS.length && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, Plus, Eye, CheckCircle2, FileText, 
  Image as ImageIcon, HelpCircle, FileCheck, 
  Settings, History, Bold, Italic, Link2
} from "lucide-react";
import { useCMSPages, useCMSKPIs } from "../hooks/useCMS";
import { formatDistanceToNow } from "date-fns";
import type { CMSSection } from "../mock/cms";

const SECTIONS: { id: CMSSection; icon: any }[] = [
  { id: "Landing Page", icon: Database },
  { id: "About", icon: FileText },
  { id: "Privacy Policy", icon: FileCheck },
  { id: "Terms", icon: FileCheck },
  { id: "FAQ", icon: HelpCircle },
  { id: "Blogs", icon: FileText },
  { id: "Help Center", icon: HelpCircle },
];

export default function CMSPage() {
  const { data: pages, isLoading } = useCMSPages();
  const { data: kpis } = useCMSKPIs();
  const [activeSection, setActiveSection] = useState<CMSSection>("Landing Page");
  const [activePageId, setActivePageId] = useState<string | null>(null);

  const sectionPages = pages?.filter(p => p.section === activeSection) || [];
  const activePage = sectionPages.find(p => p.id === activePageId) || (sectionPages[0] ?? null);

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-8 flex flex-col h-[calc(100vh-100px)] gap-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
            Content Management
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">CMS</span>
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Manage public-facing website content, policies, and marketing pages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 hover:bg-white transition-colors text-sm font-bold text-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#72F1D1]/10 text-teal-700 border border-[#72F1D1]/30 hover:bg-[#72F1D1]/20 transition-colors text-sm font-bold shadow-sm">
            <CheckCircle2 className="w-4 h-4" />
            Publish
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8F7CFF] to-[#3DD9FF] hover:opacity-90 transition-opacity text-sm font-bold text-white shadow-lg shadow-[#8F7CFF]/30">
            <Plus className="w-4 h-4" />
            New Page
          </button>
        </div>
      </motion.div>

      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
        
        {/* LEFT: Sections Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[260px] shrink-0 flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          <div className="p-4 border-b border-white">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">Sections</span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => { setActiveSection(sec.id); setActivePageId(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === sec.id 
                    ? 'bg-white shadow-[0_4px_20px_rgba(143,124,255,0.08)] text-[#8F7CFF] font-bold border border-[#8F7CFF]/20' 
                    : 'text-slate-600 hover:bg-white/40 hover:text-slate-900 font-medium border border-transparent'
                }`}
              >
                <sec.icon className={`w-5 h-5 ${activeSection === sec.id ? 'text-[#8F7CFF]' : 'text-slate-400'}`} />
                {sec.id}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CENTER: Editor Workspace */}
        <motion.div 
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-[2] flex flex-col bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          {activePage ? (
            <>
              {/* Editor Header / Meta */}
              <div className="p-6 border-b border-white bg-white/40 flex justify-between items-start">
                <div className="flex-1 pr-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      activePage.status === 'Published' ? 'bg-[#72F1D1]/20 text-teal-700' : 'bg-[#FFD166]/20 text-[#D49F1C]'
                    }`}>
                      {activePage.status}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Last edited by {activePage.lastEditedBy} • {formatDistanceToNow(new Date(activePage.lastEditedAt), { addSuffix: true })}
                    </span>
                  </div>
                  <input 
                    type="text" 
                    defaultValue={activePage.title}
                    className="w-full text-2xl font-heading font-extrabold text-slate-900 bg-transparent border-none focus:outline-none placeholder:text-slate-300 mb-2"
                    placeholder="Page Title"
                  />
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-400 group">
                    <span>Slug:</span>
                    <span className="text-slate-600 group-focus-within:hidden">{activePage.slug}</span>
                    <input 
                      type="text" 
                      defaultValue={activePage.slug} 
                      className="hidden group-focus-within:block bg-slate-50 border border-slate-200 rounded px-2 py-0.5 outline-none focus:border-[#8F7CFF]"
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#8F7CFF] hover:border-[#8F7CFF]/50 transition-colors tooltip-trigger" title="SEO Settings">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#8F7CFF] hover:border-[#8F7CFF]/50 transition-colors tooltip-trigger" title="Version History">
                    <History className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Rich Text Toolbar */}
              <div className="px-4 py-2 border-b border-slate-100 bg-white/80 flex items-center gap-2">
                <select className="bg-transparent border-none text-sm font-bold text-slate-700 focus:outline-none cursor-pointer">
                  <option>Paragraph</option>
                  <option>Heading 1</option>
                  <option>Heading 2</option>
                </select>
                <div className="w-px h-5 bg-slate-200 mx-2" />
                <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600"><Bold className="w-4 h-4" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600"><Italic className="w-4 h-4" /></button>
                <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600"><Link2 className="w-4 h-4" /></button>
                <div className="w-px h-5 bg-slate-200 mx-2" />
                <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600 flex items-center gap-1.5 text-xs font-bold">
                  <ImageIcon className="w-4 h-4" /> Add Media
                </button>
              </div>

              {/* Editor Content Area */}
              <div className="flex-1 overflow-auto custom-scrollbar p-6 bg-white/30">
                <div 
                  className="w-full h-full text-slate-700 prose prose-slate focus:outline-none"
                  contentEditable
                  dangerouslySetInnerHTML={{ __html: activePage.content }}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center bg-white/40">
              <FileText className="w-16 h-16 text-slate-200 mb-4" />
              <h3 className="text-lg font-bold text-slate-400">Select or create a page in {activeSection}</h3>
            </div>
          )}
        </motion.div>

        {/* RIGHT: Context Panel (Pages in this section + Recent Activity) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6"
        >
          {/* Pages List for the section */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col max-h-[50%]">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#8F7CFF]" /> 
              {activeSection} Pages
            </h4>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
              {isLoading ? (
                <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
              ) : sectionPages.length === 0 ? (
                <p className="text-sm font-medium text-slate-400 text-center py-4">No pages yet</p>
              ) : (
                sectionPages.map(page => (
                  <button 
                    key={page.id}
                    onClick={() => setActivePageId(page.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      activePageId === page.id ? 'bg-white border-[#8F7CFF]/30 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/50 hover:border-slate-200'
                    }`}
                  >
                    <span className={`text-sm font-bold line-clamp-1 text-left ${activePageId === page.id ? 'text-[#8F7CFF]' : 'text-slate-700'}`}>
                      {page.title}
                    </span>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${page.status === 'Published' ? 'bg-[#72F1D1]' : 'bg-[#FFD166]'}`} />
                  </button>
                ))
              )}
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-[#8F7CFF] hover:bg-[#8F7CFF]/5 transition-colors text-sm font-bold text-slate-500 hover:text-[#8F7CFF] flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Page
            </button>
          </div>

          {/* Quick Stats & Activity */}
          <div className="bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[32px] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex-1 overflow-hidden flex flex-col">
            <div className="grid grid-cols-2 gap-3 mb-6 shrink-0">
              <div className="bg-white/50 rounded-2xl p-4 border border-slate-100">
                <span className="block text-xl font-black text-slate-700 mb-1">{kpis?.publishedPages || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Published</span>
              </div>
              <div className="bg-white/50 rounded-2xl p-4 border border-slate-100">
                <span className="block text-xl font-black text-[#D49F1C] mb-1">{kpis?.drafts || 0}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Drafts</span>
              </div>
            </div>

            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 shrink-0">
              <History className="w-4 h-4 text-slate-400" /> Recent Changes
            </h4>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-1">
              {kpis?.recentChanges.map((change: any) => (
                <div key={change.id} className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[#8F7CFF] before:rounded-full">
                  <p className="text-sm font-bold text-slate-700 line-clamp-1">{change.title}</p>
                  <p className="text-xs font-medium text-slate-400 mt-0.5">By {change.user} • {change.time}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

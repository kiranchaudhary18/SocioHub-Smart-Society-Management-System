import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { documentService } from "../../services/document.service";
import type { SocietyDocument, DocumentStats } from "../../services/document.service";
import { ActionButton } from "../../components/ui/ActionButton";
import { StatCard } from "../../components/ui/StatCard";
import { 
  FileText, Folder, Upload, Search, Filter, 
  LayoutGrid, List as ListIcon, MoreVertical, FolderPlus,
  File, FileImage, FileCode, Share2, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const getFileIcon = (type: string) => {
  switch (type) {
    case "FOLDER": return <Folder className="w-8 h-8 text-[#FFD166] fill-[#FFD166]/20" />;
    case "PDF": return <FileText className="w-8 h-8 text-[#FF7A7A]" />;
    case "WORD": return <FileText className="w-8 h-8 text-[#3DD9FF]" />;
    case "EXCEL": return <FileCode className="w-8 h-8 text-[#72F1D1]" />;
    case "IMAGE": return <FileImage className="w-8 h-8 text-[#8F7CFF]" />;
    default: return <File className="w-8 h-8 text-slate-400" />;
  }
};

const getSmallFileIcon = (type: string) => {
  switch (type) {
    case "FOLDER": return <Folder className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />;
    case "PDF": return <FileText className="w-4 h-4 text-[#FF7A7A]" />;
    case "WORD": return <FileText className="w-4 h-4 text-[#3DD9FF]" />;
    case "EXCEL": return <FileCode className="w-4 h-4 text-[#72F1D1]" />;
    case "IMAGE": return <FileImage className="w-4 h-4 text-[#8F7CFF]" />;
    default: return <File className="w-4 h-4 text-slate-400" />;
  }
};

export default function DocumentsPage() {
  const [view, setView] = useState<'grid' | 'table'>('grid');
  const [documents, setDocuments] = useState<SocietyDocument[]>([]);
  const [stats, setStats] = useState<DocumentStats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simple navigation state for folders
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [docsData, statsData] = await Promise.all([
        documentService.getDocuments(currentFolder),
        documentService.getStats()
      ]);
      setDocuments(docsData);
      setStats(statsData);
      setIsLoading(false);
    };
    fetchData();
  }, [currentFolder]);

  const filteredDocs = documents.filter(d => 
    `${d.name} ${d.category} ${d.uploadedBy}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Documents</h1>
          <p className="text-slate-500 font-medium mt-1">Manage important society documents securely.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ActionButton variant="outline" leftIcon={<FolderPlus className="w-4 h-4" />}>New Folder</ActionButton>
          <ActionButton variant="primary" leftIcon={<Upload className="w-4 h-4" />}>Upload File</ActionButton>
        </div>
      </div>

      {/* KPI Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Documents" value={stats.totalDocuments} icon={<FileText className="w-5 h-5 text-[#8F7CFF]" />} delay={0.1} />
          <StatCard title="Folders" value={stats.totalFolders} icon={<Folder className="w-5 h-5 text-[#FFD166]" />} delay={0.15} />
          <StatCard title="Recent Uploads" value={stats.recentUploads} icon={<Upload className="w-5 h-5 text-[#72F1D1]" />} delay={0.2} trend={{ value: 12, isPositive: true }} />
          <StatCard title="Shared Files" value={stats.sharedFiles} icon={<Share2 className="w-5 h-5 text-[#3DD9FF]" />} delay={0.25} />
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-2 flex flex-col md:flex-row items-center gap-2 relative z-20">
        
        {/* Breadcrumb / Search */}
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-[16px] border border-slate-100 w-full">
          {currentFolder ? (
            <div className="flex items-center gap-2 mr-4 border-r border-slate-100 pr-4">
              <button onClick={() => setCurrentFolder(null)} className="text-slate-400 hover:text-[#8F7CFF] font-bold text-sm">Root</button>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-bold text-sm truncate">Current Folder</span>
            </div>
          ) : (
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
          )}
          
          <input 
            type="text" 
            placeholder="Search documents and folders..." 
            className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-2 w-full md:w-auto px-2">
          <button className="flex items-center gap-2 px-4 py-3 rounded-[16px] bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold text-sm transition-colors border border-slate-100">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="w-px h-8 bg-slate-200 hidden md:block mx-2" />

          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-[16px]">
            <button 
              onClick={() => setView('grid')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'grid' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('table')}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${view === 'table' ? 'bg-white text-[#8F7CFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="w-full bg-white/60 rounded-[32px] overflow-hidden p-6 animate-pulse">
          <div className="h-12 bg-slate-100/50 rounded-2xl mb-4" />
          {[1, 2, 3, 4].map(i => <div key={i} className="h-16 bg-slate-100/30 rounded-2xl mb-2" />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filteredDocs.map((doc, i) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => doc.type === 'FOLDER' ? setCurrentFolder(doc.id) : null}
                  className={`bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[24px] p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-[#8F7CFF]/30 transition-all group flex flex-col items-center text-center ${doc.type === 'FOLDER' ? 'cursor-pointer' : ''}`}
                >
                  
                  <div className="w-full flex justify-end mb-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 group-hover:text-slate-600 opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getFileIcon(doc.type)}
                  </div>

                  {doc.type === 'FOLDER' ? (
                    <span className="font-bold text-slate-800 text-sm line-clamp-2">{doc.name}</span>
                  ) : (
                    <Link to={`/admin/documents/${doc.id}`} className="font-bold text-slate-800 text-sm hover:text-[#8F7CFF] transition-colors line-clamp-2">
                      {doc.name}
                    </Link>
                  )}

                  <div className="mt-2 flex flex-col gap-1 items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{doc.category}</span>
                    <span className="text-xs font-bold text-slate-500">{doc.type === 'FOLDER' ? doc.uploadDate : doc.size}</span>
                  </div>
                  
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] rounded-[32px] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-widest">
                      <th className="px-6 py-5 whitespace-nowrap">Name</th>
                      <th className="px-6 py-5 whitespace-nowrap">Category</th>
                      <th className="px-6 py-5 whitespace-nowrap">Size</th>
                      <th className="px-6 py-5 whitespace-nowrap">Uploaded By</th>
                      <th className="px-6 py-5 whitespace-nowrap">Date</th>
                      <th className="px-6 py-5 text-right whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc, i) => (
                      <motion.tr 
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="group border-b border-slate-50 hover:bg-white transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                              {getSmallFileIcon(doc.type)}
                            </div>
                            <div className="flex flex-col">
                              {doc.type === 'FOLDER' ? (
                                <button onClick={() => setCurrentFolder(doc.id)} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors text-left">
                                  {doc.name}
                                </button>
                              ) : (
                                <Link to={`/admin/documents/${doc.id}`} className="font-bold text-slate-800 hover:text-[#8F7CFF] transition-colors line-clamp-1">
                                  {doc.name}
                                </Link>
                              )}
                              {doc.isShared && <span className="text-[10px] font-bold text-[#3DD9FF] flex items-center gap-1 mt-0.5"><Share2 className="w-3 h-3" /> Shared</span>}
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{doc.category}</span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-600">{doc.size || '-'}</span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img src={`https://ui-avatars.com/api/?name=${doc.uploadedBy}&background=f1f5f9&color=64748b`} className="w-6 h-6 rounded-full" alt="avatar" />
                            <span className="text-sm font-bold text-slate-700">{doc.uploadedBy}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-slate-600 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {doc.uploadDate}
                          </span>
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
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </div>
  );
}

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { documentsService, type SocietyDocument } from "../../services/documents.service";
import { DocumentKPIs } from "./components/DocumentKPIs";
import { DocumentToolbar } from "./components/DocumentToolbar";
import { CategoryGrid } from "./components/CategoryGrid";
import { DocumentLibrary } from "./components/DocumentLibrary";
import { DocumentPreviewDrawer } from "./components/DocumentPreviewDrawer";
import { ImportantInfoCard } from "./components/ImportantInfoCard";
import { DocumentsRightSidebar } from "./components/DocumentsRightSidebar";
import { Loader2 } from "lucide-react";

export default function DocumentsPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [yearFilter, setYearFilter] = useState("ALL");
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<SocietyDocument | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      const [kpis, categories, documents] = await Promise.all([
        documentsService.getKPIs(),
        documentsService.getCategories(),
        documentsService.getDocuments()
      ]);
      return { kpis, categories, documents };
    }
  });

  const bookmarkMutation = useMutation({
    mutationFn: documentsService.toggleBookmark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });

  const handleReset = () => {
    setSearchTerm("");
    setCategoryFilter("ALL");
    setTypeFilter("ALL");
    setYearFilter("ALL");
    setBookmarkedOnly(false);
  };

  const filteredDocuments = useMemo(() => {
    if (!data?.documents) return [];
    return data.documents.filter(doc => {
      const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === "ALL" || doc.category === categoryFilter;
      const matchType = typeFilter === "ALL" || doc.fileType === typeFilter;
      const matchYear = yearFilter === "ALL" || doc.uploadedDate.startsWith(yearFilter);
      const matchBookmark = !bookmarkedOnly || doc.isBookmarked;
      
      return matchSearch && matchCategory && matchType && matchYear && matchBookmark;
    });
  }, [data?.documents, searchTerm, categoryFilter, typeFilter, yearFilter, bookmarkedOnly]);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#8F7CFF] animate-spin" />
        <p className="text-sm font-bold text-slate-500 animate-pulse">Loading documents...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-2">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800">Unable to load documents</h2>
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
        <h1 className="text-3xl font-heading font-black text-slate-800 tracking-tight">Documents</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">Access and download important society documents.</p>
      </div>

      <DocumentKPIs kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-2">
        
        {/* Main Content (Left) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          <DocumentToolbar 
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            typeFilter={typeFilter} setTypeFilter={setTypeFilter}
            yearFilter={yearFilter} setYearFilter={setYearFilter}
            bookmarkedOnly={bookmarkedOnly} setBookmarkedOnly={setBookmarkedOnly}
            onReset={handleReset}
          />
          
          <CategoryGrid 
            categories={data.categories}
            selectedCategory={categoryFilter}
            onSelect={setCategoryFilter}
          />

          <ImportantInfoCard />

          <DocumentLibrary 
            documents={filteredDocuments}
            onPreview={setSelectedDocument}
            onBookmark={(id) => {
              bookmarkMutation.mutate(id);
              if (selectedDocument?.id === id) {
                setSelectedDocument({ ...selectedDocument, isBookmarked: !selectedDocument.isBookmarked });
              }
            }}
          />

        </div>

        {/* Sidebar Content (Right) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="sticky top-6 flex flex-col gap-8">
            <DocumentsRightSidebar 
              documents={data.documents}
              onPreview={setSelectedDocument}
            />
          </div>
        </div>

      </div>

      <DocumentPreviewDrawer 
        document={selectedDocument}
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onBookmark={async (id) => {
          await bookmarkMutation.mutateAsync(id);
          if (selectedDocument) {
             setSelectedDocument({ ...selectedDocument, isBookmarked: !selectedDocument.isBookmarked });
          }
        }}
      />

    </div>
  );
}

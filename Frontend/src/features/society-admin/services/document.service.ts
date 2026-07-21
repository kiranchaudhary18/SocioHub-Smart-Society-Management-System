export type DocumentType = "PDF" | "WORD" | "EXCEL" | "IMAGE" | "FOLDER";

export interface SocietyDocument {
  id: string;
  name: string;
  type: DocumentType;
  size?: string; // folders won't have a specific file size in the same way
  uploadedBy: string;
  uploadDate: string;
  category: string;
  version: string;
  isShared: boolean;
  folderId: string | null; // null means it's at the root
}

export interface DocumentStats {
  totalDocuments: number;
  totalFolders: number;
  recentUploads: number;
  sharedFiles: number;
}

const mockDocuments: SocietyDocument[] = [
  {
    id: "DOC-001",
    name: "Financial Reports 2026",
    type: "FOLDER",
    uploadedBy: "Treasurer",
    uploadDate: "10 Jan 2026",
    category: "Finance",
    version: "1.0",
    isShared: true,
    folderId: null
  },
  {
    id: "DOC-002",
    name: "Society By-Laws",
    type: "FOLDER",
    uploadedBy: "Secretary",
    uploadDate: "15 Jan 2026",
    category: "Legal",
    version: "1.0",
    isShared: true,
    folderId: null
  },
  {
    id: "DOC-003",
    name: "Q1 Audit Report.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Treasurer",
    uploadDate: "05 Apr 2026",
    category: "Finance",
    version: "1.2",
    isShared: true,
    folderId: "DOC-001"
  },
  {
    id: "DOC-004",
    name: "Vendor Contracts.xlsx",
    type: "EXCEL",
    size: "1.8 MB",
    uploadedBy: "Admin",
    uploadDate: "20 May 2026",
    category: "Operations",
    version: "1.0",
    isShared: false,
    folderId: null
  },
  {
    id: "DOC-005",
    name: "Maintenance Rate Card 2026.pdf",
    type: "PDF",
    size: "4.2 MB",
    uploadedBy: "Admin",
    uploadDate: "01 Jun 2026",
    category: "Operations",
    version: "2.1",
    isShared: true,
    folderId: null
  }
];

class DocumentService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getDocuments(folderId: string | null = null): Promise<SocietyDocument[]> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockDocuments.filter(d => d.folderId === folderId)
    ), 500));
  }

  async getDocument(id: string): Promise<SocietyDocument | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockDocuments.find(d => d.id === id)
    ), 500));
  }

  async getStats(): Promise<DocumentStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      totalDocuments: 145,
      totalFolders: 12,
      recentUploads: 5,
      sharedFiles: 89
    }), 500));
  }
}

export const documentService = new DocumentService();

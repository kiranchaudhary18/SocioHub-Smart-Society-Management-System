export interface DocumentKPIs {
  total: number;
  recentlyAdded: number;
  bookmarked: number;
  downloadsThisMonth: number;
}

export interface DocumentCategory {
  id: string;
  name: string;
  iconName: string;
  count: number;
  description: string;
}

export type DocumentStatus = "NEW" | "UPDATED" | "IMPORTANT" | "ARCHIVED" | "FEATURED" | "NONE";

export interface SocietyDocument {
  id: string;
  name: string;
  category: string;
  fileType: "PDF" | "DOCX" | "XLSX" | "PNG";
  fileSize: string;
  uploadedDate: string;
  lastUpdated: string;
  description: string;
  downloads: number;
  isBookmarked: boolean;
  tags: string[];
  version: string;
  uploadedBy: string;
  status: DocumentStatus;
  relatedDocIds?: string[];
}

const mockKPIs: DocumentKPIs = {
  total: 124,
  recentlyAdded: 12,
  bookmarked: 8,
  downloadsThisMonth: 856
};

const mockCategories: DocumentCategory[] = [
  { id: "cat-1", name: "Society Rules", iconName: "Scale", count: 12, description: "Bylaws and community guidelines" },
  { id: "cat-2", name: "Maintenance", iconName: "Wrench", count: 45, description: "Maintenance records and policies" },
  { id: "cat-3", name: "Meeting Minutes", iconName: "FileText", count: 28, description: "Records of AGMs and committee meetings" },
  { id: "cat-4", name: "Legal Documents", iconName: "Briefcase", count: 8, description: "Land records, MOUs, and contracts" },
  { id: "cat-5", name: "Forms", iconName: "ClipboardList", count: 15, description: "Tenant, renovation, and NOC forms" },
  { id: "cat-6", name: "Newsletters", iconName: "Newspaper", count: 16, description: "Monthly society updates and news" }
];

let mockDocuments: SocietyDocument[] = [
  {
    id: "doc-1",
    name: "Society Rule Book 2026.pdf",
    category: "Society Rules",
    fileType: "PDF",
    fileSize: "2.4 MB",
    uploadedDate: "2026-01-15T10:00:00Z",
    lastUpdated: "2026-01-15T10:00:00Z",
    description: "The complete rule book containing all bylaws, guidelines, and code of conduct for residents.",
    downloads: 1240,
    isBookmarked: true,
    tags: ["rules", "bylaws", "mandatory"],
    version: "v2.1",
    uploadedBy: "Admin Rahul",
    status: "IMPORTANT"
  },
  {
    id: "doc-2",
    name: "Parking Guidelines v3.pdf",
    category: "Society Rules",
    fileType: "PDF",
    fileSize: "1.1 MB",
    uploadedDate: "2026-03-10T14:30:00Z",
    lastUpdated: "2026-06-20T09:15:00Z",
    description: "Updated rules regarding visitor parking, basement slot allocations, and two-wheeler parking zones.",
    downloads: 432,
    isBookmarked: false,
    tags: ["parking", "vehicles"],
    version: "v3.0",
    uploadedBy: "Security Head",
    status: "UPDATED"
  },
  {
    id: "doc-3",
    name: "AGM Meeting Minutes 2025.docx",
    category: "Meeting Minutes",
    fileType: "DOCX",
    fileSize: "850 KB",
    uploadedDate: "2025-12-20T11:00:00Z",
    lastUpdated: "2025-12-20T11:00:00Z",
    description: "Detailed minutes from the Annual General Meeting held in December 2025, including financial budgets for 2026.",
    downloads: 890,
    isBookmarked: false,
    tags: ["agm", "minutes", "financials"],
    version: "v1.0",
    uploadedBy: "Secretary Sneha",
    status: "NONE"
  },
  {
    id: "doc-4",
    name: "Emergency Contact List.pdf",
    category: "Forms",
    fileType: "PDF",
    fileSize: "420 KB",
    uploadedDate: "2026-07-01T08:00:00Z",
    lastUpdated: "2026-07-01T08:00:00Z",
    description: "A printable list of all emergency contacts including local police, hospitals, plumbers, and electricians.",
    downloads: 2100,
    isBookmarked: true,
    tags: ["emergency", "contacts", "important"],
    version: "v2026.7",
    uploadedBy: "Admin Rahul",
    status: "FEATURED"
  },
  {
    id: "doc-5",
    name: "Waste Management Guide.pdf",
    category: "Maintenance",
    fileType: "PDF",
    fileSize: "3.5 MB",
    uploadedDate: "2026-05-15T10:20:00Z",
    lastUpdated: "2026-05-15T10:20:00Z",
    description: "Illustrated guide on how to segregate dry, wet, and hazardous waste properly as per municipal guidelines.",
    downloads: 340,
    isBookmarked: false,
    tags: ["waste", "guidelines", "civic"],
    version: "v1.2",
    uploadedBy: "Maintenance Head",
    status: "NONE"
  },
  {
    id: "doc-6",
    name: "Maintenance Rate Card 2026.xlsx",
    category: "Maintenance",
    fileType: "XLSX",
    fileSize: "125 KB",
    uploadedDate: "2026-07-10T16:45:00Z",
    lastUpdated: "2026-07-10T16:45:00Z",
    description: "Breakdown of monthly maintenance charges based on flat size and specific amenities opted.",
    downloads: 512,
    isBookmarked: false,
    tags: ["finance", "maintenance", "rates"],
    version: "v1.0",
    uploadedBy: "Treasurer Amit",
    status: "NEW"
  },
  {
    id: "doc-7",
    name: "Resident Move-in NOC Form.docx",
    category: "Forms",
    fileType: "DOCX",
    fileSize: "45 KB",
    uploadedDate: "2024-08-11T09:00:00Z",
    lastUpdated: "2024-08-11T09:00:00Z",
    description: "Standard No Objection Certificate form required to be filled by landlords before a new tenant moves in.",
    downloads: 125,
    isBookmarked: false,
    tags: ["noc", "tenant", "forms"],
    version: "v1.0",
    uploadedBy: "Admin Rahul",
    status: "ARCHIVED"
  },
  {
    id: "doc-8",
    name: "Fire Safety Evacuation Plan.png",
    category: "Society Rules",
    fileType: "PNG",
    fileSize: "5.2 MB",
    uploadedDate: "2026-02-14T13:20:00Z",
    lastUpdated: "2026-02-14T13:20:00Z",
    description: "High-resolution map of the society campus showing fire exits, assembly points, and extinguisher locations.",
    downloads: 1850,
    isBookmarked: true,
    tags: ["safety", "fire", "map"],
    version: "v1.0",
    uploadedBy: "Security Head",
    status: "IMPORTANT"
  }
];

class DocumentsService {
  async getKPIs(): Promise<DocumentKPIs> {
    return new Promise((resolve) => setTimeout(() => resolve(mockKPIs), 600));
  }

  async getCategories(): Promise<DocumentCategory[]> {
    return new Promise((resolve) => setTimeout(() => resolve(mockCategories), 600));
  }

  async getDocuments(): Promise<SocietyDocument[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...mockDocuments]), 800));
  }

  async toggleBookmark(docId: string): Promise<SocietyDocument> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const doc = mockDocuments.find((d) => d.id === docId);
        if (!doc) {
          reject(new Error("Document not found"));
          return;
        }
        
        doc.isBookmarked = !doc.isBookmarked;
        // In real app, we might recalculate bookmarked KPI here
        if (doc.isBookmarked) {
           mockKPIs.bookmarked += 1;
        } else {
           mockKPIs.bookmarked -= 1;
        }
        resolve({ ...doc });
      }, 500);
    });
  }

  async getDocument(docId: string): Promise<SocietyDocument> {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        const doc = mockDocuments.find((d) => d.id === docId);
        if (!doc) {
          reject(new Error("Document not found"));
          return;
        }
        resolve({ ...doc });
      }, 300);
    });
  }
}

export const documentsService = new DocumentsService();

export type CMSPageStatus = "Published" | "Draft" | "Archived";
export type CMSSection = "Landing Page" | "About" | "Privacy Policy" | "Terms" | "FAQ" | "Blogs" | "Help Center";

export interface CMSContent {
  id: string;
  title: string;
  slug: string;
  section: CMSSection;
  status: CMSPageStatus;
  lastEditedBy: string;
  lastEditedAt: string;
  seoTitle: string;
  seoDescription: string;
  content: string; // HTML or Markdown
}

export const cmsKPIs = {
  publishedPages: 42,
  drafts: 8,
  recentChanges: [
    { id: 1, title: "Privacy Policy Update", user: "Kiran Chaudhary", time: "2 hours ago" },
    { id: 2, title: "New Feature Blog Post", user: "Amit Shah", time: "1 day ago" },
    { id: 3, title: "Updated Terms of Service", user: "Neha Patil", time: "3 days ago" },
  ]
};

export const mockCMSPages: CMSContent[] = [
  {
    id: "PG-001",
    title: "ResiCore Home",
    slug: "/",
    section: "Landing Page",
    status: "Published",
    lastEditedBy: "Kiran Chaudhary",
    lastEditedAt: "2026-07-21T09:00:00Z",
    seoTitle: "ResiCore - Modern Residential Management Platform",
    seoDescription: "The premium enterprise SaaS platform for modern societies.",
    content: "<h1>Welcome to ResiCore</h1><p>Experience the next generation of society management.</p>"
  },
  {
    id: "PG-002",
    title: "Data Privacy Policy 2026",
    slug: "/privacy",
    section: "Privacy Policy",
    status: "Draft",
    lastEditedBy: "Legal Team",
    lastEditedAt: "2026-07-20T14:30:00Z",
    seoTitle: "Privacy Policy | ResiCore",
    seoDescription: "Read about how ResiCore protects your data and privacy.",
    content: "<h1>Privacy Policy</h1><p>Your data security is our top priority...</p>"
  }
];

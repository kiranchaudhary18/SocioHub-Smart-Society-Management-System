export interface PendingSociety {
  id: string;
  societyName: string;
  secretary: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  details: {
    totalFlats: number;
    blocks: number;
  };
  documents: {
    name: string;
    status: "Verified" | "Pending" | "Rejected";
    url: string;
  }[];
  created: string;
  status: "Pending" | "In Review" | "Changes Requested";
}

export const detailedPendingApprovals: PendingSociety[] = [
  {
    id: "SOC-2026-8921",
    societyName: "Royal Heights Residency",
    secretary: {
      name: "Rajesh Kumar",
      email: "rajesh@royalheights.com",
      phone: "+91 98765 43210",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Rajesh"
    },
    location: {
      address: "124 SG Highway, Near Bodakdev",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380054"
    },
    details: {
      totalFlats: 120,
      blocks: 4,
    },
    documents: [
      { name: "Society Registration Certificate", status: "Verified", url: "#" },
      { name: "Secretary ID Proof", status: "Pending", url: "#" },
      { name: "Property Tax Receipt", status: "Verified", url: "#" }
    ],
    created: "2026-07-21T08:30:00Z",
    status: "Pending",
  },
  {
    id: "SOC-2026-8922",
    societyName: "Sunrise Apartments",
    secretary: {
      name: "Priya Sharma",
      email: "priya@sunriseapts.in",
      phone: "+91 99887 76655",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Priya"
    },
    location: {
      address: "45 HSR Layout, Sector 2",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102"
    },
    details: {
      totalFlats: 45,
      blocks: 1,
    },
    documents: [
      { name: "Society Registration Certificate", status: "Verified", url: "#" },
      { name: "Secretary ID Proof", status: "Verified", url: "#" },
    ],
    created: "2026-07-21T09:15:00Z",
    status: "In Review",
  },
  {
    id: "SOC-2026-8923",
    societyName: "Emerald Valley",
    secretary: {
      name: "Amit Patel",
      email: "amit.p@emeraldvalley.com",
      phone: "+91 88990 01122",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit"
    },
    location: {
      address: "Kalyani Nagar",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411014"
    },
    details: {
      totalFlats: 250,
      blocks: 8,
    },
    documents: [
      { name: "Society Registration Certificate", status: "Pending", url: "#" },
      { name: "Secretary ID Proof", status: "Pending", url: "#" },
      { name: "Authority Letter", status: "Pending", url: "#" }
    ],
    created: "2026-07-20T14:45:00Z",
    status: "Pending",
  },
];

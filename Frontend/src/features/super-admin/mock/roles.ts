export type PermissionAccess = "View" | "Create" | "Edit" | "Delete" | "Approve";
export type ModuleName = "Dashboard" | "Residents" | "Visitors" | "Maintenance" | "Parking" | "Analytics" | "Billing" | "Settings";

export interface Permission {
  module: ModuleName;
  access: Partial<Record<PermissionAccess, boolean>>;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: Permission[];
  lastUpdated: string;
  isSystem: boolean; // System roles cannot be deleted
}

export const mockRoles: Role[] = [
  {
    id: "ROLE-001",
    name: "Super Admin",
    description: "Full platform access across all societies and system settings.",
    userCount: 5,
    isSystem: true,
    lastUpdated: "2026-07-21T10:00:00Z",
    permissions: [
      { module: "Dashboard", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Residents", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Visitors", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Maintenance", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Parking", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Analytics", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Billing", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Settings", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
    ]
  },
  {
    id: "ROLE-002",
    name: "Society Admin",
    description: "Administrative access restricted to a single society's operations.",
    userCount: 450,
    isSystem: true,
    lastUpdated: "2026-07-20T14:30:00Z",
    permissions: [
      { module: "Dashboard", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Residents", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Visitors", access: { View: true, Create: true, Edit: true, Delete: false, Approve: true } },
      { module: "Maintenance", access: { View: true, Create: true, Edit: true, Delete: false, Approve: true } },
      { module: "Parking", access: { View: true, Create: true, Edit: true, Delete: false, Approve: true } },
      { module: "Analytics", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Billing", access: { View: true, Create: false, Edit: false, Delete: false, Approve: true } },
      { module: "Settings", access: { View: true, Create: true, Edit: true, Delete: false, Approve: false } },
    ]
  },
  {
    id: "ROLE-003",
    name: "Resident",
    description: "Standard access for society residents. Can view own data and create requests.",
    userCount: 12500,
    isSystem: true,
    lastUpdated: "2026-07-15T09:00:00Z",
    permissions: [
      { module: "Dashboard", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Residents", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Visitors", access: { View: true, Create: true, Edit: true, Delete: true, Approve: true } },
      { module: "Maintenance", access: { View: true, Create: true, Edit: false, Delete: false, Approve: false } },
      { module: "Parking", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Analytics", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Billing", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Settings", access: { View: true, Create: true, Edit: true, Delete: false, Approve: false } },
    ]
  },
  {
    id: "ROLE-004",
    name: "Security",
    description: "Gate access management and visitor verification.",
    userCount: 890,
    isSystem: true,
    lastUpdated: "2026-07-18T11:20:00Z",
    permissions: [
      { module: "Dashboard", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Residents", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Visitors", access: { View: true, Create: true, Edit: true, Delete: false, Approve: true } },
      { module: "Maintenance", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Parking", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Analytics", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Billing", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Settings", access: { View: true, Create: true, Edit: true, Delete: false, Approve: false } },
    ]
  },
  {
    id: "ROLE-005",
    name: "Staff",
    description: "Maintenance and internal society staff roles.",
    userCount: 430,
    isSystem: true,
    lastUpdated: "2026-07-10T16:45:00Z",
    permissions: [
      { module: "Dashboard", access: { View: true, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Residents", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Visitors", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Maintenance", access: { View: true, Create: false, Edit: true, Delete: false, Approve: false } },
      { module: "Parking", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Analytics", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Billing", access: { View: false, Create: false, Edit: false, Delete: false, Approve: false } },
      { module: "Settings", access: { View: true, Create: true, Edit: true, Delete: false, Approve: false } },
    ]
  }
];

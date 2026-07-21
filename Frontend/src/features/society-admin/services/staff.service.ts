export type StaffStatus = "ACTIVE" | "ON_LEAVE" | "INACTIVE";
export type Department = "HOUSEKEEPING" | "MAINTENANCE" | "ADMINISTRATION" | "LANDSCAPING" | "SECURITY";

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: Department;
  phone: string;
  email?: string;
  shift: string;
  joiningDate: string;
  status: StaffStatus;
  photo?: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT";
}

export interface StaffStats {
  totalStaff: number;
  activeStaff: number;
  onLeave: number;
  todaysAttendance: number; // percentage
  newStaff: number;
  departments: number;
}

const mockStaff: Staff[] = [
  {
    id: "EMP-4001",
    firstName: "Rajesh",
    lastName: "Kumar",
    role: "Senior Electrician",
    department: "MAINTENANCE",
    phone: "+91 98765 43210",
    email: "rajesh.k@example.com",
    shift: "Morning (08:00 - 16:00)",
    joiningDate: "15 Jan 2023",
    status: "ACTIVE",
    employmentType: "FULL_TIME",
    photo: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=f1f5f9&color=64748b"
  },
  {
    id: "EMP-4002",
    firstName: "Sunita",
    lastName: "Devi",
    role: "Housekeeping Lead",
    department: "HOUSEKEEPING",
    phone: "+91 98765 43211",
    shift: "Morning (07:00 - 15:00)",
    joiningDate: "10 Feb 2023",
    status: "ACTIVE",
    employmentType: "FULL_TIME",
    photo: "https://ui-avatars.com/api/?name=Sunita+Devi&background=f1f5f9&color=64748b"
  },
  {
    id: "EMP-4003",
    firstName: "Mahesh",
    lastName: "Chandra",
    role: "Carpenter",
    department: "MAINTENANCE",
    phone: "+91 98765 43212",
    shift: "General (09:00 - 17:00)",
    joiningDate: "05 Mar 2023",
    status: "ON_LEAVE",
    employmentType: "CONTRACT",
    photo: "https://ui-avatars.com/api/?name=Mahesh+Chandra&background=f1f5f9&color=64748b"
  },
  {
    id: "EMP-4004",
    firstName: "Anil",
    lastName: "Singh",
    role: "Plumber",
    department: "MAINTENANCE",
    phone: "+91 98765 43213",
    shift: "Evening (15:00 - 23:00)",
    joiningDate: "20 Apr 2023",
    status: "ACTIVE",
    employmentType: "FULL_TIME"
  },
  {
    id: "EMP-4005",
    firstName: "Pooja",
    lastName: "Sharma",
    role: "Admin Assistant",
    department: "ADMINISTRATION",
    phone: "+91 98765 43214",
    email: "pooja.s@example.com",
    shift: "General (09:00 - 17:00)",
    joiningDate: "12 May 2024",
    status: "ACTIVE",
    employmentType: "FULL_TIME",
    photo: "https://ui-avatars.com/api/?name=Pooja+Sharma&background=f1f5f9&color=64748b"
  }
];

class StaffService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getStaffList(): Promise<Staff[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockStaff), 500));
  }

  async getStaff(id: string): Promise<Staff | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockStaff.find(s => s.id === id)
    ), 500));
  }

  async getStats(): Promise<StaffStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      totalStaff: 45,
      activeStaff: 41,
      onLeave: 4,
      todaysAttendance: 92,
      newStaff: 3,
      departments: 5
    }), 500));
  }
}

export const staffService = new StaffService();

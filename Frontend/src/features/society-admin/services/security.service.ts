export type GuardStatus = "ON_DUTY" | "OFF_DUTY" | "ON_LEAVE";
export type ShiftType = "MORNING" | "NIGHT" | "GENERAL";

export interface SecurityGuard {
  id: string;
  firstName: string;
  lastName: string;
  assignedGate: string;
  currentShift: ShiftType;
  phone: string;
  experience: string; // e.g. "5 Years"
  status: GuardStatus;
  photo?: string;
  agency?: string;
  emergencyContact: string;
}

export interface SecurityStats {
  totalGuards: number;
  onDuty: number;
  offDuty: number;
  nightShift: number;
  morningShift: number;
  todaysAttendance: number; // percentage
}

const mockGuards: SecurityGuard[] = [
  {
    id: "GRD-101",
    firstName: "Amit",
    lastName: "Yadav",
    assignedGate: "Main Gate (Gate 1)",
    currentShift: "MORNING",
    phone: "+91 98765 11223",
    experience: "4 Years",
    status: "ON_DUTY",
    agency: "SafeGuard Solutions",
    emergencyContact: "+91 98765 11000",
    photo: "https://ui-avatars.com/api/?name=Amit+Yadav&background=f1f5f9&color=64748b"
  },
  {
    id: "GRD-102",
    firstName: "Ramesh",
    lastName: "Patil",
    assignedGate: "Service Gate (Gate 2)",
    currentShift: "MORNING",
    phone: "+91 98765 11224",
    experience: "6 Years",
    status: "ON_DUTY",
    agency: "SafeGuard Solutions",
    emergencyContact: "+91 98765 11001",
    photo: "https://ui-avatars.com/api/?name=Ramesh+Patil&background=f1f5f9&color=64748b"
  },
  {
    id: "GRD-103",
    firstName: "Sanjay",
    lastName: "Singh",
    assignedGate: "Main Gate (Gate 1)",
    currentShift: "NIGHT",
    phone: "+91 98765 11225",
    experience: "2 Years",
    status: "OFF_DUTY",
    agency: "SafeGuard Solutions",
    emergencyContact: "+91 98765 11002",
    photo: "https://ui-avatars.com/api/?name=Sanjay+Singh&background=f1f5f9&color=64748b"
  },
  {
    id: "GRD-104",
    firstName: "Dinesh",
    lastName: "Kumar",
    assignedGate: "Basement Parking",
    currentShift: "NIGHT",
    phone: "+91 98765 11226",
    experience: "8 Years",
    status: "ON_LEAVE",
    agency: "SafeGuard Solutions",
    emergencyContact: "+91 98765 11003",
    photo: "https://ui-avatars.com/api/?name=Dinesh+Kumar&background=f1f5f9&color=64748b"
  }
];

class SecurityService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getGuards(): Promise<SecurityGuard[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockGuards), 500));
  }

  async getGuard(id: string): Promise<SecurityGuard | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockGuards.find(g => g.id === id)
    ), 500));
  }

  async getStats(): Promise<SecurityStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      totalGuards: 12,
      onDuty: 4,
      offDuty: 7,
      nightShift: 4,
      morningShift: 4,
      todaysAttendance: 100
    }), 500));
  }
}

export const securityService = new SecurityService();

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "HALF_DAY" | "ON_LEAVE";

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  shift: string;
  checkIn?: string;
  checkOut?: string;
  workingHours?: string;
  status: AttendanceStatus;
  date: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  late: number;
  onLeave: number;
  halfDay: number;
}

const mockAttendance: AttendanceRecord[] = [
  {
    id: "ATT-001",
    employeeId: "EMP-4001",
    name: "Rajesh Kumar",
    role: "Senior Electrician",
    department: "MAINTENANCE",
    shift: "Morning",
    checkIn: "07:55 AM",
    checkOut: "16:05 PM",
    workingHours: "8h 10m",
    status: "PRESENT",
    date: "Today"
  },
  {
    id: "ATT-002",
    employeeId: "EMP-4002",
    name: "Sunita Devi",
    role: "Housekeeping Lead",
    department: "HOUSEKEEPING",
    shift: "Morning",
    checkIn: "07:15 AM", // 15 mins late
    status: "LATE",
    date: "Today"
  },
  {
    id: "ATT-003",
    employeeId: "EMP-4003",
    name: "Mahesh Chandra",
    role: "Carpenter",
    department: "MAINTENANCE",
    shift: "General",
    status: "ON_LEAVE",
    date: "Today"
  },
  {
    id: "ATT-004",
    employeeId: "GRD-101",
    name: "Amit Yadav",
    role: "Security Guard",
    department: "SECURITY",
    shift: "Morning",
    checkIn: "08:00 AM",
    status: "PRESENT",
    date: "Today"
  },
  {
    id: "ATT-005",
    employeeId: "EMP-4005",
    name: "Pooja Sharma",
    role: "Admin Assistant",
    department: "ADMINISTRATION",
    shift: "General",
    checkIn: "09:05 AM",
    checkOut: "13:00 PM",
    workingHours: "3h 55m",
    status: "HALF_DAY",
    date: "Yesterday"
  }
];

const mockTrendData = [
  { name: 'Mon', present: 42, absent: 3, late: 2 },
  { name: 'Tue', present: 45, absent: 0, late: 1 },
  { name: 'Wed', present: 41, absent: 2, late: 4 },
  { name: 'Thu', present: 43, absent: 1, late: 2 },
  { name: 'Fri', present: 44, absent: 1, late: 0 },
  { name: 'Sat', present: 38, absent: 5, late: 3 },
  { name: 'Sun', present: 20, absent: 2, late: 1 }, // Reduced weekend staff
];

class AttendanceService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getAttendanceRecords(): Promise<AttendanceRecord[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockAttendance), 500));
  }

  async getStats(): Promise<AttendanceStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      present: 42,
      absent: 3,
      late: 5,
      onLeave: 2,
      halfDay: 1
    }), 500));
  }

  async getTrendData() {
    return new Promise(resolve => setTimeout(() => resolve(mockTrendData), 500));
  }
}

export const attendanceService = new AttendanceService();

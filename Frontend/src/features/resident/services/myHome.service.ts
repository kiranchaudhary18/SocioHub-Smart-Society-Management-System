export interface PropertyOverview {
  flatNumber: string;
  tower: string;
  wing: string;
  floor: string;
  propertyType: string;
  ownershipStatus: string;
  occupancyStatus: string;
  moveInDate: string;
  maintenanceCategory: string;
}

export interface PropertySpecifications {
  bhk: string;
  builtUpArea: string;
  carpetArea: string;
  facing: string;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  kitchenType: string;
  furnishedStatus: string;
}

export interface UtilityConnections {
  electricityMeter: string;
  waterConnection: string;
  gasConnection: string;
  internetProvider: string;
  powerBackup: string;
  waterTank: string;
}

export interface ParkingDetails {
  slots: {
    slotNumber: string;
    type: "COVERED" | "OPEN";
    capacity: string;
  }[];
  registeredVehicles: {
    number: string;
    type: "CAR" | "BIKE";
    make: string;
    model: string;
  }[];
  visitorRules: string;
}

export interface SocietyInfo {
  name: string;
  address: string;
  managementOffice: string;
  officeTiming: string;
  maintenanceOffice: string;
  securityContact: string;
  emergencyContact: string;
  email: string;
}

export interface RightPanelData {
  maintenanceStatus: "PAID" | "PENDING" | "OVERDUE";
  currentDue: number;
  dueDate: string;
  recentNotice: {
    title: string;
    date: string;
  } | null;
  emergencyContacts: {
    title: string;
    number: string;
  }[];
}
export interface FamilyMember {
  id: string;
  photoUrl: string;
  fullName: string;
  relationship: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  bloodGroup: string;
  phone: string;
  email: string;
  occupation: string;
  emergencyContact: string;
  status: "VERIFIED" | "PENDING" | "REJECTED";
  memberSince: string;
  remarks: string;
}

export interface FamilySummary {
  total: number;
  adults: number;
  children: number;
  seniorCitizens: number;
}

class MyHomeService {
  async getPropertyOverview(): Promise<PropertyOverview> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      flatNumber: "B-504",
      tower: "Tower B",
      wing: "West Wing",
      floor: "5th Floor",
      propertyType: "Residential Apartment",
      ownershipStatus: "Freehold",
      occupancyStatus: "Self Occupied",
      moveInDate: "15 Jan 2024",
      maintenanceCategory: "Premium (A+)"
    };
  }

  async getPropertySpecifications(): Promise<PropertySpecifications> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      bhk: "3 BHK",
      builtUpArea: "1,850 sq.ft",
      carpetArea: "1,420 sq.ft",
      facing: "East Facing",
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      kitchenType: "Open Modular",
      furnishedStatus: "Semi-Furnished"
    };
  }

  async getUtilityConnections(): Promise<UtilityConnections> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      electricityMeter: "BESCOM-492811",
      waterConnection: "Municipal + Borewell",
      gasConnection: "Piped Natural Gas (PNG)",
      internetProvider: "Airtel Xstream Fiber",
      powerBackup: "100% DG Backup (3KVA)",
      waterTank: "Centralized"
    };
  }

  async getParkingDetails(): Promise<ParkingDetails> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      slots: [
        { slotNumber: "P-27", type: "COVERED", capacity: "1 Car + 1 Bike" },
        { slotNumber: "P-28", type: "COVERED", capacity: "1 Bike" }
      ],
      registeredVehicles: [
        { number: "KA 51 MH 1234", type: "CAR", make: "Honda", model: "City" },
        { number: "KA 51 EX 9876", type: "BIKE", make: "Royal Enfield", model: "Classic 350" }
      ],
      visitorRules: "Visitor vehicles must be parked in Level -2. Maximum duration: 12 hours. Overnight parking requires prior approval from the management office."
    };
  }

  async getSocietyInfo(): Promise<SocietyInfo> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      name: "Prestige Falcon City",
      address: "Kanakapura Road, Anjanadri Layout, Konanakunte, Bengaluru, Karnataka 560062",
      managementOffice: "Block A, Ground Floor",
      officeTiming: "Mon - Sat: 9:00 AM - 6:00 PM",
      maintenanceOffice: "Basement 1, Tower B",
      securityContact: "+91 98765 43210",
      emergencyContact: "1800-425-9999",
      email: "management@prestigefalconcity.in"
    };
  }

  async getRightPanelData(): Promise<RightPanelData> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      maintenanceStatus: "PENDING",
      currentDue: 3200,
      dueDate: "5th Aug 2026",
      recentNotice: {
        title: "Scheduled Power Cut on 25th July",
        date: "2026-07-22"
      },
      emergencyContacts: [
        { title: "Security Gate", number: "+91 98765 43210" },
        { title: "Maintenance", number: "+91 98765 43211" },
        { title: "Ambulance", number: "108" }
      ]
    };
  }

  async getFamilySummary(): Promise<FamilySummary> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      total: 4,
      adults: 2,
      children: 1,
      seniorCitizens: 1
    };
  }

  async getFamilyMembers(): Promise<FamilyMember[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        id: "FM-001",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Rajesh Patel&backgroundColor=00a3cc,7b68ee,FF5DA2",
        fullName: "Rajesh Patel",
        relationship: "Father",
        gender: "Male",
        dateOfBirth: "1966-04-12",
        age: 58,
        bloodGroup: "O+",
        phone: "+91 9876543222",
        email: "rajesh.patel@email.com",
        occupation: "Business Owner",
        emergencyContact: "+91 9876543210",
        status: "VERIFIED",
        memberSince: "Jan 2024",
        remarks: "Primary resident sponsor"
      },
      {
        id: "FM-002",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Smita Patel&backgroundColor=00c49a,FFD166",
        fullName: "Smita Patel",
        relationship: "Mother",
        gender: "Female",
        dateOfBirth: "1970-08-22",
        age: 54,
        bloodGroup: "B+",
        phone: "+91 9876543223",
        email: "smita.patel@email.com",
        occupation: "Homemaker",
        emergencyContact: "+91 9876543210",
        status: "VERIFIED",
        memberSince: "Jan 2024",
        remarks: "Allergic to penicillin"
      },
      {
        id: "FM-003",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Rahul Patel",
        fullName: "Rahul Patel",
        relationship: "Brother",
        gender: "Male",
        dateOfBirth: "1998-11-05",
        age: 27,
        bloodGroup: "O+",
        phone: "+91 9876543224",
        email: "rahul.p@email.com",
        occupation: "Software Engineer",
        emergencyContact: "+91 9876543222",
        status: "PENDING",
        memberSince: "Feb 2024",
        remarks: "ID verification pending"
      },
      {
        id: "FM-004",
        photoUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Aarav Patel",
        fullName: "Aarav Patel",
        relationship: "Son",
        gender: "Male",
        dateOfBirth: "2016-02-14",
        age: 8,
        bloodGroup: "A+",
        phone: "N/A",
        email: "N/A",
        occupation: "Student",
        emergencyContact: "+91 9876543210",
        status: "VERIFIED",
        memberSince: "Jan 2024",
        remarks: "School bus pickup"
      }
    ];
  }
}

export const myHomeService = new MyHomeService();

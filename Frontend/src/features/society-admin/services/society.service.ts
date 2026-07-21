// TODO: Replace with actual API endpoints
// Base URL: /api/v1/society

export interface Flat {
  id: string;
  number: string;
  type: string; // e.g., "2 BHK", "3 BHK"
  floor: number;
  status: "Occupied" | "Vacant" | "Rented";
  buildingId: string;
  ownerName?: string;
  tenantName?: string;
  hasParking: boolean;
  maintenanceDues: number;
}

export interface Building {
  id: string;
  name: string;
  totalFlats: number;
  occupiedFlats: number;
  floors: number;
  managerName: string;
  status: "Active" | "Maintenance";
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  capacity: number;
  status: "Available" | "Maintenance" | "Closed";
  image: string;
  rules: string[];
}

export interface ParkingSlot {
  id: string;
  slotNumber: string;
  type: "Resident" | "Visitor" | "EV";
  status: "Occupied" | "Vacant";
  flatId?: string;
  vehicleNumber?: string;
}

const mockBuildings: Building[] = [
  { id: "b1", name: "Tower A", totalFlats: 100, occupiedFlats: 92, floors: 20, managerName: "Ramesh Kumar", status: "Active" },
  { id: "b2", name: "Tower B", totalFlats: 120, occupiedFlats: 110, floors: 24, managerName: "Suresh Singh", status: "Active" },
  { id: "b3", name: "Tower C", totalFlats: 80, occupiedFlats: 45, floors: 16, managerName: "Amit Patel", status: "Maintenance" },
];

const mockFlats: Flat[] = Array.from({ length: 30 }).map((_, i) => {
  const buildingId = `b${(i % 3) + 1}`;
  const status = i % 5 === 0 ? "Vacant" : (i % 3 === 0 ? "Rented" : "Occupied");
  return {
    id: `f${i + 1}`,
    number: `${(i % 20) + 1}0${(i % 4) + 1}`,
    type: i % 2 === 0 ? "3 BHK" : "2 BHK",
    floor: (i % 20) + 1,
    status,
    buildingId,
    ownerName: status !== "Vacant" ? `Owner ${i + 1}` : undefined,
    tenantName: status === "Rented" ? `Tenant ${i + 1}` : undefined,
    hasParking: i % 4 !== 0,
    maintenanceDues: i % 6 === 0 ? 2500 : 0,
  };
});

const mockAmenities: Amenity[] = [
  { id: "a1", name: "Club House", description: "Premium club house with indoor games and lounge.", capacity: 50, status: "Available", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop", rules: ["No loud music after 10 PM", "Prior booking required for private events"] },
  { id: "a2", name: "Swimming Pool", description: "Olympic size swimming pool with temperature control.", capacity: 30, status: "Available", image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=600&auto=format&fit=crop", rules: ["Swimming cap mandatory", "Children must be accompanied by adults"] },
  { id: "a3", name: "Gymnasium", description: "Fully equipped modern gym.", capacity: 20, status: "Maintenance", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop", rules: ["Carry your own towel", "Wipe equipment after use"] },
  { id: "a4", name: "Central Park", description: "Lush green park with jogging track.", capacity: 100, status: "Available", image: "https://images.unsplash.com/photo-1588693895100-3444fc0521e8?q=80&w=600&auto=format&fit=crop", rules: ["Pets must be on leash", "Do not pluck flowers"] },
];

const mockParkingSlots: ParkingSlot[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `p${i + 1}`,
  slotNumber: `P-${String(i + 1).padStart(3, '0')}`,
  type: i < 5 ? "Visitor" : (i > 40 ? "EV" : "Resident"),
  status: i % 4 === 0 ? "Vacant" : "Occupied",
  flatId: i % 4 !== 0 ? `f${(i % 30) + 1}` : undefined,
  vehicleNumber: i % 4 !== 0 ? `KA 01 AB ${1000 + i}` : undefined,
}));

export const societyService = {
  async getBuildings(): Promise<Building[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockBuildings), 600));
  },
  async getBuildingById(id: string): Promise<Building | null> {
    return new Promise(resolve => setTimeout(() => resolve(mockBuildings.find(b => b.id === id) || null), 400));
  },
  async getFlats(buildingId?: string): Promise<Flat[]> {
    return new Promise(resolve => setTimeout(() => {
      resolve(buildingId ? mockFlats.filter(f => f.buildingId === buildingId) : mockFlats);
    }, 600));
  },
  async getFlatById(id: string): Promise<Flat | null> {
    return new Promise(resolve => setTimeout(() => resolve(mockFlats.find(f => f.id === id) || null), 400));
  },
  async getAmenities(): Promise<Amenity[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockAmenities), 600));
  },
  async getParkingSlots(): Promise<ParkingSlot[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockParkingSlots), 600));
  }
};

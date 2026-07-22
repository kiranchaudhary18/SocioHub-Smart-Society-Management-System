export type AmenityCategory = "Sports" | "Fitness" | "Leisure" | "Events" | "Kids";
export type BookingStatus = "UPCOMING" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "PENDING" | "EXPIRED";
export type IndoorOutdoor = "Indoor" | "Outdoor";

export interface Amenity {
  id: string;
  name: string;
  category: AmenityCategory;
  type: IndoorOutdoor;
  capacity: number;
  openingTime: string;
  closingTime: string;
  rating: number;
  reviewCount: number;
  description: string;
  facilities: string[];
  rules: string[];
  hourlyRate: number;
  maxBookingHours: number;
  imagePlaceholder: string;
}

export interface AmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM - 12:00 PM"
  durationHours: number;
  guests: number;
  status: BookingStatus;
  paymentStatus: "PAID" | "PENDING" | "FREE";
  amount: number;
  specialInstructions?: string;
  qrPassCode?: string;
}

export interface ExploreKPIs {
  totalAmenities: number;
  availableToday: number;
  bookedToday: number;
  upcomingReservations: number;
}

export interface BookingOverviewKPIs {
  upcoming: number;
  completed: number;
  cancelled: number;
  thisMonth: number;
}

const mockAmenities: Amenity[] = [
  {
    id: "AMN-001",
    name: "Olympic Swimming Pool",
    category: "Fitness",
    type: "Outdoor",
    capacity: 30,
    openingTime: "06:00 AM",
    closingTime: "10:00 PM",
    rating: 4.8,
    reviewCount: 124,
    description: "A temperature-controlled olympic size swimming pool with separate kids wading area and professional lifeguards on duty.",
    facilities: ["Shower Rooms", "Lockers", "Towels", "Lifeguard"],
    rules: ["Proper swimwear mandatory", "Shower before entering", "No food/drinks near pool", "Children must be accompanied"],
    hourlyRate: 0,
    maxBookingHours: 2,
    imagePlaceholder: "bg-cyan-500/20"
  },
  {
    id: "AMN-002",
    name: "Grand Party Hall",
    category: "Events",
    type: "Indoor",
    capacity: 150,
    openingTime: "09:00 AM",
    closingTime: "11:30 PM",
    rating: 4.9,
    reviewCount: 86,
    description: "Luxurious air-conditioned community hall perfect for birthday parties, small weddings, and society get-togethers.",
    facilities: ["Air Conditioning", "Stage", "Pantry", "Music System", "Chairs/Tables"],
    rules: ["No loud music after 10 PM", "Deposit required", "Clean up after use"],
    hourlyRate: 1500,
    maxBookingHours: 12,
    imagePlaceholder: "bg-purple-500/20"
  },
  {
    id: "AMN-003",
    name: "Elite Fitness Gym",
    category: "Fitness",
    type: "Indoor",
    capacity: 25,
    openingTime: "05:00 AM",
    closingTime: "11:00 PM",
    rating: 4.7,
    reviewCount: 210,
    description: "State-of-the-art gymnasium equipped with the latest cardio and weight training machines.",
    facilities: ["Cardio Section", "Free Weights", "Air Conditioning", "Water Dispenser"],
    rules: ["Gym shoes mandatory", "Wipe equipment after use", "Re-rack weights"],
    hourlyRate: 0,
    maxBookingHours: 2,
    imagePlaceholder: "bg-amber-500/20"
  },
  {
    id: "AMN-004",
    name: "Synthetic Tennis Court",
    category: "Sports",
    type: "Outdoor",
    capacity: 4,
    openingTime: "06:00 AM",
    closingTime: "10:00 PM",
    rating: 4.5,
    reviewCount: 45,
    description: "Professional synthetic surface tennis court with floodlights for evening play.",
    facilities: ["Floodlights", "Seating Area", "Water Cooler"],
    rules: ["Non-marking shoes only", "Max 4 players per slot", "Advance booking required"],
    hourlyRate: 100,
    maxBookingHours: 2,
    imagePlaceholder: "bg-emerald-500/20"
  },
  {
    id: "AMN-005",
    name: "Serenity Yoga Room",
    category: "Fitness",
    type: "Indoor",
    capacity: 15,
    openingTime: "05:00 AM",
    closingTime: "08:00 PM",
    rating: 4.9,
    reviewCount: 62,
    description: "A peaceful, naturally lit room dedicated to yoga and meditation with wooden flooring.",
    facilities: ["Yoga Mats", "Air Purifier", "Ambient Lighting"],
    rules: ["Maintain silence", "No shoes inside", "Clean mats after use"],
    hourlyRate: 0,
    maxBookingHours: 1,
    imagePlaceholder: "bg-rose-500/20"
  }
];

let mockBookings: AmenityBooking[] = [
  {
    id: "BK-2607-101",
    amenityId: "AMN-002",
    amenityName: "Grand Party Hall",
    bookingDate: "2026-08-15",
    timeSlot: "04:00 PM - 10:00 PM",
    durationHours: 6,
    guests: 80,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    amount: 9000,
    specialInstructions: "Require extra chairs for elderly guests.",
    qrPassCode: "QR-BK101"
  },
  {
    id: "BK-2607-098",
    amenityId: "AMN-004",
    amenityName: "Synthetic Tennis Court",
    bookingDate: "2026-07-25",
    timeSlot: "06:00 AM - 08:00 AM",
    durationHours: 2,
    guests: 2,
    status: "UPCOMING",
    paymentStatus: "PAID",
    amount: 200,
    qrPassCode: "QR-BK098"
  },
  {
    id: "BK-2606-250",
    amenityId: "AMN-001",
    amenityName: "Olympic Swimming Pool",
    bookingDate: "2026-07-10",
    timeSlot: "07:00 AM - 08:00 AM",
    durationHours: 1,
    guests: 1,
    status: "COMPLETED",
    paymentStatus: "FREE",
    amount: 0
  },
  {
    id: "BK-2606-210",
    amenityId: "AMN-003",
    amenityName: "Elite Fitness Gym",
    bookingDate: "2026-07-05",
    timeSlot: "06:00 PM - 07:00 PM",
    durationHours: 1,
    guests: 1,
    status: "CANCELLED",
    paymentStatus: "FREE",
    amount: 0
  }
];

class AmenityService {
  async getExploreKPIs(): Promise<ExploreKPIs> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalAmenities: mockAmenities.length,
      availableToday: mockAmenities.length - 1, // mock logic
      bookedToday: 8,
      upcomingReservations: mockBookings.filter(b => b.status === "UPCOMING" || b.status === "CONFIRMED").length
    };
  }

  async getAmenities(): Promise<Amenity[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockAmenities];
  }

  async getBookingKPIs(): Promise<BookingOverviewKPIs> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const upcoming = mockBookings.filter(b => b.status === "UPCOMING" || b.status === "CONFIRMED").length;
    const completed = mockBookings.filter(b => b.status === "COMPLETED").length;
    const cancelled = mockBookings.filter(b => b.status === "CANCELLED").length;
    return { upcoming, completed, cancelled, thisMonth: upcoming + completed };
  }

  async getMyBookings(): Promise<AmenityBooking[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    // Sort by date, newest first
    return [...mockBookings].sort((a, b) => new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime());
  }

  async bookAmenity(data: { amenityId: string, bookingDate: string, timeSlot: string, guests: number, specialInstructions?: string }): Promise<AmenityBooking> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const amenity = mockAmenities.find(a => a.id === data.amenityId);
    if (!amenity) throw new Error("Amenity not found");

    const newId = `BK-${new Date().getFullYear()}${new Date().getMonth() + 1}-${Math.floor(100 + Math.random() * 900)}`;
    const newBooking: AmenityBooking = {
      id: newId,
      amenityId: amenity.id,
      amenityName: amenity.name,
      bookingDate: data.bookingDate,
      timeSlot: data.timeSlot,
      durationHours: 2, // mock standard
      guests: data.guests,
      status: "CONFIRMED", // auto confirm for mock
      paymentStatus: amenity.hourlyRate > 0 ? "PAID" : "FREE",
      amount: amenity.hourlyRate * 2,
      specialInstructions: data.specialInstructions,
      qrPassCode: `QR-${newId}`
    };

    mockBookings.push(newBooking);
    return newBooking;
  }

  async cancelBooking(bookingId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const idx = mockBookings.findIndex(b => b.id === bookingId);
    if (idx > -1) {
      mockBookings[idx].status = "CANCELLED";
    }
  }
}

export const amenityService = new AmenityService();

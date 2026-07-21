export type UtilityType = "WATER" | "ELECTRICITY" | "GAS" | "COMMON_AREA" | "GENERATOR";
export type UtilityStatus = "PAID" | "PENDING" | "OVERDUE";

export interface UtilityBill {
  id: string;
  type: UtilityType;
  residentName: string;
  building: string;
  flat: string;
  consumption: number; // in units (Liters, kWh, etc.)
  unit: string;
  amount: number;
  dueDate: string;
  status: UtilityStatus;
  month: string;
  year: number;
}

export interface UtilityStats {
  waterBills: number;
  electricityBills: number;
  gasBills: number;
  pendingBillsCount: number;
  paidBillsCount: number;
  overdueBillsCount: number;
}

const mockUtilityBills: UtilityBill[] = [
  {
    id: "UB-3401",
    type: "WATER",
    residentName: "Aarav Sharma",
    building: "Block A",
    flat: "A-204",
    consumption: 15000,
    unit: "L",
    amount: 750,
    dueDate: "15 Jul 2026",
    status: "PAID",
    month: "July",
    year: 2026
  },
  {
    id: "UB-3402",
    type: "ELECTRICITY",
    residentName: "Priya Desai",
    building: "Block C",
    flat: "C-501",
    consumption: 420,
    unit: "kWh",
    amount: 3360,
    dueDate: "15 Jul 2026",
    status: "PENDING",
    month: "July",
    year: 2026
  },
  {
    id: "UB-3403",
    type: "GAS",
    residentName: "Vikram Singh",
    building: "Block B",
    flat: "B-105",
    consumption: 12.5,
    unit: "kg",
    amount: 1125,
    dueDate: "15 Jun 2026",
    status: "OVERDUE",
    month: "June",
    year: 2026
  },
  {
    id: "UB-3404",
    type: "ELECTRICITY",
    residentName: "Neha Gupta",
    building: "Block A",
    flat: "A-302",
    consumption: 280,
    unit: "kWh",
    amount: 2240,
    dueDate: "15 Jul 2026",
    status: "PAID",
    month: "July",
    year: 2026
  },
  {
    id: "UB-3405",
    type: "COMMON_AREA",
    residentName: "Society Account",
    building: "All",
    flat: "N/A",
    consumption: 4500,
    unit: "kWh",
    amount: 36000,
    dueDate: "20 Jul 2026",
    status: "PENDING",
    month: "July",
    year: 2026
  }
];

const mockConsumptionData = [
  { name: 'Jan', water: 420, electricity: 1200, gas: 35 },
  { name: 'Feb', water: 415, electricity: 1150, gas: 32 },
  { name: 'Mar', water: 430, electricity: 1250, gas: 34 },
  { name: 'Apr', water: 450, electricity: 1400, gas: 33 },
  { name: 'May', water: 480, electricity: 1650, gas: 31 }, // Summer peak
  { name: 'Jun', water: 460, electricity: 1550, gas: 32 },
  { name: 'Jul', water: 440, electricity: 1450, gas: 33 },
];

class UtilityService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getBills(): Promise<UtilityBill[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockUtilityBills), 500));
  }

  async getStats(): Promise<UtilityStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      waterBills: 120,
      electricityBills: 120,
      gasBills: 95,
      pendingBillsCount: 45,
      paidBillsCount: 280,
      overdueBillsCount: 10
    }), 500));
  }

  async getConsumptionData() {
    return new Promise(resolve => setTimeout(() => resolve(mockConsumptionData), 500));
  }
}

export const utilityService = new UtilityService();

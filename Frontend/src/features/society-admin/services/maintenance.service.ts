export type InvoiceStatus = "PAID" | "PENDING" | "OVERDUE" | "PARTIAL";

export interface Invoice {
  id: string;
  residentName: string;
  building: string;
  flat: string;
  month: string;
  year: number;
  baseAmount: number;
  penalty: number;
  totalAmount: number;
  amountPaid: number;
  dueDate: string;
  paymentDate?: string;
  status: InvoiceStatus;
}

export interface MaintenanceStats {
  monthlyCollection: number;
  pendingAmount: number;
  paidAmount: number;
  overdueAmount: number;
  collectionRate: number;
  invoicesGenerated: number;
}

const mockInvoices: Invoice[] = [
  {
    id: "INV-2612",
    residentName: "Aarav Sharma",
    building: "Block A",
    flat: "A-204",
    month: "July",
    year: 2026,
    baseAmount: 3500,
    penalty: 0,
    totalAmount: 3500,
    amountPaid: 3500,
    dueDate: "10 Jul 2026",
    paymentDate: "05 Jul 2026",
    status: "PAID"
  },
  {
    id: "INV-2611",
    residentName: "Priya Desai",
    building: "Block C",
    flat: "C-501",
    month: "July",
    year: 2026,
    baseAmount: 4200,
    penalty: 0,
    totalAmount: 4200,
    amountPaid: 0,
    dueDate: "10 Jul 2026",
    status: "PENDING"
  },
  {
    id: "INV-2610",
    residentName: "Vikram Singh",
    building: "Block B",
    flat: "B-105",
    month: "June",
    year: 2026,
    baseAmount: 3000,
    penalty: 300,
    totalAmount: 3300,
    amountPaid: 0,
    dueDate: "10 Jun 2026",
    status: "OVERDUE"
  },
  {
    id: "INV-2609",
    residentName: "Neha Gupta",
    building: "Block A",
    flat: "A-302",
    month: "July",
    year: 2026,
    baseAmount: 3500,
    penalty: 0,
    totalAmount: 3500,
    amountPaid: 1500,
    dueDate: "10 Jul 2026",
    paymentDate: "08 Jul 2026",
    status: "PARTIAL"
  },
  {
    id: "INV-2608",
    residentName: "Sanjay Patel",
    building: "Block C",
    flat: "C-202",
    month: "July",
    year: 2026,
    baseAmount: 4200,
    penalty: 0,
    totalAmount: 4200,
    amountPaid: 4200,
    dueDate: "10 Jul 2026",
    paymentDate: "09 Jul 2026",
    status: "PAID"
  }
];

const mockChartData = [
  { name: 'Jan', collected: 145000, pending: 15000 },
  { name: 'Feb', collected: 148000, pending: 12000 },
  { name: 'Mar', collected: 152000, pending: 8000 },
  { name: 'Apr', collected: 149000, pending: 11000 },
  { name: 'May', collected: 155000, pending: 5000 },
  { name: 'Jun', collected: 140000, pending: 20000 },
  { name: 'Jul', collected: 95000, pending: 65000 }, // Current month in progress
];

class MaintenanceService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getInvoices(): Promise<Invoice[]> {
    return new Promise(resolve => setTimeout(() => resolve(mockInvoices), 500));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    return new Promise(resolve => setTimeout(() => resolve(
      mockInvoices.find(inv => inv.id === id)
    ), 500));
  }

  async getStats(): Promise<MaintenanceStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      monthlyCollection: 825000, // Year to date
      pendingAmount: 65000,
      paidAmount: 95000, // This month
      overdueAmount: 18500,
      collectionRate: 88.5,
      invoicesGenerated: 450
    }), 500));
  }

  async getChartData() {
    return new Promise(resolve => setTimeout(() => resolve(mockChartData), 500));
  }
}

export const maintenanceService = new MaintenanceService();

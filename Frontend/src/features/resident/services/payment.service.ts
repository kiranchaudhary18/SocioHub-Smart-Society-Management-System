export interface MaintenanceKPIs {
  currentDue: number;
  paidThisYear: number;
  pendingBills: number;
  nextDueDate: string;
}

export interface MaintenanceBill {
  invoiceNo: string;
  billingMonth: string;
  dueDate: string;
  amount: number;
  lateFee: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  breakdown: {
    baseCharges: number;
    sinkingFund: number;
    waterCharges: number;
    parkingCharges: number;
  };
  resident: string;
  flatNumber: string;
  paymentDate?: string;
  gst: number;
}

export interface UtilityKPIs {
  waterBill: number;
  electricityBill: number;
  gasBill: number;
  otherCharges: number;
}

export interface UtilityBill {
  billNumber: string;
  utilityType: "Water" | "Electricity" | "Gas";
  billingMonth: string;
  consumption: string;
  amount: number;
  status: "PAID" | "PENDING" | "OVERDUE";
  meterReading: {
    previous: string;
    current: string;
  };
  tax: number;
}

export interface HistoryKPIs {
  totalPayments: number;
  paymentsThisYear: number;
  averageMonthly: number;
  successfulTransactions: number;
}

export interface PaymentTransaction {
  transactionId: string;
  invoiceNumber: string;
  paymentType: "Maintenance" | "Water" | "Electricity" | "Gas" | "Other";
  amount: number;
  paymentMethod: "UPI" | "Credit Card" | "Debit Card" | "Net Banking";
  paymentDate: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  receiptNumber?: string;
  paymentGateway: string;
  referenceNumber: string;
}

class PaymentService {
  // Maintenance Bills
  async getMaintenanceKPIs(): Promise<MaintenanceKPIs> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      currentDue: 3500,
      paidThisYear: 24500,
      pendingBills: 1,
      nextDueDate: "5th Aug 2026",
    };
  }

  async getMaintenanceBills(): Promise<MaintenanceBill[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        invoiceNo: "INV-2026-07-001",
        billingMonth: "July 2026",
        dueDate: "2026-08-05",
        amount: 3500,
        lateFee: 0,
        status: "PENDING",
        breakdown: {
          baseCharges: 2500,
          sinkingFund: 500,
          waterCharges: 300,
          parkingCharges: 200,
        },
        resident: "Rajesh Patel",
        flatNumber: "B-504",
        gst: 630,
      },
      {
        invoiceNo: "INV-2026-06-001",
        billingMonth: "June 2026",
        dueDate: "2026-07-05",
        amount: 3500,
        lateFee: 0,
        status: "PAID",
        breakdown: {
          baseCharges: 2500,
          sinkingFund: 500,
          waterCharges: 300,
          parkingCharges: 200,
        },
        resident: "Rajesh Patel",
        flatNumber: "B-504",
        paymentDate: "2026-07-02",
        gst: 630,
      },
      {
        invoiceNo: "INV-2026-05-001",
        billingMonth: "May 2026",
        dueDate: "2026-06-05",
        amount: 3500,
        lateFee: 0,
        status: "PAID",
        breakdown: {
          baseCharges: 2500,
          sinkingFund: 500,
          waterCharges: 300,
          parkingCharges: 200,
        },
        resident: "Rajesh Patel",
        flatNumber: "B-504",
        paymentDate: "2026-06-04",
        gst: 630,
      }
    ];
  }

  // Utility Bills
  async getUtilityKPIs(): Promise<UtilityKPIs> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      waterBill: 450,
      electricityBill: 1250,
      gasBill: 600,
      otherCharges: 0,
    };
  }

  async getUtilityBills(): Promise<UtilityBill[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        billNumber: "UB-W-2607",
        utilityType: "Water",
        billingMonth: "July 2026",
        consumption: "15,000 L",
        amount: 450,
        status: "PENDING",
        meterReading: {
          previous: "45000",
          current: "60000",
        },
        tax: 22.5,
      },
      {
        billNumber: "UB-E-2607",
        utilityType: "Electricity",
        billingMonth: "July 2026",
        consumption: "250 kWh",
        amount: 1250,
        status: "PAID",
        meterReading: {
          previous: "12500",
          current: "12750",
        },
        tax: 62.5,
      },
      {
        billNumber: "UB-G-2607",
        utilityType: "Gas",
        billingMonth: "July 2026",
        consumption: "12 SCM",
        amount: 600,
        status: "PAID",
        meterReading: {
          previous: "800",
          current: "812",
        },
        tax: 30,
      }
    ];
  }

  // Payment History
  async getHistoryKPIs(): Promise<HistoryKPIs> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      totalPayments: 18,
      paymentsThisYear: 7,
      averageMonthly: 5350,
      successfulTransactions: 17,
    };
  }

  async getPaymentHistory(): Promise<PaymentTransaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [
      {
        transactionId: "TXN-88492011",
        invoiceNumber: "INV-2026-06-001",
        paymentType: "Maintenance",
        amount: 4130, // 3500 + 630 tax
        paymentMethod: "UPI",
        paymentDate: "2026-07-02T14:30:00Z",
        status: "SUCCESS",
        receiptNumber: "RCT-99120",
        paymentGateway: "Razorpay",
        referenceNumber: "pay_XYZ123456789",
      },
      {
        transactionId: "TXN-88492010",
        invoiceNumber: "UB-E-2607",
        paymentType: "Electricity",
        amount: 1312.5, // 1250 + 62.5 tax
        paymentMethod: "Credit Card",
        paymentDate: "2026-07-02T14:35:00Z",
        status: "SUCCESS",
        receiptNumber: "RCT-99121",
        paymentGateway: "Stripe",
        referenceNumber: "ch_ABC987654321",
      },
      {
        transactionId: "TXN-88491950",
        invoiceNumber: "UB-G-2607",
        paymentType: "Gas",
        amount: 630, 
        paymentMethod: "UPI",
        paymentDate: "2026-07-02T14:38:00Z",
        status: "FAILED",
        paymentGateway: "Razorpay",
        referenceNumber: "pay_DEF123456789",
      },
      {
        transactionId: "TXN-88491800",
        invoiceNumber: "INV-2026-05-001",
        paymentType: "Maintenance",
        amount: 4130, 
        paymentMethod: "Net Banking",
        paymentDate: "2026-06-04T09:15:00Z",
        status: "SUCCESS",
        receiptNumber: "RCT-98800",
        paymentGateway: "BillDesk",
        referenceNumber: "NB_HDFC_009988",
      }
    ];
  }
}

export const paymentService = new PaymentService();

// Mock data interfaces for the Reports & Analytics dashboard

export interface KPIStats {
  totalResidents: { value: number; trend: number };
  occupancyRate: { value: number; trend: number }; // percentage
  maintenanceCollection: { value: number; trend: number }; // percentage
  pendingDues: { value: number; trend: number }; // in Rs
  complaintsResolved: { value: number; trend: number }; // percentage
  visitorCount: { value: number; trend: number };
  eventsConducted: { value: number; trend: number };
  staffAttendance: { value: number; trend: number }; // percentage
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface GeneratedReport {
  id: string;
  name: string;
  type: string;
  generatedBy: string;
  generatedDate: string;
  size: string;
  status: 'READY' | 'PENDING' | 'FAILED';
}

class ReportsService {
  // TODO: Replace with Spring Boot REST API calls
  
  async getKPIs(): Promise<KPIStats> {
    return new Promise(resolve => setTimeout(() => resolve({
      totalResidents: { value: 845, trend: 2.4 },
      occupancyRate: { value: 92, trend: 1.5 },
      maintenanceCollection: { value: 88, trend: 4.2 },
      pendingDues: { value: 450000, trend: -12.5 },
      complaintsResolved: { value: 95, trend: 3.1 },
      visitorCount: { value: 1240, trend: 15.2 },
      eventsConducted: { value: 12, trend: 0 },
      staffAttendance: { value: 96, trend: 1.1 }
    }), 800));
  }

  async getFinancialTrend(): Promise<ChartDataPoint[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { name: 'Jan', collected: 1200000, pending: 300000 },
      { name: 'Feb', collected: 1350000, pending: 250000 },
      { name: 'Mar', collected: 1400000, pending: 200000 },
      { name: 'Apr', collected: 1250000, pending: 350000 },
      { name: 'May', collected: 1500000, pending: 150000 },
      { name: 'Jun', collected: 1450000, pending: 180000 },
      { name: 'Jul', collected: 1600000, pending: 100000 },
    ]), 800));
  }

  async getPaymentDistribution(): Promise<ChartDataPoint[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { name: 'UPI', value: 65, fill: '#72F1D1' },
      { name: 'Bank Transfer', value: 25, fill: '#8F7CFF' },
      { name: 'Cash', value: 10, fill: '#FFD166' },
    ]), 800));
  }
  
  async getRevenueByBuilding(): Promise<ChartDataPoint[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { name: 'Block A', revenue: 450000 },
      { name: 'Block B', revenue: 520000 },
      { name: 'Block C', revenue: 380000 },
      { name: 'Block D', revenue: 410000 },
    ]), 800));
  }

  async getResidentDemographics(): Promise<{type: ChartDataPoint[], occupancy: ChartDataPoint[]}> {
    return new Promise(resolve => setTimeout(() => resolve({
      type: [
        { name: 'Owners', value: 60, fill: '#72F1D1' },
        { name: 'Tenants', value: 40, fill: '#8F7CFF' },
      ],
      occupancy: [
        { name: 'Block A', occupied: 95, vacant: 5 },
        { name: 'Block B', occupied: 88, vacant: 12 },
        { name: 'Block C', occupied: 92, vacant: 8 },
        { name: 'Block D', occupied: 100, vacant: 0 },
      ]
    }), 800));
  }

  async getComplaintAnalytics(): Promise<{trend: ChartDataPoint[], category: ChartDataPoint[]}> {
    return new Promise(resolve => setTimeout(() => resolve({
      trend: [
        { name: 'Mon', resolved: 12, new: 15 },
        { name: 'Tue', resolved: 18, new: 10 },
        { name: 'Wed', resolved: 15, new: 12 },
        { name: 'Thu', resolved: 22, new: 8 },
        { name: 'Fri', resolved: 20, new: 14 },
        { name: 'Sat', resolved: 8, new: 25 },
        { name: 'Sun', resolved: 5, new: 18 },
      ],
      category: [
        { name: 'Plumbing', value: 35 },
        { name: 'Electrical', value: 25 },
        { name: 'Carpentry', value: 15 },
        { name: 'Cleaning', value: 20 },
        { name: 'Security', value: 5 },
      ]
    }), 800));
  }

  async getVisitorTrend(): Promise<ChartDataPoint[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { name: '08:00', visitors: 15 },
      { name: '10:00', visitors: 45 },
      { name: '12:00', visitors: 30 },
      { name: '14:00', visitors: 25 },
      { name: '16:00', visitors: 55 },
      { name: '18:00', visitors: 85 }, // Delivery peak
      { name: '20:00', visitors: 40 },
    ]), 800));
  }

  async getWorkforceAnalytics(): Promise<ChartDataPoint[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { name: 'Security', present: 98, absent: 2 },
      { name: 'Housekeeping', present: 85, absent: 15 },
      { name: 'Maintenance', present: 92, absent: 8 },
      { name: 'Admin', present: 100, absent: 0 },
    ]), 800));
  }

  async getRecentReports(): Promise<GeneratedReport[]> {
    return new Promise(resolve => setTimeout(() => resolve([
      { id: 'REP-001', name: 'Q2 Financial Summary', type: 'FINANCIAL', generatedBy: 'System', generatedDate: '01 Jul 2026', size: '2.4 MB', status: 'READY' },
      { id: 'REP-002', name: 'June Maintenance Defaulters', type: 'MAINTENANCE', generatedBy: 'Admin', generatedDate: '05 Jul 2026', size: '1.1 MB', status: 'READY' },
      { id: 'REP-003', name: 'Visitor Log Export (Weekly)', type: 'VISITOR', generatedBy: 'Security Head', generatedDate: '18 Jul 2026', size: '4.8 MB', status: 'READY' },
      { id: 'REP-004', name: 'Staff Attendance Report', type: 'WORKFORCE', generatedBy: 'Admin', generatedDate: '21 Jul 2026', size: '-', status: 'PENDING' },
    ]), 800));
  }
}

export const reportsService = new ReportsService();

const fs = require('fs');
const path = require('path');

const pages = [
  { dir: 'dashboard', name: 'DashboardPage', title: 'Dashboard', sub: 'Overview of your society', crumbs: [{label: 'Dashboard'}] },
  { dir: 'home', name: 'MyFlatPage', title: 'My Flat', sub: 'Manage your flat details', crumbs: [{label: 'My Home'}, {label: 'My Flat'}] },
  { dir: 'home', name: 'FamilyMembersPage', title: 'Family Members', sub: 'Manage your family members', crumbs: [{label: 'My Home'}, {label: 'Family Members'}] },
  { dir: 'visitors', name: 'VisitorPassesPage', title: 'Visitor Passes', sub: 'Pre-approve your guests', crumbs: [{label: 'Visitors'}, {label: 'Visitor Passes'}] },
  { dir: 'visitors', name: 'VisitorHistoryPage', title: 'Visitor History', sub: 'View past visitors', crumbs: [{label: 'Visitors'}, {label: 'Visitor History'}] },
  { dir: 'visitors', name: 'VisitorDetailsPage', title: 'Visitor Details', sub: 'View visitor details', crumbs: [{label: 'Visitors'}, {label: 'Details'}] },
  { dir: 'payments', name: 'MaintenanceBillsPage', title: 'Maintenance Bills', sub: 'View and pay maintenance', crumbs: [{label: 'Payments'}, {label: 'Maintenance Bills'}] },
  { dir: 'payments', name: 'UtilityBillsPage', title: 'Utility Bills', sub: 'View and pay utility bills', crumbs: [{label: 'Payments'}, {label: 'Utility Bills'}] },
  { dir: 'payments', name: 'PaymentHistoryPage', title: 'Payment History', sub: 'View past payments', crumbs: [{label: 'Payments'}, {label: 'Payment History'}] },
  { dir: 'payments', name: 'PaymentDetailsPage', title: 'Payment Details', sub: 'View payment details', crumbs: [{label: 'Payments'}, {label: 'Details'}] },
  { dir: 'complaints', name: 'ComplaintsPage', title: 'Complaints', sub: 'Raise and track complaints', crumbs: [{label: 'Complaints'}] },
  { dir: 'complaints', name: 'ComplaintDetailsPage', title: 'Complaint Details', sub: 'View complaint details', crumbs: [{label: 'Complaints'}, {label: 'Details'}] },
  { dir: 'amenities', name: 'ExploreAmenitiesPage', title: 'Explore Amenities', sub: 'View and book society amenities', crumbs: [{label: 'Amenities'}, {label: 'Explore'}] },
  { dir: 'amenities', name: 'MyBookingsPage', title: 'My Bookings', sub: 'Manage your amenity bookings', crumbs: [{label: 'Amenities'}, {label: 'My Bookings'}] },
  { dir: 'amenities', name: 'BookingDetailsPage', title: 'Booking Details', sub: 'View booking details', crumbs: [{label: 'Amenities'}, {label: 'Details'}] },
  { dir: 'community', name: 'NoticesPage', title: 'Notices', sub: 'Important society announcements', crumbs: [{label: 'Community'}, {label: 'Notices'}] },
  { dir: 'community', name: 'EventsPage', title: 'Events', sub: 'Upcoming society events', crumbs: [{label: 'Community'}, {label: 'Events'}] },
  { dir: 'community', name: 'PollsPage', title: 'Polls & Surveys', sub: 'Participate in society polls', crumbs: [{label: 'Community'}, {label: 'Polls'}] },
  { dir: 'community', name: 'NoticeDetailsPage', title: 'Notice Details', sub: 'View notice details', crumbs: [{label: 'Community'}, {label: 'Notices'}, {label: 'Details'}] },
  { dir: 'community', name: 'EventDetailsPage', title: 'Event Details', sub: 'View event details', crumbs: [{label: 'Community'}, {label: 'Events'}, {label: 'Details'}] },
  { dir: 'community', name: 'PollDetailsPage', title: 'Poll Details', sub: 'View poll details', crumbs: [{label: 'Community'}, {label: 'Polls'}, {label: 'Details'}] },
  { dir: 'documents', name: 'DocumentsPage', title: 'Documents', sub: 'Access society documents', crumbs: [{label: 'Documents'}] },
  { dir: 'documents', name: 'DocumentPreviewPage', title: 'Document Preview', sub: 'Preview document', crumbs: [{label: 'Documents'}, {label: 'Preview'}] },
  { dir: 'profile', name: 'ProfilePage', title: 'My Profile', sub: 'Manage your personal details', crumbs: [{label: 'Profile'}] },
];

const basePath = path.join(__dirname, 'src', 'features', 'resident', 'pages');

pages.forEach(page => {
  const fileContent = `import { PlaceholderPage } from "../../components/layout/PlaceholderPage";

export default function ${page.name}() {
  return (
    <PlaceholderPage 
      title="${page.title}"
      subtitle="${page.sub}"
      breadcrumbs={${JSON.stringify(page.crumbs)}}
    />
  );
}
`;
  const fullPath = path.join(basePath, page.dir, `${page.name}.tsx`);
  fs.writeFileSync(fullPath, fileContent, 'utf8');
});

console.log('Generated all pages successfully!');

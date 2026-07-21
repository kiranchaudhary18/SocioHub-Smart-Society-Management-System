const fs = require('fs');

function replaceInFile(path, replacer) {
  const content = fs.readFileSync(path, 'utf8');
  const newContent = replacer(content);
  if(content !== newContent) fs.writeFileSync(path, newContent);
}

replaceInFile('src/features/super-admin/components/layout/Topbar.tsx', c => c.replace('CheckCircle2, ', ''));

replaceInFile('src/features/super-admin/components/widgets/PlatformStatus.tsx', c => c.replace('services.map((service, index)', 'services.map((service: any, index: number)'));

replaceInFile('src/features/super-admin/pages/AllSocietiesPage.tsx', c => c.replace('Search, Filter, Plus, Building2, MapPin, Users, CreditCard, ShieldCheck', 'Search, Plus, Building2, MapPin, Users, ShieldCheck'));

replaceInFile('src/features/super-admin/pages/AnalyticsPage.tsx', c => c.replace('BarChart3, Download, FileText, Calendar,', 'Download, FileText, Calendar,').replace('AlertTriangle, MessageSquare', 'AlertTriangle').replace('(entry, index)', '(_, index)'));

replaceInFile('src/features/super-admin/pages/AnnouncementsPage.tsx', c => c.replace('import * as Tooltip from "@radix-ui/react-tooltip";', '').replace('<Users className="w-4 h-4" />', '<span className="w-4 h-4" />'));

replaceInFile('src/features/super-admin/pages/CreateSocietyPage.tsx', c => c.replace('FileText, MapPin, Users, ShieldCheck, CreditCard, CheckCircle2', 'FileText, MapPin, Users, ShieldCheck, CheckCircle2'));

replaceInFile('src/features/super-admin/pages/PendingApprovalsPage.tsx', c => c.replace('documents.map((doc, idx)', 'documents.map((doc: any, idx: number)'));

replaceInFile('src/features/super-admin/pages/PlatformUsersPage.tsx', c => c.replace('TrendingUp, TrendingDown, MoreHorizontal, User,', 'TrendingUp, TrendingDown,').replace('UserCog, Shield, Building2, Eye, ShieldAlert,', 'UserCog, Eye, ShieldAlert,'));

replaceInFile('src/features/super-admin/pages/SocietyAdminsPage.tsx', c => c.replace('Search, Filter, Plus, ShieldCheck, Phone, Mail', 'Search, Plus, ShieldCheck, Phone, Mail'));

replaceInFile('src/features/super-admin/pages/SocietyDetailsPage.tsx', c => c.replace('Building2, MapPin, Users, ShieldCheck, CreditCard, Activity,', 'Building2, MapPin, Users, ShieldCheck, Activity,'));

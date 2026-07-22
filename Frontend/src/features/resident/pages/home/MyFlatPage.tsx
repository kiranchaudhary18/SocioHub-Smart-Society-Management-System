import { PlaceholderPage } from "../../components/layout/PlaceholderPage";

export default function MyFlatPage() {
  return (
    <PlaceholderPage 
      title="My Flat"
      subtitle="Manage your flat details"
      breadcrumbs={[{"label":"My Home"},{"label":"My Flat"}]}
    />
  );
}

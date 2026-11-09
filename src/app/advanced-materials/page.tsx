import { BusinessPage, businessMetadata } from "@/components/business/business-page";

export const metadata = businessMetadata("advanced-materials");

export default function Page() {
  return <BusinessPage slug="advanced-materials" />;
}

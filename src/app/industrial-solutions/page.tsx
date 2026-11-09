import { BusinessPage, businessMetadata } from "@/components/business/business-page";

export const metadata = businessMetadata("industrial-solutions");

export default function Page() {
  return <BusinessPage slug="industrial-solutions" />;
}

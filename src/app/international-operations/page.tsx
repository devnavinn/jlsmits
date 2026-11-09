import { BusinessPage, businessMetadata } from "@/components/business/business-page";

export const metadata = businessMetadata("international-operations");

export default function Page() {
  return <BusinessPage slug="international-operations" />;
}

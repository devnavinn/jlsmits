import { BusinessPage, businessMetadata } from "@/components/business/business-page";

export const metadata = businessMetadata("commerce-consumer");

export default function Page() {
  return <BusinessPage slug="commerce-consumer" />;
}

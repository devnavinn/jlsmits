import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — JLSmith Group",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return children;
}

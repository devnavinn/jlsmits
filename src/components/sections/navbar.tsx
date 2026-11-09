import { navLinks } from "@/lib/data";
import { getBusinessPages } from "@/lib/content";
import { NavbarClient } from "@/components/sections/navbar-client";

/** Loads the Business menu from the database and hands the links to the interactive navbar. */
export async function Navbar() {
  const businesses = await getBusinessPages();
  const links = navLinks.map((link) =>
    link.href === "/business"
      ? { ...link, children: businesses.map((b) => ({ label: b.label, href: `/${b.slug}` })) }
      : link,
  );
  return <NavbarClient navLinks={links} />;
}

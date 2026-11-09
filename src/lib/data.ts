// Central content + image config. Swap the image URLs for your own files
// (e.g. "/images/hero.jpg" placed in /public/images) whenever you're ready.
export const images = {
  logo: "/images/logo.png",
  heroVideo: "/images/hero.mp4",
  statsDark: "/images/stats-battery.png",
  statsFactory: "/images/stats-factory.png",
  statsMachine: "/images/stats-machine.png",
  author: "/images/author-sarah.png",
};

export type NavLink = { label: string; href: string; children?: { label: string; href: string }[] };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Business",
    href: "/business",
    children: [
      { label: "Advanced Materials", href: "/advanced-materials" },
      { label: "Industrial Solutions", href: "/industrial-solutions" },
      { label: "Technology & Digital", href: "/technology-digital" },
      { label: "Commerce & Consumer", href: "/commerce-consumer" },
      { label: "International Operations", href: "/international-operations" },
    ],
  },
  {
    label: "Innovation & Sustainability",
    href: "/innovation-and-sustainability",
    children: [
      { label: "Research & Development", href: "/innovation-and-sustainability#research-development" },
      { label: "Sustainability", href: "/innovation-and-sustainability#smart-sustainable-manufacturing" },
      { label: "Automation", href: "/innovation-and-sustainability#engineering-operational-excellence" },
    ],
  },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

export const innovations = [
  {
    title: "Research & Development",
    description: "Turning ideas and technical expertise into practical solutions.",
    image: "/images/innovation-rnd.png",
  },
  {
    title: "Product Innovation",
    description: "Creating products designed around changing customer needs.",
    image: "/images/innovation-product.png",
  },
  {
    title: "Manufacturing Excellence",
    description: "Improving quality, efficiency and scalability across operations.",
    image: "/images/innovation-manufacturing.png",
  },
  {
    title: "Technology & Automation",
    description: "Adopting technologies that strengthen performance and productivity.",
    image: "/images/innovation-technology.png",
  },
];

// Central content + image config. Swap the image URLs for your own files
// (e.g. "/images/hero.jpg" placed in /public/images) whenever you're ready.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

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
  { label: "Media", href: "/#insights" },
  { label: "Careers", href: "#" },
];

export const businesses = [
  {
    tab: "Advanced Materials",
    brand: "Smith Therm",
    title: "Thermal & Electrical Insulation Solutions",
    description:
      "Delivering specialized insulation solutions designed for demanding electrical and industrial applications.",
    image: "/images/business-advanced-materials.png",
  },
  {
    tab: "Industrial Solutions",
    brand: "Smith Industrial",
    title: "Precision Engineering for Heavy Industry",
    description:
      "Engineered components, fabrication and process solutions built for reliability at scale.",
    image: u("photo-1581091226825-a6a2a5aee158"),
  },
  {
    tab: "Technology & Digital",
    brand: "Smith Digital",
    title: "Smart Systems & Digital Transformation",
    description:
      "Software, automation and connected platforms that modernise operations across the group.",
    image: u("photo-1518770660439-4636190af475"),
  },
  {
    tab: "Commerce & Consumer",
    brand: "Smith Consumer",
    title: "Products People Use Every Day",
    description:
      "Consumer brands and commerce channels built around quality, trust and changing customer needs.",
    image: u("photo-1563013544-824ae1b704d3"),
  },
  {
    tab: "International Operations",
    brand: "Smith Global",
    title: "Global Reach, Local Expertise",
    description:
      "Trading, sourcing and partnerships that connect our businesses to markets around the world.",
    image: u("photo-1497366216548-37526070297c"),
  },
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

export const articles = [
  {
    category: "Advertising",
    date: "May 15, 2026",
    title: "The Future of Solid-State Battery Technology",
    excerpt:
      "Solid-state batteries could redefine energy density, safety, and charging performance. Discover the technology behind the next generation of energy storage.",
    image: "/images/blog-solid-state.png",
    author: { name: "Sarah Mitchell", role: "Agency Founder & CEO" },
  },
  {
    category: "Advertising",
    date: "June 9, 2026",
    title: "Why 800V Architecture Matters for Electric Vehicles",
    image: "/images/blog-800v.png",
  },
  {
    category: "Branding",
    date: "August 5, 2026",
    title: "5 workflows every modern business should automate",
    image: "/images/blog-workflows.png",
  },
];

// One-time starting content. After seeding, the admin panel is the source of truth.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;


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

// Placeholder openings. Edit or delete them in the admin panel.
export const jobOpenings = [
  { title: "Production Engineer", department: "Manufacturing" },
  { title: "Process Engineer", department: "Engineering" },
  { title: "Quality Assurance Engineer", department: "Quality" },
  { title: "Sales Executive", department: "Sales" },
  { title: "Operations Coordinator", department: "Operations" },
];

export type BusinessCompany = {
  name: string;
  industry: string;
  location: string;
  text: string;
  image: string;
  website: string;
  /** Company logo; the card shows none when absent. */
  logo?: string;
  /** Company LinkedIn page; the icon is hidden when absent. */
  linkedin?: string;
};

export type BusinessPageData = {
  slug: string;
  label: string;
  heroImage: string;
  heroAlt: string;
  /** Tailwind object-position class for the hero photo. */
  heroPosition?: string;
  title: string[];
  /** Subheading under the business name in the About us section. */
  tagline: string;
  description: string;
  paragraphs: string[];
  companies: BusinessCompany[];
};

const business = (tab: string) => {
  const b = businesses.find((x) => x.tab === tab);
  if (!b) throw new Error(`Unknown business: ${tab}`);
  return b;
};

type CompanyInput = Omit<BusinessCompany, "image"> & {
  image?: string;
};

/** Fills in the page photo until each company has its own image. */
const companies = (
  fallbackImage: string,
  list: CompanyInput[],
): BusinessCompany[] =>
  list.map((c) => ({
    image: fallbackImage,
    ...c,
  }));

/** Builds a page entry for a business using its home-page card data. */
function fromBusiness(
  slug: string,
  tab: string,
  title: string[],
  tagline: string,
  about: string[],
  list: CompanyInput[],
): BusinessPageData {
  const b = business(tab);
  return {
    slug,
    label: tab,
    heroImage: b.image,
    heroAlt: b.title,
    title,
    tagline,
    description: b.description,
    paragraphs: about,
    companies: companies(b.image, list),
  };
}

export const businessPages: BusinessPageData[] = [
  {
    slug: "advanced-materials",
    label: "Advanced Materials",
    heroImage: "/images/business/advanced-materials-hero.png",
    heroAlt: "Technician welding steel beams",
    heroPosition: "object-[70%_center]",
    title: ["Advanced Heating & Thermal", "Solutions for Industry"],
    tagline:
      "Engineering advanced materials that power innovation, performance, and next-generation industries.",
    description:
      "Advanced heating and thermal solutions for industry from the JLSmith Group of companies.",
    paragraphs: [
      "JLSmith Group's Advanced Materials businesses develop and supply the composites, mica and insulation materials that industrial products depend on. From G10, FR4 and epoxy glass laminates to natural mica, carbon fiber and furnace insulation, our companies serve electrical, mechanical, automotive and new energy applications. With manufacturing in Giridih and China and a sourcing base in Kolkata, we support customers from standard material forms through to custom fabricated components.",
      "Our materials companies work as one connected network. Smith Composites and Guangdong Qianka manufacture technical laminates and composite solutions in India and China, SmithMica brings the thermal, electrical and mechanical strengths of natural mica to battery packs, BESS and new energy vehicles, and Insulac keeps customers supplied with insulation products backed by custom fabrication and responsive service. Together they give customers one partner for material selection, sourcing and application-ready performance.",
    ],
    companies: companies("/images/business-advanced-materials.png", [
      {
        name: "Smith Composites Pvt Ltd",
        logo: "/images/business/smithcomposites.png",
        website: "https://www.smithcomposite.com",
        industry: "Advanced Composites & Industrial Materials",
        location: "Giridih, Ahmedabad",
        text: "Smith Composites Pvt Ltd manufactures high-performance composites for all duties. Its range spans glass epoxy (including G10 and FR4), phenolic and mica-based composite laminates; mica paper, tapes and gasket sheets; engineering plastics such as PTFE, nylon and POM; pultruded profiles, insulation tubes and ropes; and carbon fiber sheets, tubes, fabrics and prepregs. These materials serve aerospace, electrical, oil and gas, defence, motor, generator, switchgear and transformer applications.",
      },
      {
        name: "SmithMica",
        website: "https://www.smithmica.com",
        industry: "Natural Mica & Mica-Based Products",
        location: "Giridih",
        text: "SmithMica specializes in natural mica and mica-based industrial products, serving applications across electrical insulation, thermal protection, energy storage, and advanced industrial materials. The business focuses on leveraging the unique thermal, electrical, and mechanical properties of natural mica to develop dependable material solutions. With growing applications in battery packs, BESS, and new energy vehicles, SmithMica aims to support next-generation energy and industrial technologies.",
      },
      {
        name: "Insulac",
        logo: "/images/business/insulac.png",
        website: "https://www.insulac.com",
        linkedin: "https://www.linkedin.com/company/insulac",
        industry: "Industrial Insulation & Technical Materials",
        location: "Kolkata",
        text: "Insulac is a Kolkata-based manufacturer and supplier of high-performance thermal and electrical insulation. It specializes in thermoplastic and thermosetting polymers, mica composites and furnace insulating materials, with a range spanning thermoset and FRP laminates, mica insulation, ceramic fibre, mineral wool, insulating ropes and gaskets, PTFE and refractory products. Alongside its standard range it offers custom insulation and fabrication, serving a global clientele with fast delivery and tailored solutions.",
      },
      {
        name: "Guangdong Qianka Composite Material Limited",
        website: "https://www.smithcomposite.com",
        industry: "Advanced Composite Material Manufacturing",
        location: "Shenzhen, China",
        text: "Guangdong Qianka Composite Material Limited is the group's China-based manufacturing business focused on advanced composite materials and industrial insulation products. The company aims to serve domestic and international customers with engineered materials, including technical laminates and composite solutions for electrical, mechanical, automotive, and new energy applications. Its China manufacturing presence strengthens the group's global production capabilities, sourcing network, and access to advanced material technologies.",
      },
    ]),
  },
  fromBusiness(
    "industrial-solutions",
    "Industrial Solutions",
    ["Precision Engineering", "for Heavy Industry"],
    "Delivering engineered solutions that strengthen industries, enhance efficiency, and drive progress.",
    [
      "Our Industrial Solutions businesses build the components that keep industry running. Smith Therm, the group's flagship company since 1978, makes heating elements, electrical insulation and alloy wire for HVAC, appliance, motor, transformer and furnace applications. Mundrik New Energy extends that expertise into battery pack components, thermal management and energy storage materials for electric vehicles and renewable energy.",
      "Built on more than four decades of manufacturing experience in Giridih, our industrial companies combine proven production know-how with a focus on what industry needs next. We work closely with OEMs and industrial customers to engineer reliable components, maintain consistent quality and support the shift toward electrification and cleaner energy.",
    ],
    [
      {
        name: "Smith Therm Pvt Ltd",
        logo: "/images/business/smith-therm.png",
        website: "https://www.smiththerm.com",
        industry: "Heating Elements, Insulation & Alloy Wire",
        location: "Giridih, Jharkhand",
        text: "Smith Therm Pvt Ltd is the flagship company of the JLSmith Group, whose journey began in 1978 with founder Late Mr. J. L. Vishwakarma. It offers a 360-degree range of heaters and insulation through three business lines: Smith Therm Heaters, making customized heating elements for HVAC, appliance, commercial and industrial sectors; Smith Therm Insulation, supplying electrical insulation, technical laminates and composites for generators, motors, transformers and furnaces; and Smith Therm Wires, producing Ni-Cr, Fe-Cr-Al and Ni-Cu alloy wires. With wings in China, Italy and Qatar, it serves customers in 26 countries.",
      },
      {
        name: "Mundrik New Energy Material Limited",
        website: "https://www.mundriknewenergy.com",
        industry: "New Energy & Advanced Functional Materials",
        location: "India",
        text: "Mundrik New Energy Material Limited focuses on advanced materials and engineered components for the rapidly evolving new energy industry. Its areas of interest include natural mica products, electrical insulation materials, thermal management, battery pack components, and battery energy storage systems (BESS). The company aims to develop material solutions supporting electric vehicles, renewable energy infrastructure, and next-generation energy storage technologies.",
      },
    ],
  ),
  fromBusiness(
    "technology-digital",
    "Technology & Digital",
    ["Smart Systems &", "Digital Transformation"],
    "Building intelligent digital solutions that transform businesses, connect ecosystems, and accelerate growth.",
    [
      "Our Technology & Digital business brings design, engineering and digital thinking together to help ideas become products. Through research, design development, prototyping and product engineering, we help businesses develop differentiated products, improve functionality and bring innovation to market faster.",
      "Led by WEDIDx, the group is building a global platform for industrial designers, built by designers, for designers. By combining creativity with technical expertise and market understanding, we support both group companies and external partners in turning concepts into commercially viable products, and in strengthening design and innovation across the businesses we serve.",
    ],
    [
      {
        name: "WEDIDx Pvt Ltd",
        logo: "/images/business/wedidx.jpeg",
        website: "https://www.wedidx.com",
        industry: "Industrial Design, Product Development & Innovation",
        location: "Delhi",
        text: "WEDIDx Pvt Ltd is building an innovative global platform for industrial designers, built by designers, for designers. The company focuses on industrial design, product innovation, engineering and design-led business solutions, bridging the gap between creative concepts and commercially viable products through research, design development, prototyping and product engineering. By combining creativity with technical expertise and market understanding, WEDIDx helps businesses develop differentiated products and accelerate product innovation.",
      },
    ],
  ),
  fromBusiness(
    "commerce-consumer",
    "Commerce & Consumer",
    ["Products People", "Use Every Day"],
    "Creating connected commerce experiences and building brands that inspire modern consumers.",
    [
      "Our Commerce & Consumer businesses bring the group's manufacturing and sourcing strength to everyday customers. We design and manufacture electric cooking appliances, and run ecommerce and retail platforms that bring global and emerging brands to Indian consumers.",
      "Smith Innovative Appliances, the maker of Smithcucina, develops electric cooking solutions that reduce dependence on LPG and improve kitchen safety. Smith Retail Ventures, through its 21GenX marketplace, combines brand incubation, digital marketing, quick commerce and omnichannel retail. Together they turn product innovation into products people can find, trust and use every day.",
    ],
    [
      {
        name: "Smith Innovative Appliances Pvt Ltd",
        logo: "/images/business/smith-innovative.png",
        website: "https://www.smithcucina.com",
        linkedin: "https://www.linkedin.com/company/smithcucina",
        industry: "Electric Cooking Appliances & OEM Manufacturing",
        location: "Giridih",
        text: "Smith Innovative Appliances Pvt Ltd is an Indian electric cooking innovation company and the maker of Smithcucina. It creates practical electric cooking solutions that reduce dependency on LPG, improve kitchen safety and make electric cooking easier to adopt across homes, institutions and emerging markets. Its portfolio spans infrared radiant cooktops, induction ranges and commercial and institutional cooking systems, including patent-pending curved-radiant and concave-induction platforms and DHC™ thermal battery technology that keeps cooking through short power interruptions.",
      },
      {
        name: "Smith Retail Ventures Pvt Ltd",
        logo: "/images/business/smith-retail.png",
        website: "https://www.srvpl.com",
        industry: "Ecommerce, Retail & Brand Development",
        location: "Kolkata",
        text: "Smith Retail Ventures Pvt Ltd (SRVPL) is the group's ecommerce, retail, and brand development company. Through its marketplace platform 21GenX, the company focuses on bringing global D2C brands, innovative products, and emerging consumer brands to Indian customers. Its business model combines marketplace operations, brand incubation, digital marketing, quick commerce, omnichannel retail, and technology-driven commerce solutions to build scalable consumer businesses.",
      },
    ],
  ),
  fromBusiness(
    "international-operations",
    "International Operations",
    ["Global Reach,", "Local Expertise"],
    "Connecting global markets through strategic partnerships, international trade, and business expansion.",
    [
      "Our International Operations businesses take the group's companies to new markets. From Dubai, Shanghai and the United States, they develop cross-border partnerships, facilitate international trade, support global brand and business development, and invest in new ventures across industrial materials, manufacturing, technology and consumer businesses.",
      "Mundrik Ventures FZCO and Mundrik Ventures LLC act as the group's bridge to the world. They identify emerging opportunities, build strategic relationships and help group companies enter new markets, with a particular focus on the United States and other global business destinations, taking a long-term approach to growth across borders. Shanghai Qianka Trading connects global suppliers with customers through sourcing and trade from China.",
    ],
    [
      {
        name: "Mundrik Ventures FZCO",
        website: "https://www.mundrik.com",
        industry: "Global Business Development & Strategic Investments",
        location: "Dubai",
        text: "Mundrik Ventures FZCO is a global business development and investment-oriented business entity within JLsmith Group. It focuses on identifying emerging business opportunities, developing strategic partnerships, expanding international market presence, and supporting new ventures across industrial materials, manufacturing, technology, and consumer businesses. Through a long-term growth approach, Mundrik Ventures FZCO aims to facilitate cross-border business expansion and create new opportunities across international markets.",
      },
      {
        name: "Mundrik Ventures LLC",
        website: "https://www.mundrik.com",
        industry: "International Business Operations & Global Expansion",
        location: "USA",
        text: "Mundrik Ventures LLC is the group's international business entity established to support global operations, commercial partnerships, and international market expansion. The company focuses on developing cross-border business opportunities, facilitating international trade, supporting global brand and business development, and building strategic relationships. It aims to serve as a platform for expanding the group's presence in international markets, particularly across the United States and other global business destinations.",
      },
      {
        name: "Shanghai Qianka Trading Co. Limited",
        website: "https://www.smithcomposite.com",
        industry: "International Trading & Global Sourcing",
        location: "Shanghai, China",
        image: "/images/business/company-shanghai-qianka.png",
        text: "Shanghai Qianka Trading Co. Limited is the group's international trading and sourcing company, established to connect global manufacturers, suppliers, and customers. Operating from China, the company focuses on international procurement, product sourcing, trading, supplier coordination, and cross-border business development. With experience in China-based supply chains, it supports the group's global operations by facilitating efficient sourcing, commercial partnerships, and international trade opportunities.",
      },
    ],
  ),
];

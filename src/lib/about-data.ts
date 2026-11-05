// Content + image paths for the About page. Images live in /public/images/about.
const img = (name: string) => `/images/about/${name}`;

export const aboutImages = {
  heroBg: img("global-partner-factory.png"),
  founder: img("founder-jl-viswakarma.png"),
  timeline: img("timeline-facility.png"),
  peopleFactory: img("people-factory.png"),
  peopleOffice: img("people-office.png"),
  infrastructure: img("infrastructure-campus.png"),
  leaves: img("sustainability-leaves.png"),
};

export const introStats = [
  { label: "Presence across key global markets", value: 3, suffix: "", unit: "Continents" },
  { label: "Business network and supply reach", value: 12, suffix: "+", unit: "Countries" },
  { label: "Customers served internationally", value: 26, suffix: "+", unit: "Countries" },
];

export const coreValues = [
  {
    title: "Collaboration",
    text: "We work closely with customers, partners and teams to understand requirements clearly and build solutions that create long-term value.",
  },
  {
    title: "Integrity",
    text: "We believe in doing what is right - with honest communication, responsible decisions and reliable business practices.",
  },
  {
    title: "Customer Commitment",
    text: "We focus on creating a dependable experience before and after every order, from technical support to delivery and documentation.",
  },
  {
    title: "Professional Excellence",
    text: "We continuously improve our manufacturing, communication, service and technical capabilities to meet the expectations of critical industries.",
  },
];

export const founder = {
  name: "Late J.L Viswakarma",
  role: "Founder",
  paragraphs: [
    "Founded in 1978 by Late J. L. Vishwakarma, the Smith journey began with a clear focus on electro-thermal applications and industrial material solutions. His vision was to build a manufacturing company that could support OEMs and industries with dependable products, consistent quality and long-term technical commitment.",
    "That foundation continues today through Smith Qianka, where the Smith family’s legacy is combined with Shanghai Qianka’s composite material capability. What began as a focused electro-thermal manufacturing business has grown into a broader material platform serving critical applications across composite, mica and carbon fiber solutions.",
  ],
};

export const milestones: { year: string; title: string; text: string; image?: boolean }[] = [
  {
    year: "1978",
    title: "Foundation of the Smith Journey",
    text: "Founded by Late Mr. J. L. Vishwakarma, Smith began with electro-thermal applications and reliable OEM-focused industrial material solutions.",
  },
  {
    year: "1981",
    title: "Mica processing & fabrication",
    text: "Expanded into natural mica processing and fabrication, producing precision mica strips, discs, wafers and related components.",
    image: true,
  },
  {
    year: "1985",
    title: "Electric heating elements unit",
    text: "A dedicated unit for electric heating elements was started, including metal-sheathed tubular heaters, to serve leading appliance OEMs in India.",
    image: true,
  },
  {
    year: "1990",
    title: "Entry into Export Markets",
    text: "Smith began exporting electric heating elements and mica products worldwide, marking the start of its international business journey.",
  },
  {
    year: "1998",
    title: "Resistance Wire Manufacturing",
    text: "The company started manufacturing electric resistance wire to control quality, customize requirements and support its own heating element production.",
  },
  {
    year: "2004",
    title: "Smith Alloy Expansion",
    text: "The resistance wire manufacturing unit expanded to serve overseas markets under the brand name Smith Alloy.",
  },
  {
    year: "2005",
    title: "Composite Laminates Manufacturing",
    text: "Started manufacturing glass fiber and mica-based composite laminates for steel, power, railway and defence applications.",
    image: true,
  },
  {
    year: "2005",
    title: "Manufacturing in Anhui, China",
    text: "The group set up manufacturing operations in Anhui Province, China, strengthening its production base and composite material capability.",
  },
  {
    year: "2012",
    title: "Global Business Expansion",
    text: "Expanded internationally with Hong Kong, Shenzhen, Italy and Qatar operations to support global markets.",
    image: true,
  },
  {
    year: "2026",
    title: "Smith Qianka Now",
    text: "Smith Composite combines Smith’s manufacturing legacy with composite material strength to deliver global material forms and custom components.",
  },
];

export const infraStats = [
  { value: 3, suffix: "", unit: "", label: "Specialised manufacturing units" },
  { value: 400000, suffix: "+", unit: "sqft", label: "Combined manufacturing footprint" },
  { value: 30, suffix: "+", unit: "", label: "Countries served globally" },
];

export const globalShifts = [
  {
    title: "Electrification",
    text: "Supporting higher-performance material needs across motors, transformers, switchgear and power systems.",
  },
  {
    title: "Energy Transition",
    text: "Supporting reliable material performance for renewable energy, power generation and cleaner industrial infrastructure.",
  },
  {
    title: "Industrial Reliability",
    text: "Delivering materials that improve uptime, safety and operational reliability.",
  },
  {
    title: "Lightweight Engineering",
    text: "Advancing lightweight solutions for improved performance and efficiency.",
  },
];

export const features = [
  {
    title: "Innovation built around real applications",
    paragraphs: [
      "At Smith Composite, innovation is driven by practical industrial requirements. Our teams work around material behaviour, application conditions, fabrication needs and customer specifications to develop solutions that perform reliably in demanding environments.",
      "From composite laminates and mica materials to carbon fiber forms and fabricated components, every improvement is focused on better consistency, usability and long-term performance.",
    ],
    image: img("innovation-pipe-support.png"),
    tone: "light" as const,
    imageSide: "left" as const,
  },
  {
    title: "A growing global material partner",
    paragraphs: [
      "With manufacturing strength, international supply presence and customers across multiple countries, Smith Composite continues to support industries that need reliable material supply, technical clarity and application-focused solutions.",
      "Our network connects India and China manufacturing capability with global customer support across key industrial markets.",
    ],
    image: img("global-partner-factory.png"),
    tone: "dark" as const,
    imageSide: "right" as const,
  },
  {
    title: "Innovation built around real applications",
    paragraphs: [
      "At Smith Composite, innovation is driven by practical industrial requirements. Our teams work around material behaviour, application conditions, fabrication needs and customer specifications to develop solutions that perform reliably in demanding environments.",
      "From composite laminates and mica materials to carbon fiber forms and fabricated components, every improvement is focused on better consistency, usability and long-term performance.",
    ],
    image: img("innovation-pipe-support.png"),
    tone: "light" as const,
    imageSide: "left" as const,
  },
];

export const discover = [
  {
    title: "Sustainable Manufacturing",
    text: "Advancing sustainable manufacturing practices to reduce environmental impact, improve resource efficiency and meet the evolving needs of customers and industries.",
    cta: "Explore our sustainability goals",
    image: img("discover-sustainable.png"),
  },
  {
    title: "Advanced Manufacturing Capabilities",
    text: "Advancing our material expertise and manufacturing capabilities to deliver reliable, high-performance composite solutions for demanding industrial applications.",
    cta: "Explore our capabilities",
    image: img("discover-capabilities.png"),
  },
  {
    title: "Strategic Growth Investments",
    text: "Investing strategically in advanced capabilities, infrastructure and technologies to strengthen our business and capture opportunities across high-growth industries.",
    cta: "Explore growth opportunities",
    image: img("discover-growth.png"),
  },
];

export const CONTACT_EMAIL = "info@jlsmiths.com";

/** `enquiryType` of messages sent from the careers page. */
export const JOB_APPLICATION = "job-application";

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "date";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** Spans the full form width on desktop (default: half). */
  full?: boolean;
};

export type EnquiryType = {
  slug: string;
  /** Two-line label used on the option cards. */
  card: [string, string];
  title: string;
  eyebrow: string;
  intro: string;
  subject: string;
  submitLabel: string;
  successTitle: string;
  successText: string;
  steps: { title: string; text: string }[];
  fields: FieldDef[];
};

const businessAreas = [
  "Advanced Materials",
  "Industrial Solutions",
  "Technology & Digital",
  "Commerce & Consumer",
  "International Operations",
];

const businessOptions = [...businessAreas, "Not sure yet"];

const contactFields: FieldDef[] = [
  { name: "name", label: "Full name", type: "text", required: true, placeholder: "Your name" },
  { name: "company", label: "Company", type: "text", placeholder: "Company or organisation" },
  { name: "email", label: "Work email", type: "email", required: true, placeholder: "you@company.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
];

const timeline = ["As soon as possible", "Within 1–3 months", "Within 3–6 months", "Just exploring"];

export const offices = [
  {
    name: "Group Headquarters",
    lines: ["Vishwakarma House, Argha Ghat Road", "Giridih – 815301, Jharkhand, India"],
    meet: "Giridih Headquarters",
  },
  {
    name: "Corporate Office",
    lines: ["EN-20, 4th Floor, Salt Lake, Sector V", "Kolkata – 700091, West Bengal, India"],
    meet: "Kolkata Corporate Office",
  },
  {
    name: "International Trade Office",
    lines: ["Room 909, Building 3, Wanda Plaza, Jiangqiao", "Jiading District, Shanghai 201803, China"],
    meet: "Shanghai Trade Office",
  },
];

export const enquiryTypes: EnquiryType[] = [
  {
    slug: "partner",
    card: ["Partner", "With Us"],
    title: "Partner With JLSmith Group",
    eyebrow: "Partnerships",
    intro:
      "Whether you are a supplier, distributor, technology provider, research institution or investor, we are always open to partnerships that create long-term value. Tell us about your organisation and the opportunity you have in mind, and we will connect you with the right business.",
    subject: "Partnership enquiry",
    submitLabel: "Send partnership enquiry",
    successTitle: "Thanks — your partnership enquiry is in.",
    successText: "Our team will review your proposal and get back to you within two working days.",
    steps: [
      { title: "Introduce yourself", text: "Tell us about your organisation and the partnership you have in mind." },
      { title: "Initial review", text: "We share your enquiry with the most relevant business and leadership team." },
      { title: "Let's talk", text: "We arrange a conversation to explore fit, scope and next steps." },
    ],
    fields: [
      ...contactFields,
      {
        name: "partnership",
        label: "Type of partnership",
        type: "select",
        required: true,
        options: ["Supplier / vendor", "Distribution / channel", "Technology / R&D", "Joint venture / investment", "Other"],
      },
      { name: "business", label: "Area of interest", type: "select", options: businessOptions },
      {
        name: "proposal",
        label: "Tell us about the opportunity",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "Your organisation, what you offer and how we could work together…",
      },
      { name: "website", label: "Company website", type: "text", full: true, placeholder: "https://" },
    ],
  },
  {
    slug: "consultation",
    card: ["Request a", "Consultation"],
    title: "Request a Consultation",
    eyebrow: "Consultation",
    intro:
      "Planning a new product, upgrading an existing one or solving a technical challenge? Tell us what you are working on, and our specialists will advise on materials, engineering, manufacturing and supply — from the first idea to full-scale production.",
    subject: "Consultation request",
    submitLabel: "Request consultation",
    successTitle: "Thanks — your consultation request is in.",
    successText: "A specialist from the relevant business will review your requirements and contact you within two working days.",
    steps: [
      { title: "Share your requirements", text: "The project or challenge, the application and any key specifications." },
      { title: "Expert review", text: "Our specialists assess your needs and prepare for an informed conversation." },
      { title: "Consultation", text: "We meet to discuss options and follow up with a tailored recommendation." },
    ],
    fields: [
      ...contactFields,
      { name: "business", label: "Area of interest", type: "select", required: true, options: businessOptions },
      { name: "timeline", label: "Timeline", type: "select", options: timeline },
      {
        name: "requirements",
        label: "What would you like to discuss?",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "The product, project or challenge, its application and key requirements…",
      },
      { name: "volume", label: "Estimated volume or scale", type: "text", full: true, placeholder: "e.g. 5,000 units / year, pilot batch, one-off installation" },
    ],
  },
  {
    slug: "visit",
    card: ["Visit Our", "Facility"],
    title: "Visit Our Facility",
    eyebrow: "Book a visit",
    intro:
      "See how we work first-hand. Choose a location and a preferred date, and we'll arrange a visit with the right people from our businesses — or meet us online if that suits you better.",
    subject: "Facility visit request",
    submitLabel: "Request visit",
    successTitle: "Thanks — your visit request is in.",
    successText: "We'll confirm the date, time and hosts by email within two working days.",
    steps: [
      { title: "Pick a place and date", text: "Choose one of our sites or a video call, and a date that suits you." },
      { title: "We confirm", text: "We match you with the right team and confirm the details by email." },
      { title: "Visit us", text: "Meet the team and see our operations, with a site tour where possible." },
    ],
    fields: [
      ...contactFields,
      { name: "location", label: "Preferred location", type: "select", required: true, options: [...offices.map((o) => o.meet), "Video call"] },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "slot", label: "Preferred time", type: "select", options: ["Morning (10am – 12pm)", "Afternoon (12pm – 3pm)", "Late afternoon (3pm – 6pm)"] },
      { name: "visitors", label: "Number of visitors", type: "text", placeholder: "e.g. 2" },
      { name: "purpose", label: "Purpose of the visit", type: "textarea", required: true, full: true, placeholder: "What would you like to see or discuss?" },
    ],
  },
  {
    slug: "brochure",
    card: ["Download Corporate", "Brochure"],
    title: "Download Our Corporate Brochure",
    eyebrow: "Brochure",
    intro:
      "Request the JLSmith Group brochure or a business-specific brochure covering our companies, capabilities, products and global presence. We'll send it straight to your inbox.",
    subject: "Brochure request",
    submitLabel: "Request brochure",
    successTitle: "Thanks — your brochure is on its way.",
    successText: "We'll email the brochure to you shortly. If you'd like to talk to someone in the meantime, write to us anytime.",
    steps: [
      { title: "Choose a brochure", text: "The full group overview, or a brochure for a specific business." },
      { title: "Receive it by email", text: "We send the brochure to the email address you provide." },
      { title: "Talk to us", text: "Reply to the email any time to reach the right team." },
    ],
    fields: [
      ...contactFields,
      {
        name: "brochure",
        label: "Which brochure?",
        type: "select",
        required: true,
        full: true,
        options: ["JLSmith Group overview", ...businessAreas.map((b) => `${b} brochure`)],
      },
    ],
  },
];

export const generalEnquiry: EnquiryType = {
  slug: "general",
  card: ["General", "Enquiry"],
  title: "Send Us a Message",
  eyebrow: "General enquiry",
  intro: "",
  subject: "General enquiry",
  submitLabel: "Send message",
  successTitle: "Thanks — your message has been sent.",
  successText: "We'll get back to you within two working days.",
  steps: [],
  fields: [
    ...contactFields,
    { name: "business", label: "Area of interest", type: "select", options: businessOptions, full: true },
    { name: "message", label: "Message", type: "textarea", required: true, full: true, placeholder: "How can we help?" },
  ],
};

export function getEnquiryType(slug: string) {
  if (slug === generalEnquiry.slug) return generalEnquiry;
  return enquiryTypes.find((t) => t.slug === slug);
}

import { businessPages } from "@/lib/business-pages";

export const CONTACT_EMAIL = "info@jlsmiths.com";

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

const businessOptions = [...businessPages.map((b) => b.label), "Not sure yet"];

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
    slug: "remodel",
    card: ["I Want", "To Remodel"],
    title: "Upgrade What You Already Have",
    eyebrow: "Remodel",
    intro:
      "Looking to improve an existing product, line or installation? Tell us what you use today and what you want to achieve — better thermal performance, longer service life, lower cost or a more reliable supply — and our specialists will recommend the right materials and components.",
    subject: "Remodel / upgrade enquiry",
    submitLabel: "Send remodel enquiry",
    successTitle: "Thanks — your upgrade enquiry is in.",
    successText: "A specialist from the relevant business will review your current setup and get back to you within two working days.",
    steps: [
      { title: "Share your current setup", text: "Materials, components or systems you use today and where they fall short." },
      { title: "Technical review", text: "Our engineers assess the application and shortlist suitable materials or designs." },
      { title: "Recommendation & samples", text: "You receive a proposal, and samples or trials where relevant." },
    ],
    fields: [
      ...contactFields,
      { name: "business", label: "Area of interest", type: "select", required: true, options: businessOptions },
      { name: "timeline", label: "Timeline", type: "select", options: timeline },
      {
        name: "current",
        label: "What do you use today?",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "e.g. FR4 laminates in a motor assembly, mica heaters in a commercial appliance…",
      },
      {
        name: "goal",
        label: "What would you like to improve?",
        type: "textarea",
        full: true,
        placeholder: "Performance, cost, lifetime, compliance, supply reliability…",
      },
    ],
  },
  {
    slug: "new-build",
    card: ["I Want", "To New Build"],
    title: "Start Something New With Us",
    eyebrow: "New build",
    intro:
      "Developing a new product, plant or project? Bring us in early. From material selection and design to prototyping, manufacturing and sourcing, the JLSmith Group can support you from the first drawing to full-scale supply.",
    subject: "New build / project enquiry",
    submitLabel: "Send project enquiry",
    successTitle: "Thanks — we've received your project brief.",
    successText: "Our team will review your requirements and contact you within two working days to discuss next steps.",
    steps: [
      { title: "Tell us about the project", text: "What you are building, the application and any key requirements." },
      { title: "Scoping call", text: "We discuss specifications, volumes and timelines with the right business team." },
      { title: "Proposal", text: "You receive a tailored proposal covering materials, design support and supply." },
    ],
    fields: [
      ...contactFields,
      { name: "business", label: "Area of interest", type: "select", required: true, options: businessOptions },
      { name: "timeline", label: "Target timeline", type: "select", options: timeline },
      {
        name: "project",
        label: "Tell us about your project",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "The product or project, its application, key specifications…",
      },
      { name: "volume", label: "Estimated volume or scale", type: "text", full: true, placeholder: "e.g. 5,000 units / year, pilot batch, one-off installation" },
    ],
  },
  {
    slug: "meet",
    card: ["I Need To Meet", "In Person"],
    title: "Meet Our Team In Person",
    eyebrow: "Book a meeting",
    intro:
      "Visit us at one of our offices, or meet our team online. Choose a location and a preferred date, and we'll confirm a time with the right people from our businesses.",
    subject: "Meeting request",
    submitLabel: "Request meeting",
    successTitle: "Thanks — your meeting request is in.",
    successText: "We'll confirm the date, time and attendees by email within two working days.",
    steps: [
      { title: "Pick a place and date", text: "Choose one of our offices or a video call, and a date that suits you." },
      { title: "We confirm", text: "We match you with the right team and confirm the time by email." },
      { title: "Meet the team", text: "Discuss your needs face to face, with a site tour where possible." },
    ],
    fields: [
      ...contactFields,
      { name: "location", label: "Preferred location", type: "select", required: true, options: [...offices.map((o) => o.meet), "Video call"] },
      { name: "date", label: "Preferred date", type: "date", required: true },
      { name: "slot", label: "Preferred time", type: "select", options: ["Morning (10am – 12pm)", "Afternoon (12pm – 3pm)", "Late afternoon (3pm – 6pm)"] },
      { name: "business", label: "Who would you like to meet?", type: "select", options: businessOptions },
      { name: "purpose", label: "Purpose of the meeting", type: "textarea", required: true, full: true, placeholder: "What would you like to discuss?" },
    ],
  },
  {
    slug: "brochure",
    card: ["Download", "Brochure"],
    title: "Get Our Brochure",
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
        options: ["JLSmith Group overview", ...businessPages.map((b) => `${b.label} brochure`)],
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

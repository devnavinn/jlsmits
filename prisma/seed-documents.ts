// Starter text for the article bodies and legal pages. Edit in the admin panel after seeding.

export const articleBodies: Record<string, string> = {
  "the-future-of-solid-state-battery-technology": `Solid-state batteries replace the liquid electrolyte of a conventional lithium-ion cell with a solid material. That single change opens the door to higher energy density, improved safety and faster charging.

## Why the electrolyte matters

Liquid electrolytes are flammable and limit the anode materials a cell can use. A solid electrolyte can make lithium-metal anodes practical, which is where much of the potential gain in energy density comes from.

## What still needs solving

Manufacturing at scale remains the central challenge. Keeping solid layers in close contact through repeated charge cycles, and producing them consistently and affordably, will decide how quickly the technology reaches the market.

## The role of materials

Thermal management and electrical insulation stay essential as cells become more energy-dense. Advanced materials will be part of making these next-generation packs safe and reliable.`,

  "why-800v-architecture-matters-for-electric-vehicles": `Most electric vehicles have been built around 400V systems. Moving to 800V reduces the current needed for the same power, which brings practical benefits across the vehicle.

## Faster charging, less heat

Lower current means less resistive heating, so charging power can rise without equally large increases in cable size or cooling.

## Lighter electrical systems

Thinner conductors can reduce weight and cost in the wiring harness, while efficient inverters help convert more of the battery's energy into range.

## New demands on insulation

Higher voltages place greater demands on electrical insulation and on the separation between components. Material choice becomes a key part of 800V design.`,

  "5-workflows-every-modern-business-should-automate": `Automation pays off fastest where work is repetitive, rules-based and easy to measure. These five workflows are a practical place to begin.

1. **Enquiry routing.** Send every new lead to the right team automatically.
2. **Invoice processing.** Capture, match and route invoices for approval.
3. **Inventory alerts.** Flag low stock before it interrupts production.
4. **Reporting.** Replace manual spreadsheets with scheduled reports.
5. **Employee onboarding.** Standardize access, documents and training.

Start with one process, measure the time saved, and use the results to choose what to automate next.`,
};

const contact = `**JLSmith Group**
Webel More, EN 9, EN Block, Sector V
Bidhannagar, Kolkata, West Bengal 700091, India
Email: [info@jlsmiths.com](mailto:info@jlsmiths.com)`;

export const legalPages = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How JLSmith Group collects, uses and protects information shared through this website.",
    body: `## Information we collect

When you submit an enquiry, meeting request or brochure request on this website, we collect the details you enter, such as your name, email address, phone number, company and message.

## How we use your information

We use this information to respond to your enquiry, arrange meetings, send requested materials and manage our business relationship with you.

## How we store your information

Enquiries are stored in a secure database that only authorized JLSmith Group personnel can access. We keep them only for as long as they are needed for these purposes or as required by law.

## Sharing

We do not sell your personal information. We may share it within the JLSmith Group of companies to respond to your enquiry, with service providers who operate this website on our behalf, or where required by law.

## Your choices

You may ask us to access, correct or delete the personal information we hold about you by contacting us using the details below.

## Changes to this policy

We may update this policy from time to time. The latest version is always published on this page.

## Contact

${contact}`,
  },
  {
    slug: "terms-of-service",
    title: "Terms of Service",
    summary: "The terms that apply when you use the JLSmith Group website.",
    body: `## Using this website

By using this website you agree to these terms. Please do not use the website if you do not agree with them.

## Website content

Content on this website is provided for general information about JLSmith Group and its companies. It does not constitute an offer or professional advice, and product and business information may change without notice.

## Intellectual property

Text, images, logos and other materials on this website belong to JLSmith Group or its licensors. They may not be copied or reused without prior written permission.

## Acceptable use

You agree not to misuse this website, including by attempting to gain unauthorized access, disrupting its operation or submitting false or harmful information.

## Third-party links

This website links to websites we do not control, and we are not responsible for their content or practices.

## Limitation of liability

To the extent permitted by law, JLSmith Group is not liable for any loss arising from your use of this website or reliance on its content.

## Governing law

These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts of Kolkata, West Bengal.

## Contact

${contact}`,
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "How cookies are used on the JLSmith Group website.",
    body: `## What cookies are

Cookies are small text files that a website stores on your device.

## How we use cookies

The public pages of this website do not set advertising or analytics cookies. A strictly necessary cookie is used only to keep authorized staff signed in to the website's administration area.

## Managing cookies

You can block or delete cookies in your browser settings.

## Changes to this policy

If we introduce other cookies, we will update this page.

## Contact

${contact}`,
  },
];

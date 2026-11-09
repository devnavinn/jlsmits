"use server";

import { getEnquiryType } from "@/lib/contact";
import { sendMail } from "@/lib/mailer";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Submitted values, returned on error so the form keeps what the visitor typed. */
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The enquiry type travels as a hidden field rather than a bound argument: binding a string
// alongside useActionState state crashed the Next 16.4 dev server on no-JS submissions.
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const type = getEnquiryType(String(formData.get("enquiry") ?? ""));
  if (!type) return { status: "error", message: "Unknown enquiry type." };

  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("website") ?? "").trim()) return { status: "success" };

  const values: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const field of type.fields) {
    const max = field.type === "textarea" ? 3000 : 200;
    const value = String(formData.get(field.name) ?? "").trim().slice(0, max);
    values[field.name] = value;

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
    } else if (value && field.type === "email" && !EMAIL_RE.test(value)) {
      errors[field.name] = "Enter a valid email address.";
    } else if (value && field.type === "select" && field.options && !field.options.includes(value)) {
      errors[field.name] = "Choose one of the options.";
    } else if (value && field.type === "date" && Number.isNaN(Date.parse(value))) {
      errors[field.name] = "Enter a valid date.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
  const text = [
    `New ${type.subject.toLowerCase()} from the JLSmith Group website`,
    "",
    ...type.fields.filter((f) => values[f.name]).map((f) => `${f.label}:\n${values[f.name]}\n`),
  ].join("\n");

  const sent = await sendMail({
    subject: oneLine(`${type.subject} — ${values.name}${values.company ? ` (${values.company})` : ""}`),
    text,
    replyTo: values.email,
  });

  if (!sent) {
    return {
      status: "error",
      message: "Sorry, we couldn't send your enquiry right now. Please try again or email info@jlsmiths.com.",
      values,
    };
  }
  return { status: "success" };
}

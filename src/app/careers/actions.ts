"use server";

import { JOB_APPLICATION } from "@/lib/contact";
import { getCareerOptions } from "@/lib/content";
import { prisma } from "@/lib/db";

export type ApplicationState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
  /** Submitted values, returned on error so the form keeps what the visitor typed. */
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitApplication(_prev: ApplicationState, formData: FormData): Promise<ApplicationState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("website") ?? "").trim()) return { status: "success" };

  const read = (name: string, max = 200) => String(formData.get(name) ?? "").trim().slice(0, max);
  const values = {
    name: read("name"),
    email: read("email"),
    phone: read("phone"),
    location: read("location"),
    position: read("position"),
    department: read("department"),
    message: read("message", 3000),
  };
  const consent = formData.get("consent") === "on";

  const { positions, departments } = await getCareerOptions();
  const errors: Record<string, string> = {};
  if (!values.name) errors.name = "Name is required.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.phone) errors.phone = "Phone is required.";
  if (!positions.includes(values.position)) errors.position = "Choose a position.";
  if (!departments.includes(values.department)) errors.department = "Choose a department.";
  if (!consent) errors.consent = "Please agree so we can process your application.";

  const kept = { ...values, consent: consent ? "on" : "" };
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: kept };
  }

  const answers = [
    { label: "Name", value: values.name },
    { label: "Email", value: values.email },
    { label: "Phone", value: values.phone },
    { label: "Location", value: values.location },
    { label: "Position applied for", value: values.position },
    { label: "Department", value: values.department },
    { label: "Message", value: values.message },
    { label: "Privacy consent", value: "Agreed" },
  ];

  try {
    await prisma.contactMessage.create({
      data: {
        enquiryType: JOB_APPLICATION,
        subject: `Job application: ${values.position}`,
        name: values.name,
        email: values.email,
        phone: values.phone,
        fields: answers.filter((a) => a.value),
      },
    });
  } catch (err) {
    console.error("[careers] Could not save application", err);
    return {
      status: "error",
      message: "Sorry, we couldn't send your application right now. Please try again or email info@jlsmiths.com.",
      values: kept,
    };
  }
  return { status: "success" };
}

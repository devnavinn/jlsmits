export type FormState = {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

/** Paths already used by fixed routes, which businesses and pages may not claim. */
export const RESERVED_SLUGS = new Set([
  "about", "admin", "api", "business", "contact", "images", "innovation-and-sustainability", "insights", "media",
]);

// next/image throws on hosts missing from next.config.ts, so only allow what it can render.
export const isImageSource = (v: string) => /^\/(?!\/)\S*$/.test(v) || v.startsWith("https://images.unsplash.com/");

const isHttpUrl = (v: string) => {
  try {
    return ["http:", "https:"].includes(new URL(v).protocol);
  } catch {
    return false;
  }
};

/** Reads and validates a submitted form, collecting one error per field. */
export class FormReader {
  errors: Record<string, string> = {};
  constructor(private data: FormData) {}

  private raw = (name: string) => String(this.data.get(name) ?? "").trim();

  text(name: string, label: string, max = 300) {
    const value = this.raw(name);
    if (!value) this.errors[name] = `${label} is required.`;
    else if (value.length > max) this.errors[name] = `${label} must be ${max} characters or fewer.`;
    return value;
  }

  optional(name: string, label: string, max = 300) {
    const value = this.raw(name);
    if (value.length > max) this.errors[name] = `${label} must be ${max} characters or fewer.`;
    return value || null;
  }

  image(name: string, label: string) {
    const value = this.text(name, label, 500);
    if (value && !isImageSource(value)) this.errors[name] = "Upload an image, or use a site path starting with /.";
    return value;
  }

  optionalImage(name: string, label: string) {
    const value = this.optional(name, label, 500);
    if (value && !isImageSource(value)) this.errors[name] = "Upload an image, or use a site path starting with /.";
    return value;
  }

  url(name: string, label: string) {
    const value = this.text(name, label, 500);
    if (value && !isHttpUrl(value)) this.errors[name] = "Enter a full link starting with https://.";
    return value;
  }

  optionalUrl(name: string, label: string) {
    const value = this.optional(name, label, 500);
    if (value && !isHttpUrl(value)) this.errors[name] = "Enter a full link starting with https://.";
    return value;
  }

  slug(name: string, fallback: string) {
    const slug = slugify(this.raw(name) || fallback);
    if (!slug) this.errors[name] = "Enter a URL slug using letters or numbers.";
    return slug;
  }

  status() {
    return this.raw("status") === "PUBLISHED" ? ("PUBLISHED" as const) : ("DRAFT" as const);
  }

  get failed(): FormState | null {
    return Object.keys(this.errors).length > 0
      ? { message: "Please check the highlighted fields.", errors: this.errors }
      : null;
  }
}

/** New order of `ids` after moving `id` one place up or down. */
export function moved(ids: string[], id: string, direction: string) {
  const from = ids.indexOf(id);
  const to = from + (direction === "up" ? -1 : 1);
  if (from < 0 || to < 0 || to >= ids.length) return null;
  const next = [...ids];
  [next[from], next[to]] = [next[to], next[from]];
  return next;
}

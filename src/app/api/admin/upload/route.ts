import { getCurrentAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

const MAX_BYTES = 5 * 1024 * 1024;

// Type comes from the file's leading bytes, not the name or browser-supplied type. SVG is excluded
// because it can carry scripts.
function detectImageType(b: Uint8Array) {
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  const ascii = (from: number, to: number) => String.fromCharCode(...b.subarray(from, to));
  if (ascii(0, 4) === "RIFF" && ascii(8, 12) === "WEBP") return "image/webp";
  return null;
}

export async function POST(request: Request) {
  if (!(await getCurrentAdmin())) return Response.json({ error: "Please sign in again." }, { status: 401 });

  const file = (await request.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file received." }, { status: 400 });
  if (file.size > MAX_BYTES) return Response.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });

  const data = new Uint8Array(await file.arrayBuffer());
  const mimeType = detectImageType(data);
  if (!mimeType) return Response.json({ error: "Use a PNG, JPEG or WebP image." }, { status: 415 });

  const media = await prisma.media.create({
    data: { filename: file.name.slice(0, 200), mimeType, size: file.size, data },
    select: { id: true },
  });
  return Response.json({ url: `/media/${media.id}` });
}

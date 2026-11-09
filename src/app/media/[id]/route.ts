import { prisma } from "@/lib/db";

export async function GET(_request: Request, { params }: RouteContext<"/media/[id]">) {
  const media = await prisma.media.findUnique({ where: { id: (await params).id } });
  if (!media) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(media.data), {
    headers: {
      "Content-Type": media.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

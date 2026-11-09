import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/** Raw HTML is left unrendered, so stored content cannot inject scripts into the page. */
export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={cn("prose-content", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}

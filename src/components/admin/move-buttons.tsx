import { ChevronDown, ChevronUp } from "lucide-react";

const cls = "grid size-7 place-items-center rounded-md text-ink/50 transition hover:bg-black/5 hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent";

export function MoveButtons({
  action,
  fields,
  first,
  last,
}: {
  action: (data: FormData) => Promise<void>;
  fields: Record<string, string>;
  first: boolean;
  last: boolean;
}) {
  return (
    <form action={action} className="flex shrink-0">
      {Object.entries(fields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <button name="direction" value="up" disabled={first} aria-label="Move up" className={cls}><ChevronUp className="size-4" /></button>
      <button name="direction" value="down" disabled={last} aria-label="Move down" className={cls}><ChevronDown className="size-4" /></button>
    </form>
  );
}

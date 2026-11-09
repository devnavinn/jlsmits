"use client";

import { startTransition, useActionState } from "react";
import { Loader2 } from "lucide-react";
import { login } from "@/app/admin/actions";
import { buttonClass } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

const inputClass =
  "h-9 w-full rounded-lg px-3 text-[13px] shadow-[0_0_0_1px_rgba(12,17,27,0.11)] outline-none transition-shadow focus:shadow-[0_0_0_1px_var(--color-brand),0_0_0_4px_rgba(31,20,255,0.1)]";

export function LoginForm() {
  const [state, dispatch, pending] = useActionState(login, {});
  return (
    <form
      className="space-y-3.5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => dispatch(data));
      }}
    >
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] text-ink/70">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-[13px] text-ink/70">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </div>
      {state.message && <p role="alert" className="text-[13px] text-red-600">{state.message}</p>}
      <button type="submit" disabled={pending} className={cn(buttonClass.primary, "w-full")}>
        {pending && <Loader2 className="size-4 animate-spin" />}
        Sign in
      </button>
    </form>
  );
}

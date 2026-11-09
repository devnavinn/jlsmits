"use client";

import { useEffect } from "react";
import { markMessageRead } from "@/app/admin/actions";

/** Marks a new message read after it is opened, which also refreshes the unread badge. */
export function MarkRead({ id }: { id: string }) {
  useEffect(() => {
    markMessageRead(id);
  }, [id]);
  return null;
}

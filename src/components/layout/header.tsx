"use client";

import { Bell, Calendar, UserCircle2 } from "lucide-react";
import { formatLongDate } from "@/lib/dates";

interface HeaderProps {
  today: Date;
}

export function Header({ today }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Unified Operations
        </p>
        <h1 className="text-xl font-semibold tracking-tight">
          Property & Reservation Timeline
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground md:flex">
          <Calendar className="size-4" />
          <span>{formatLongDate(today)}</span>
        </div>

        <button
          type="button"
          className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserCircle2 className="size-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Napoli Admin</p>
            <p className="text-xs text-muted-foreground">Municipal Operator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  Truck,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Calendar", icon: CalendarDays, active: false },
  { label: "Suppliers", icon: Truck, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/30">
          <Building2 className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">Napoli PMS</p>
          <p className="text-xs text-muted-foreground">Comune di Napoli</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4 text-white shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-blue-100">
            Compliance
          </p>
          <p className="mt-1 text-sm font-semibold">CIN Registry Active</p>
          <p className="mt-2 text-xs leading-relaxed text-blue-100/90">
            All 3 properties verified with valid Codice Identificativo Nazionale.
          </p>
        </div>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Interactive MVP preview — scenarios run on demand
        </p>
      </div>
    </aside>
  );
}
